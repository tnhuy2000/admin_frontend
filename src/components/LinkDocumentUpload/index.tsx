import React, { useState, useEffect } from 'react';
import { Upload, Input, Radio, Space, Button, Image, message } from 'antd';
import { UploadOutlined, LinkOutlined, DeleteOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import type { LinkDocument, TypeDocument } from '@/graphql/generated';
import { uploadFile, validateImageFile } from '@/utils/uploadHelper';

interface LinkDocumentUploadProps {
  value?: LinkDocument | null;
  onChange?: (value: LinkDocument | null) => void;
  accept?: string;
  isImage?: boolean;
  placeholder?: string;
}

const LinkDocumentUpload: React.FC<LinkDocumentUploadProps> = ({
  value,
  onChange,
  accept = 'image/*',
  isImage = true,
  placeholder = 'Enter URL',
}) => {
  const [mode, setMode] = useState<'file' | 'link'>(value?.type === 'link' ? 'link' : 'file');
  const [urlInput, setUrlInput] = useState<string>(value?.type === 'link' ? value?.url || '' : '');
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (value) {
      if (value.type === 'link') {
        setMode('link');
        setUrlInput(value.url || '');
        setFileList([]);
      } else if (value.type === 'file' && value.url) {
        setMode('file');
        setUrlInput('');
        setFileList([
          {
            uid: '-1',
            name: value.fileName || 'uploaded-file',
            status: 'done',
            url: value.url,
          },
        ]);
      }
    } else {
      setFileList([]);
      setUrlInput('');
    }
  }, [value]);

  const handleModeChange = (newMode: 'file' | 'link') => {
    setMode(newMode);
    if (newMode === 'link') {
      setFileList([]);
      if (urlInput) {
        onChange?.({
          url: urlInput,
          fileName: null,
          type: 'link' as TypeDocument,
        });
      } else {
        onChange?.(null);
      }
    } else {
      setUrlInput('');
      if (fileList.length > 0 && fileList[0].url) {
        onChange?.({
          url: fileList[0].url,
          fileName: fileList[0].name,
          type: 'link' as TypeDocument,
        });
      } else {
        onChange?.(null);
      }
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setUrlInput(url);
    if (url) {
      onChange?.({
        url,
        fileName: null,
        type: 'link' as TypeDocument,
      });
    } else {
      onChange?.(null);
    }
  };

  const handleUpload = async (file: RcFile): Promise<boolean> => {
    if (isImage && !validateImageFile(file)) {
      return false;
    }

    setUploading(true);
    try {
      const url = await uploadFile(file, isImage);
      const newFile: UploadFile = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url,
      };
      setFileList([newFile]);
      onChange?.({
        url,
        fileName: file.name,
        type: 'link' as TypeDocument,
      });
      message.success('Upload successful!');
    } catch (error: any) {
      message.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
    return false;
  };

  const handleRemove = () => {
    setFileList([]);
    onChange?.(null);
  };

  const previewUrl = mode === 'file' ? fileList[0]?.url : urlInput;

  return (
    <div>
      <Radio.Group
        value={mode}
        onChange={(e) => handleModeChange(e.target.value)}
        style={{ marginBottom: 12 }}
        size="small"
      >
        <Radio.Button value="file">
          <UploadOutlined /> Upload
        </Radio.Button>
        <Radio.Button value="link">
          <LinkOutlined /> URL
        </Radio.Button>
      </Radio.Group>

      {mode === 'file' ? (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Upload
            accept={accept}
            beforeUpload={handleUpload}
            fileList={fileList}
            onRemove={handleRemove}
            showUploadList={false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />} loading={uploading} style={{ width: '100%' }}>
              {uploading ? 'Uploading...' : 'Click to Upload'}
            </Button>
          </Upload>
          {fileList.length > 0 && fileList[0].url && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {fileList[0].name}
              </span>
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                size="small"
                onClick={handleRemove}
              />
            </div>
          )}
        </Space>
      ) : (
        <Input
          placeholder={placeholder}
          value={urlInput}
          onChange={handleUrlChange}
          prefix={<LinkOutlined />}
        />
      )}

      {isImage && previewUrl && (
        <div style={{ marginTop: 8 }}>
          <Image
            src={previewUrl}
            alt="Preview"
            style={{ maxWidth: 200, maxHeight: 120, objectFit: 'cover', borderRadius: 4 }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgesAB3dPcAAAAP4SURBVAAAA"
          />
        </div>
      )}
    </div>
  );
};

export default LinkDocumentUpload;
