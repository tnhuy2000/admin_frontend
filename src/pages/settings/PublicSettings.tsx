import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Switch,
  Select,
  Space,
  Typography,
  message,
  Spin,
  Divider,
  Row,
  Col,
  Upload,
  Image,
} from 'antd';
import { SaveOutlined, ReloadOutlined, UploadOutlined, FileOutlined, EyeOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_PUBLIC_SETTINGS } from '@/codegen/graphql-definition/admin-service/queries';
import { BULK_UPDATE_SETTINGS } from '@/codegen/graphql-definition/admin-service/mutations';
import { uploadFileAsDocument, validateImageFile, validateFile } from '@/utils/uploadHelper';
import type {
  GetPublicSettingsQuery,
  BulkUpdateSettingsMutation,
  BulkUpdateSettingsMutationVariables,
  LinkDocument,
} from '@/graphql/generated';

const { Title, Text } = Typography;
const { TextArea } = Input;

type Setting = GetPublicSettingsQuery['getPublicSettings'][number];

const PublicSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<Record<string, RcFile>>({});

  // Query to get all public settings
  const { data, loading, refetch } = useQuery<GetPublicSettingsQuery>(GET_PUBLIC_SETTINGS);

  // Mutation to bulk update settings
  const [bulkUpdateSettings, { loading: updating }] = useMutation<BulkUpdateSettingsMutation, BulkUpdateSettingsMutationVariables>(BULK_UPDATE_SETTINGS);

  // Get public settings (already filtered by backend)
  const publicSettings = data?.getPublicSettings || [];

  // Group settings by category
  const settingsByCategory = publicSettings.reduce((acc: Record<string, Setting[]>, setting: Setting) => {
    const category = setting.category || 'GENERAL';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(setting);
    return acc;
  }, {});

  // Initialize form values
  const initializeForm  = (settings: Setting[]) => {
    if (settings.length > 0) {
      const initialValues: Record<string, any> = {};
      settings.forEach((setting: Setting) => {
        let value = setting.value;

        // Parse JSON values
        if (setting.type === 'JSON' && typeof value === 'string') {
          try {
            value = JSON.parse(value);
          } catch (e) {
            // Keep as string if parsing fails
          }
        }

        initialValues[setting.key] = value;
      });
      form.setFieldsValue(initialValues);
    }
  }

  useEffect(() => {
    if (publicSettings.length > 0) {
      initializeForm(publicSettings)
    }
  }, [publicSettings, form]);
  const refetchPage = () => {
    refetch()
    setSelectedFiles({})
  }
  const handleValuesChange = () => {
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Upload files first if any
      const uploadPromises = Object.entries(selectedFiles).map(async ([key, file]) => {
        const setting = publicSettings.find(s => s.key === key);
        const isImage = setting?.type === 'IMAGE';

        try {
          // Both IMAGE and FILE types now use LinkDocument format
          const uploadedValue: LinkDocument = await uploadFileAsDocument(file, isImage);

          return { key, uploadedValue };
        } catch (error: any) {
          throw new Error(`Failed to upload ${key}: ${error.message}`);
        }
      });

      const uploadResults = await Promise.all(uploadPromises);

      // Update values with uploaded URLs or LinkDocument objects
      uploadResults.forEach(({ key, uploadedValue }) => {
        values[key] = uploadedValue;
      });

      // Prepare settings for bulk update
      const settingsToUpdate = publicSettings.map((setting) => {
        let value = values[setting.key];

        // Convert to appropriate type
        if (setting.type === 'JSON' && typeof value === 'object') {
          value = JSON.stringify(value);
        } else if (setting.type === 'NUMBER') {
          value = Number(value);
        } else if (setting.type === 'BOOLEAN') {
          value = Boolean(value);
        }

        return {
          key: setting.key,
          value,
        };
      });

      const result = await bulkUpdateSettings({
        variables: {
          settings: settingsToUpdate,
        },
      });

      if (result.data) {
        message.success('Settings updated successfully!');
        setHasChanges(false);
        setSelectedFiles({});
        refetch();
      }
    } catch (error: any) {
      console.error('Validation failed:', error);
      message.error(`Failed to update settings: ${error.message || 'Unknown error'}`);
    }
  };



  const handleFileSelect = (key: string, file: RcFile, isImage: boolean): boolean => {
    const isValid = isImage ? validateImageFile(file) : validateFile(file);
    if (!isValid) return false;

    setSelectedFiles(prev => ({ ...prev, [key]: file }));
    setHasChanges(true);
    return false; // Prevent auto upload
  };

  const renderField = (setting: Setting) => {
    const { key, type, description, value } = setting;
    const hasFile = selectedFiles[key];

    // Handle both string URL (old format) and LinkDocument object (new format)
    const currentValue = value as string | LinkDocument;
    const isLinkDocument = typeof currentValue === 'object' && currentValue !== null && 'url' in currentValue;
    const displayUrl = isLinkDocument ? (currentValue as LinkDocument).url : (currentValue as string);
    const fileName = isLinkDocument ? (currentValue as LinkDocument).fileName : null;

    switch (type) {
      case 'IMAGE':
        return (
          <Form.Item
            key={key}
            name={key}
            label={formatLabel(key)}
            extra={description}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {displayUrl && !hasFile && (
                <div style={{ marginBottom: '8px' }}>
                  <Image
                    src={displayUrl}
                    alt={key}
                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                    preview={{
                      mask: (
                        <Space>
                          <EyeOutlined /> Preview
                        </Space>
                      ),
                    }}
                  />
                </div>
              )}
              <Upload
                accept="image/*"
                beforeUpload={(file) => handleFileSelect(key, file, true)}
                showUploadList={true}
                maxCount={1}
                fileList={hasFile ? [{ uid: '-1', name: hasFile.name, status: 'done' }] as any : []}
                onRemove={() => {
                  setSelectedFiles(prev => {
                    const newFiles = { ...prev };
                    delete newFiles[key];
                    return newFiles;
                  });
                }}
              >
                <Button icon={<UploadOutlined />}>
                  {displayUrl ? 'Change Image' : 'Upload Image'}
                </Button>
              </Upload>
            </Space>
          </Form.Item>
        );

      case 'FILE':
        return (
          <Form.Item
            key={key}
            name={key}
            label={formatLabel(key)}
            extra={description}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {displayUrl && !hasFile && (
                <div style={{ marginBottom: '8px' }}>
                  <Space>
                    <FileOutlined />
                    <a href={displayUrl} target="_blank" rel="noopener noreferrer">
                      {fileName || 'View current file'}
                    </a>
                  </Space>
                </div>
              )}
              <Upload
                beforeUpload={(file) => handleFileSelect(key, file, false)}
                showUploadList={true}
                maxCount={1}
                fileList={hasFile ? [{ uid: '-1', name: hasFile.name, status: 'done' }] as any : []}
                onRemove={() => {
                  setSelectedFiles(prev => {
                    const newFiles = { ...prev };
                    delete newFiles[key];
                    return newFiles;
                  });
                }}
              >
                <Button icon={<UploadOutlined />}>
                  {displayUrl ? 'Change File' : 'Upload File'}
                </Button>
              </Upload>
            </Space>
          </Form.Item>
        );

      case 'BOOLEAN':
        return (
          <Form.Item
            key={key}
            name={key}
            label={formatLabel(key)}
            valuePropName="checked"
            extra={description}
          >
            <Switch />
          </Form.Item>
        );

      case 'NUMBER':
        return (
          <Form.Item
            key={key}
            name={key}
            label={formatLabel(key)}
            extra={description}
            rules={[{ type: 'number', message: 'Please enter a valid number' }]}
          >
            <Input type="number" />
          </Form.Item>
        );

      case 'JSON':
        return (
          <Form.Item
            key={key}
            name={key}
            label={formatLabel(key)}
            extra={description}
          >
            <TextArea rows={4} placeholder='{"key": "value"}' />
          </Form.Item>
        );

      case 'ARRAY':
        return (
          <Form.Item
            key={key}
            name={key}
            label={formatLabel(key)}
            extra={description}
          >
            <Select mode="tags" placeholder="Add items" />
          </Form.Item>
        );

      default: // STRING
        return (
          <Form.Item
            key={key}
            name={key}
            label={formatLabel(key)}
            extra={description}
          >
            <Input />
          </Form.Item>
        );
    }
  };

  const formatLabel = (key: string) => {
    return key
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const getCategoryTitle = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={2} style={{ margin: 0 }}>Public Settings</Title>
            <Text type="secondary">
              Configure public settings that will be visible to the website
            </Text>
          </div>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => refetchPage()}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              loading={updating}
              disabled={!hasChanges}
            >
              Save Changes
            </Button>
          </Space>
        </div>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
        >
          {Object.entries(settingsByCategory).map(([category, settings]) => (
            <div key={category} style={{ marginBottom: '32px' }}>
              <Title level={4}>{getCategoryTitle(category)}</Title>
              <Row gutter={[16, 16]}>
                {(settings as Setting[]).map((setting) => (
                  <Col xs={24} md={12} key={setting.key}>
                    {renderField(setting)}
                  </Col>
                ))}
              </Row>
            </div>
          ))}

          {publicSettings.length === 0 && (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <Text type="secondary">No public settings found</Text>
            </div>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default PublicSettings;
