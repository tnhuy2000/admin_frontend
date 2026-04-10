import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  message,
  Tag,
  Popconfirm,
  Modal,
  Form,
  Input,
  InputNumber,
  Switch,
  Select,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_SOCIAL_LINKS,
} from '@/codegen/graphql-definition/admin-service/portfolio-queries';
import {
  CREATE_SOCIAL_LINK,
  UPDATE_SOCIAL_LINK,
  DELETE_SOCIAL_LINK,
} from '@/codegen/graphql-definition/admin-service/portfolio-mutations';
import type {
  GetSocialLinksQuery,
  CreateSocialLinkMutation,
  CreateSocialLinkMutationVariables,
  UpdateSocialLinkMutation,
  UpdateSocialLinkMutationVariables,
  DeleteSocialLinkMutation,
  DeleteSocialLinkMutationVariables,
  CreateSocialLinkInput,
  UpdateSocialLinkInput,
  SocialPlatform,
} from '@/graphql/generated';

const { Title, Text } = Typography;

type SocialLink = GetSocialLinksQuery['socialLinks'][number];

const PLATFORM_OPTIONS = [
  { label: 'GitHub', value: 'github' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Telegram', value: 'telegram' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'Email', value: 'email' },
  { label: 'Other', value: 'other' },
];

const SocialLinksPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialLink | null>(null);
  const [form] = Form.useForm();

  const { data, loading, refetch } = useQuery<GetSocialLinksQuery>(
    GET_SOCIAL_LINKS
  );

  const [createSocialLink, { loading: creating }] = useMutation<
    CreateSocialLinkMutation,
    CreateSocialLinkMutationVariables
  >(CREATE_SOCIAL_LINK);

  const [updateSocialLink, { loading: updating }] = useMutation<
    UpdateSocialLinkMutation,
    UpdateSocialLinkMutationVariables
  >(UPDATE_SOCIAL_LINK);

  const [deleteSocialLink] = useMutation<
    DeleteSocialLinkMutation,
    DeleteSocialLinkMutationVariables
  >(DELETE_SOCIAL_LINK);

  const handleCreate = () => {
    setEditingItem(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true, order: 0 });
    setModalOpen(true);
  };

  const handleEdit = (record: SocialLink) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSocialLink({ variables: { id } });
      message.success('Social link deleted successfully!');
      refetch();
    } catch (error: any) {
      message.error(`Failed to delete: ${error.message}`);
    }
  };

  const handleSubmit = async (values: CreateSocialLinkInput | UpdateSocialLinkInput) => {
    try {
      if (editingItem) {
        await updateSocialLink({
          variables: { id: editingItem._id, input: values as UpdateSocialLinkInput },
        });
        message.success('Social link updated successfully!');
      } else {
        await createSocialLink({
          variables: { input: values as CreateSocialLinkInput },
        });
        message.success('Social link created successfully!');
      }
      setModalOpen(false);
      refetch();
    } catch (error: any) {
      message.error(`Failed to save: ${error.message}`);
    }
  };

  const columns = [
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
      render: (platform: SocialPlatform) => (
        <Tag color="blue">{platform.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'URL',
      dataIndex: 'href',
      key: 'href',
      ellipsis: true,
      render: (href: string) => (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {href}
        </a>
      ),
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      render: (icon: string) => icon || '-',
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      sorter: (a: SocialLink, b: SocialLink) => a.order - b.order,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Active' : 'Inactive'}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: SocialLink) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Popconfirm
            title="Delete Social Link"
            description="Are you sure you want to delete this social link?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
              Social Links
            </Title>
            <Text type="secondary">Manage social media links</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Add Social Link
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data?.socialLinks || []}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </Card>

      <Modal
        title={editingItem ? 'Edit Social Link' : 'Create Social Link'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="platform"
            label="Platform"
            rules={[{ required: true, message: 'Please select platform' }]}
          >
            <Select options={PLATFORM_OPTIONS} placeholder="Select platform" />
          </Form.Item>

          <Form.Item
            name="label"
            label="Label"
            rules={[{ required: true, message: 'Please enter label' }]}
          >
            <Input placeholder="e.g., Follow me on GitHub" />
          </Form.Item>

          <Form.Item
            name="href"
            label="URL"
            rules={[
              { required: true, message: 'Please enter URL' },
              { type: 'url', message: 'Please enter a valid URL' },
            ]}
          >
            <Input placeholder="https://github.com/username" />
          </Form.Item>

          <Form.Item name="icon" label="Icon (optional)">
            <Input placeholder="Icon class or URL" />
          </Form.Item>

          <Form.Item name="order" label="Order">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={creating || updating}>
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SocialLinksPage;
