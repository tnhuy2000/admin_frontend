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
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_NAVIGATIONS,
} from '@/codegen/graphql-definition/admin-service/portfolio-queries';
import {
  CREATE_NAVIGATION,
  UPDATE_NAVIGATION,
  DELETE_NAVIGATION,
} from '@/codegen/graphql-definition/admin-service/portfolio-mutations';
import type {
  GetNavigationsQuery,
  CreateNavigationMutation,
  CreateNavigationMutationVariables,
  UpdateNavigationMutation,
  UpdateNavigationMutationVariables,
  DeleteNavigationMutation,
  DeleteNavigationMutationVariables,
  CreateNavigationInput,
  UpdateNavigationInput,
} from '@/graphql/generated';

const { Title, Text } = Typography;

type Navigation = GetNavigationsQuery['navigations'][number];

const NavigationPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Navigation | null>(null);
  const [form] = Form.useForm();

  const { data, loading, refetch } = useQuery<GetNavigationsQuery>(
    GET_NAVIGATIONS
  );

  const [createNavigation, { loading: creating }] = useMutation<
    CreateNavigationMutation,
    CreateNavigationMutationVariables
  >(CREATE_NAVIGATION);

  const [updateNavigation, { loading: updating }] = useMutation<
    UpdateNavigationMutation,
    UpdateNavigationMutationVariables
  >(UPDATE_NAVIGATION);

  const [deleteNavigation] = useMutation<
    DeleteNavigationMutation,
    DeleteNavigationMutationVariables
  >(DELETE_NAVIGATION);

  const handleCreate = () => {
    setEditingItem(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true, order: 0 });
    setModalOpen(true);
  };

  const handleEdit = (record: Navigation) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNavigation({ variables: { id } });
      message.success('Navigation deleted successfully!');
      refetch();
    } catch (error: any) {
      message.error(`Failed to delete: ${error.message}`);
    }
  };

  const handleSubmit = async (values: CreateNavigationInput | UpdateNavigationInput) => {
    try {
      if (editingItem) {
        await updateNavigation({
          variables: { id: editingItem._id, input: values as UpdateNavigationInput },
        });
        message.success('Navigation updated successfully!');
      } else {
        await createNavigation({
          variables: { input: values as CreateNavigationInput },
        });
        message.success('Navigation created successfully!');
      }
      setModalOpen(false);
      refetch();
    } catch (error: any) {
      message.error(`Failed to save: ${error.message}`);
    }
  };

  const columns = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Href',
      dataIndex: 'href',
      key: 'href',
      render: (href: string) => <Text code>{href}</Text>,
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      sorter: (a: Navigation, b: Navigation) => a.order - b.order,
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
      render: (_: any, record: Navigation) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Popconfirm
            title="Delete Navigation"
            description="Are you sure you want to delete this navigation?"
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
              Navigation
            </Title>
            <Text type="secondary">Manage website navigation menu items</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Add Navigation
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data?.navigations || []}
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
        title={editingItem ? 'Edit Navigation' : 'Create Navigation'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="label"
            label="Label"
            rules={[{ required: true, message: 'Please enter label' }]}
          >
            <Input placeholder="e.g., Home, About, Contact" />
          </Form.Item>

          <Form.Item
            name="href"
            label="Href"
            rules={[{ required: true, message: 'Please enter href' }]}
          >
            <Input placeholder="e.g., /, /about, /contact" />
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

export default NavigationPage;
