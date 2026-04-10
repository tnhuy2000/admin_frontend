import React, { useState } from 'react';
import { Modal, Form, Input, Select, Switch, message, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import { useMutation } from '@apollo/client/react';
import { CREATE_SETTING } from '@/codegen/graphql-definition/admin-service/mutations';
import {
  type CreateSettingMutation,
  type CreateSettingMutationVariables,
} from '@/graphql/generated';
import { CATEGORIES, SETTING_TYPES } from '../ManageSettings';
import { uploadFileAsDocument, validateImageFile, validateFile } from '@/utils/uploadHelper';

const { TextArea } = Input;

interface CreateSettingModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


export const CreateSettingModal: React.FC<CreateSettingModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<RcFile | null>(null);
  const [createSetting, { loading }] = useMutation<
    CreateSettingMutation,
    CreateSettingMutationVariables
  >(CREATE_SETTING);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Validate IMAGE/FILE has been selected
      if ((values.type === 'IMAGE' || values.type === 'FILE') && !selectedFile) {
        message.error(`Please select a ${values.type === 'IMAGE' ? 'image' : 'file'} first`);
        return;
      }

      let processedValue = values.value;

      // Upload file first if IMAGE or FILE type
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

      // Create setting with processed value
      await createSetting({
        variables: {
          input: {
            key: values.key,
            value: processedValue,
            category: values.category,
            description: values.description,
            type: values.type,
            isPublic: values.isPublic || false,
          },
        },
      });

      message.success('Setting created successfully!');
      form.resetFields();
      setFileList([]);
      setSelectedFile(null);
      onSuccess();
    } catch (error: any) {
      if (error.graphQLErrors) {
        message.error(`Failed to create setting: ${error.message}`);
      } else {
        console.error('Validation failed:', error);
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setSelectedFile(null);
    onClose();
  };

  const selectedType = Form.useWatch('type', form);

  // Reset value and fileList when type changes
  React.useEffect(() => {
    if (selectedType) {
      // Clear value when switching to/from IMAGE or FILE
      form.setFieldsValue({ value: undefined });
      setFileList([]);
      setSelectedFile(null);
    }
  }, [selectedType, form]);

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
          <Form.Item
            name="value"
            label="Value"
            valuePropName="checked"
            initialValue={false}
          >
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
            <TextArea rows={4} placeholder='{"key": "value"}' />
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

  return (
    <Modal
      title="Create New Setting"
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      width={600}
      okText="Create"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical" style={{ marginTop: '24px' }}>
        <Form.Item
          name="key"
          label="Key"
          rules={[
            { required: true, message: 'Please enter a key' },
            {
              pattern: /^[A-Z_]+$/,
              message: 'Key must be uppercase letters and underscores only',
            },
          ]}
          extra="Use UPPERCASE_WITH_UNDERSCORES format (e.g., SITE_NAME)"
        >
          <Input placeholder="SITE_NAME" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select a type' }]}
          initialValue="STRING"
        >
          <Select options={SETTING_TYPES} />
        </Form.Item>

        {renderValueField()}

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
          initialValue="GENERAL"
        >
          <Select options={CATEGORIES} />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea rows={2} placeholder="Brief description of this setting" />
        </Form.Item>

        <Form.Item name="isPublic" label="Public" valuePropName="checked" initialValue={false}>
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};
