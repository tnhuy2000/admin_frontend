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
  ColorPicker,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_TAGS,
} from '@/codegen/graphql-definition/admin-service/portfolio-queries';
import {
  CREATE_TAG,
  UPDATE_TAG,
  DELETE_TAG,
} from '@/codegen/graphql-definition/admin-service/portfolio-mutations';
import type {
  GetTagsQuery,
  CreateTagMutation,
  CreateTagMutationVariables,
  UpdateTagMutation,
  UpdateTagMutationVariables,
  DeleteTagMutation,
  DeleteTagMutationVariables,
  CreateTagInput,
  UpdateTagInput,
} from '@/graphql/generated';

const { Title, Text } = Typography;

type TagItem = GetTagsQuery['tags'][number];

const TagsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TagItem | null>(null);
  const [form] = Form.useForm();

  const { data, loading, refetch } = useQuery<GetTagsQuery>(
    GET_TAGS
  );

  const [createTag, { loading: creating }] = useMutation<
    CreateTagMutation,
    CreateTagMutationVariables
  >(CREATE_TAG);

  const [updateTag, { loading: updating }] = useMutation<
    UpdateTagMutation,
    UpdateTagMutationVariables
  >(UPDATE_TAG);

  const [deleteTag] = useMutation<
    DeleteTagMutation,
    DeleteTagMutationVariables
  >(DELETE_TAG);

  const handleCreate = () => {
    setEditingItem(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true, order: 0, color: '#1890ff' });
    setModalOpen(true);
  };

  const handleEdit = (record: TagItem) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTag({ variables: { id } });
      message.success('Tag deleted successfully!');
      refetch();
    } catch (error: any) {
      message.error(`Failed to delete: ${error.message}`);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (!editingItem) {
      form.setFieldsValue({ slug: generateSlug(name) });
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const input = {
        ...values,
        color: typeof values.color === 'string' ? values.color : values.color?.toHexString?.() || values.color,
      };

      if (editingItem) {
        await updateTag({
          variables: { id: editingItem._id, input: input as UpdateTagInput },
        });
        message.success('Tag updated successfully!');
      } else {
        await createTag({
          variables: { input: input as CreateTagInput },
        });
        message.success('Tag created successfully!');
      }
      setModalOpen(false);
      refetch();
    } catch (error: any) {
      message.error(`Failed to save: ${error.message}`);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: TagItem) => (
        <Tag color={record.color || 'default'}>{name}</Tag>
      ),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      render: (slug: string) => <Text code>{slug}</Text>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (desc: string) => desc || '-',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      width: 100,
      render: (color: string) => (
        <div
          style={{
            width: 24,
            height: 24,
            backgroundColor: color || '#1890ff',
            borderRadius: 4,
            border: '1px solid #d9d9d9',
          }}
        />
      ),
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      sorter: (a: TagItem, b: TagItem) => a.order - b.order,
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
      render: (_: any, record: TagItem) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Popconfirm
            title="Delete Tag"
            description="Are you sure you want to delete this tag?"
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
              Tags
            </Title>
            <Text type="secondary">Manage tags for projects and articles</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Add Tag
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data?.tags || []}
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
        title={editingItem ? 'Edit Tag' : 'Create Tag'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter tag name' }]}
          >
            <Input placeholder="e.g., React, TypeScript" onChange={handleNameChange} />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: 'Please enter slug' }]}
          >
            <Input placeholder="e.g., react, typescript" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} placeholder="Optional description" />
          </Form.Item>

          <Form.Item name="color" label="Color">
            <ColorPicker format="hex" />
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

export default TagsPage;
