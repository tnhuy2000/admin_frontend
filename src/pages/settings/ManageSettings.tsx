import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  message,
  Tabs,
  Tag,
  Popconfirm,
  Image,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_SETTINGS } from '@/codegen/graphql-definition/admin-service/queries';
import { DELETE_SETTING } from '@/codegen/graphql-definition/admin-service/mutations';
import {
  type GetSettingsQuery,
  type GetSettingsQueryVariables,
  type DeleteSettingMutation,
  type DeleteSettingMutationVariables,
  SettingCategory,
} from '@/graphql/generated';
import { CreateSettingModal } from './components/CreateSettingModal';
import { EditSettingModal } from './components/EditSettingModal';

const { Title, Text } = Typography;

type Setting = GetSettingsQuery['settings'][number];

// Define categories
export const SETTING_TYPES = [
  { label: 'String', value: 'STRING' },
  { label: 'Number', value: 'NUMBER' },
  { label: 'Boolean', value: 'BOOLEAN' },
  { label: 'JSON', value: 'JSON' },
  { label: 'Array', value: 'ARRAY' },
  { label: 'Image', value: 'IMAGE' },
  { label: 'File', value: 'FILE' },
];

export const CATEGORIES = [
  { label: 'All', value:'all' },
  { label: 'General', value: SettingCategory.General },
  { label: 'SEO', value: SettingCategory.Seo },
  { label: 'Social Media', value: SettingCategory.Social },
  { label: 'Contact', value: SettingCategory.Contact },
  { label: 'Theme', value: SettingCategory.Theme },
  { label: 'Advance', value: SettingCategory.Advanced },
];


const ManageSettings: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<Setting | null>(null);

  // Query to get settings
  const { data, loading, refetch } = useQuery<GetSettingsQuery, GetSettingsQueryVariables>(
    GET_SETTINGS,
    {
      variables: {
        category: selectedCategory as any,
      },
    }
  );

  // Mutation to delete setting
  const [deleteSetting] = useMutation<DeleteSettingMutation, DeleteSettingMutationVariables>(
    DELETE_SETTING
  );

  const handleDelete = async (key: string) => {
    try {
      await deleteSetting({
        variables: { key },
      });
      message.success('Setting deleted successfully!');
      refetch();
    } catch (error: any) {
      message.error(`Failed to delete setting: ${error.message}`);
    }
  };

  const handleEdit = (setting: Setting) => {
    setSelectedSetting(setting);
    setEditModalOpen(true);
  };

  const handleCreateSuccess = () => {
    setCreateModalOpen(false);
    refetch();
  };

  const handleEditSuccess = () => {
    setEditModalOpen(false);
    setSelectedSetting(null);
    refetch();
  };

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      width: 200,
      render: (key: string, record: Setting) => (
        <Space>
          <Text code>{key}</Text>
          {record.isDefault && <Tag color="gold">Default</Tag>}
        </Space>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      ellipsis: true,
      render: (value: any, record: Setting) => {
        if (record.type === 'BOOLEAN') {
          return <Tag color={value ? 'green' : 'red'}>{String(value)}</Tag>;
        }
        if (record.type === 'JSON' || record.type === 'ARRAY') {
          return <Text ellipsis>{JSON.stringify(value)}</Text>;
        }
        if (record.type === 'IMAGE') {
          if (!value) return <Text type="secondary">No image</Text>;

          // Handle both string URL (old format) and LinkDocument (new format)
          const isLinkDocument = typeof value === 'object' && value !== null && 'url' in value;
          const imageUrl = isLinkDocument ? (value).url : (value as string);

          return (
            <Image
              src={imageUrl}
              alt="Setting image"
              width={60}
              height={60}
              style={{ objectFit: 'cover', borderRadius: '4px' }}
            />
          );
        }
        if (record.type === 'FILE') {
          if (!value) return <Text type="secondary">No file</Text>;

          // Handle both string URL (old format) and LinkDocument (new format)
          const isLinkDocument = typeof value === 'object' && value !== null && 'url' in value;
          const fileUrl = isLinkDocument ? (value).url : (value as string);
          const fileName = isLinkDocument ? (value).fileName : 'View file';

          return (
            <Space>
              <FileOutlined />
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                {fileName}
              </a>
            </Space>
          );
        }
        return <Text>{String(value)}</Text>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => <Tag>{type}</Tag>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category: string) => category || 'GENERAL',
    },
    {
      title: 'Public',
      dataIndex: 'isPublic',
      key: 'isPublic',
      width: 80,
      render: (isPublic: boolean) => (
        <Tag color={isPublic ? 'blue' : 'default'}>{isPublic ? 'Yes' : 'No'}</Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: Setting) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          {!record.isDefault ? (
            <Popconfirm
              title="Delete Setting"
              description="Are you sure you want to delete this setting?"
              onConfirm={() => handleDelete(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          ) : (
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              size="small"
              disabled
              title="Cannot delete default system settings"
            />
          )}
        </Space>
      ),
    },
  ];

  const tabItems = CATEGORIES.map((cat) => ({
    key: cat.value === null ? 'all' : cat.value,
    label: cat.label,
  }));

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div
          style={{
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Title level={2} style={{ margin: 0 }}>
              Manage Settings
            </Title>
            <Text type="secondary">Create, update, and delete application settings</Text>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalOpen(true)}
          >
            Create Setting
          </Button>
        </div>

        <Tabs
          activeKey={selectedCategory === null ? 'all' : selectedCategory}
          items={tabItems}
          onChange={(key) => setSelectedCategory(key === 'all' ? null : key)}
          style={{ marginBottom: '16px' }}
        />

        <Table
          columns={columns}
          dataSource={data?.settings || []}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} settings`,
          }}
        />
      </Card>

      <CreateSettingModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {selectedSetting && (
        <EditSettingModal
          open={editModalOpen}
          setting={selectedSetting}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedSetting(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default ManageSettings;
