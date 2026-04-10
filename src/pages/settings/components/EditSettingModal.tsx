import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Switch, message, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import { useMutation } from '@apollo/client/react';
import { UPDATE_SETTING } from '@/codegen/graphql-definition/admin-service/mutations';
import type {
  UpdateSettingMutation,
  UpdateSettingMutationVariables,
  GetSettingsQuery,
  LinkDocument,
} from '@/graphql/generated';
import { CATEGORIES, SETTING_TYPES } from '../ManageSettings';
import { uploadFileAsDocument, validateImageFile, validateFile } from '@/utils/uploadHelper';

const { TextArea } = Input;

type Setting = GetSettingsQuery['settings'][number];

interface EditSettingModalProps {
  open: boolean;
  setting: Setting;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditSettingModal: React.FC<EditSettingModalProps> = ({
  open,
  setting,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[] | any[]>([]);
  const [selectedFile, setSelectedFile] = useState<RcFile | null>(null);
  const [updateSetting, { loading }] = useMutation<
    UpdateSettingMutation,
    UpdateSettingMutationVariables
  >(UPDATE_SETTING);

  useEffect(() => {
    if (setting) {
      let formValue = setting.value;

      // Convert value for form display
      if (setting.type === 'JSON') {
        formValue = typeof setting.value === 'string'
          ? setting.value
          : JSON.stringify(setting.value, null, 2);
      } else if (setting.type === 'NUMBER') {
        formValue = String(setting.value);
      } else if (setting.type === 'BOOLEAN') {
        formValue = Boolean(setting.value);
      } else if (setting.type === 'IMAGE' || setting.type === 'FILE') {
        // If there's an existing file/image, show it in the file list
        if (setting.value) {
          // Handle both string URL and LinkDocument object
          const value = setting.value as string | LinkDocument;
          const isLinkDocument = typeof value === 'object' && value !== null && 'url' in value;
          const url = isLinkDocument ? (value as LinkDocument).url : (value as string);
          const fileName = isLinkDocument ? (value as LinkDocument).fileName : (setting.type === 'IMAGE' ? 'current-image' : 'current-file');

          setFileList([
            {
              uid: '-1',
              name: fileName,
              status: 'done',
              url: url,
            },
          ]);
        } else {
          setFileList([]);
        }
      }

      form.setFieldsValue({
        type: setting.type,
        value: formValue,
        category: setting.category || 'GENERAL',
        description: setting.description,
        isPublic: setting.isPublic,
      });
    }
  }, [setting, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      let processedValue = values.value;

      // Upload new file if IMAGE/FILE type and user selected a new file
      if ((values.type === 'IMAGE' || values.type === 'FILE') && selectedFile) {
        try {
          setUploading(true);
          const isImage = values.type === 'IMAGE';

          // Both IMAGE and FILE types now use LinkDocument format
          processedValue = await uploadFileAsDocument(selectedFile, isImage);

          message.success('File uploaded successfully!');
        } catch (error: any) {
          message.error(`Failed to upload file: ${error.message}`);
          return;
        } finally {
          setUploading(false);
        }
      } else if ((values.type === 'IMAGE' || values.type === 'FILE') && !selectedFile) {
        // Keep existing URL if no new file selected
        processedValue = setting.value;
      } else if (values.type === 'NUMBER') {
        processedValue = Number(values.value);
      } else if (values.type === 'BOOLEAN') {
        processedValue = Boolean(values.value);
      } else if (values.type === 'JSON') {
        try {
          processedValue = JSON.parse(values.value);
        } catch (e) {
          message.error('Invalid JSON format');
          return;
        }
      } else if (values.type === 'ARRAY') {
        processedValue = values.value;
      }

      await updateSetting({
        variables: {
          key: setting.key,
          input: {
            value: processedValue,
            category: values.category,
            description: values.description,
            type: values.type,
            isPublic: values.isPublic,
          },
        },
      });

      message.success('Setting updated successfully!');
      setSelectedFile(null);
      onSuccess();
    } catch (error: any) {
      if (error.graphQLErrors) {
        message.error(`Failed to update setting: ${error.message}`);
      } else {
        console.error('Validation failed:', error);
      }
    }
  };

  const selectedType = Form.useWatch('type', form);

  // Handle file selection (validation only, upload on submit)
  const handleFileSelect = (file: RcFile, isImage: boolean = false): boolean => {
    const isValid = isImage ? validateImageFile(file) : validateFile(file);
    if (!isValid) {
      return false;
    }

    // Just store the file, don't upload yet
    setSelectedFile(file);
    return false; // Prevent default upload behavior
  };

  const renderValueField = () => {
    switch (selectedType) {
      case 'BOOLEAN':
        return (
          <Form.Item name="value" label="Value" valuePropName="checked">
            <Switch />
          </Form.Item>
        );

      case 'NUMBER':
        return (
          <Form.Item
            name="value"
            label="Value"
            rules={[
              { required: true, message: 'Please enter a value' },
              { pattern: /^-?\d+(\.\d+)?$/, message: 'Please enter a valid number' },
            ]}
          >
            <Input type="number" placeholder="Enter number value" />
          </Form.Item>
        );

      case 'JSON':
        return (
          <Form.Item
            name="value"
            label="Value"
            rules={[{ required: true, message: 'Please enter a JSON value' }]}
            extra='Enter valid JSON (e.g., {"key": "value"})'
          >
            <TextArea rows={6} placeholder='{"key": "value"}' />
          </Form.Item>
        );

      case 'ARRAY':
        return (
          <Form.Item
            name="value"
            label="Value"
            rules={[{ required: true, message: 'Please add at least one item' }]}
          >
            <Select mode="tags" placeholder="Add items and press Enter" />
          </Form.Item>
        );

      case 'IMAGE':
        return (
          <Form.Item
            name="value"
            label="Image"
            rules={[{ required: true, message: 'Please upload an image' }]}
            extra="Supported formats: JPG, PNG, GIF, WebP (Max 5MB)"
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              beforeUpload={(file) => handleFileSelect(file, true)}
              onRemove={() => {
                setFileList([]);
                setSelectedFile(null);
              }}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              maxCount={1}
              accept="image/*"
            >
              {fileList.length === 0 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload Image</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        );

      case 'FILE':
        return (
          <Form.Item
            name="value"
            label="File"
            rules={[{ required: true, message: 'Please upload a file' }]}
            extra="Any file type (Max 10MB)"
          >
            <Upload
              fileList={fileList}
              beforeUpload={(file) => handleFileSelect(file, false)}
              onRemove={() => {
                setFileList([]);
                setSelectedFile(null);
              }}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>
        );

      default: // STRING
        return (
          <Form.Item
            name="value"
            label="Value"
            rules={[{ required: true, message: 'Please enter a value' }]}
          >
            <Input placeholder="Enter string value" />
          </Form.Item>
        );
    }
  };

  const isDefaultSetting = setting.isDefault ?? false;

  return (
    <Modal
      title={
        <div>
          Edit Setting: {setting.key}
          {isDefaultSetting && (
            <span style={{ marginLeft: '8px', fontSize: '12px', color: '#faad14' }}>
              (System Default - Only value can be edited)
            </span>
          )}
        </div>
      }
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={loading}
      width={600}
      okText="Update"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" style={{ marginTop: '24px' }}>
        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select a type' }]}
        >
          <Select options={SETTING_TYPES} disabled={isDefaultSetting} />
        </Form.Item>

        {renderValueField()}

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select options={CATEGORIES} disabled={isDefaultSetting} />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea
            rows={2}
            placeholder="Brief description of this setting"
            disabled={isDefaultSetting}
          />
        </Form.Item>

        <Form.Item name="isPublic" label="Public" valuePropName="checked">
          <Switch disabled={isDefaultSetting} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
