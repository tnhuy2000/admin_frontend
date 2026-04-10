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
import { PlusOutlined, EditOutlined, DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_SKILLS,
} from '@/codegen/graphql-definition/admin-service/portfolio-queries';
import {
  CREATE_SKILL,
  UPDATE_SKILL,
  DELETE_SKILL,
} from '@/codegen/graphql-definition/admin-service/portfolio-mutations';
import type {
  GetSkillsQuery,
  CreateSkillMutation,
  CreateSkillMutationVariables,
  UpdateSkillMutation,
  UpdateSkillMutationVariables,
  DeleteSkillMutation,
  DeleteSkillMutationVariables,
  CreateSkillInput,
  UpdateSkillInput,
  SkillVariant,
} from '@/graphql/generated';

const { Title, Text } = Typography;

type Skill = GetSkillsQuery['skills'][number];

const VARIANT_OPTIONS = [
  { label: 'Frontend', value: 'frontend' },
  { label: 'Styles', value: 'styles' },
  { label: 'Backend', value: 'backend' },
  { label: 'DevOps', value: 'devops' },
];

const VARIANT_COLORS: Record<string, string> = {
  frontend: 'blue',
  styles: 'magenta',
  backend: 'green',
  devops: 'orange',
};

const SkillsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Skill | null>(null);
  const [form] = Form.useForm();

  const { data, loading, refetch } = useQuery<GetSkillsQuery>(
    GET_SKILLS
  );

  const [createSkill, { loading: creating }] = useMutation<
    CreateSkillMutation,
    CreateSkillMutationVariables
  >(CREATE_SKILL);

  const [updateSkill, { loading: updating }] = useMutation<
    UpdateSkillMutation,
    UpdateSkillMutationVariables
  >(UPDATE_SKILL);

  const [deleteSkill] = useMutation<
    DeleteSkillMutation,
    DeleteSkillMutationVariables
  >(DELETE_SKILL);

  const handleCreate = () => {
    setEditingItem(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true, order: 0, items: [] });
    setModalOpen(true);
  };

  const handleEdit = (record: Skill) => {
    setEditingItem(record);
    form.setFieldsValue({
      ...record,
      items: record.items.map((item) => ({ name: item.name, order: item.order })),
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSkill({ variables: { id } });
      message.success('Skill deleted successfully!');
      refetch();
    } catch (error: any) {
      message.error(`Failed to delete: ${error.message}`);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const input = {
        ...values,
        items: values.items?.map((item: any, index: number) => ({
          name: item.name,
          order: item.order ?? index,
        })) || [],
      };

      if (editingItem) {
        await updateSkill({
          variables: { id: editingItem._id, input: input as UpdateSkillInput },
        });
        message.success('Skill updated successfully!');
      } else {
        await createSkill({
          variables: { input: input as CreateSkillInput },
        });
        message.success('Skill created successfully!');
      }
      setModalOpen(false);
      refetch();
    } catch (error: any) {
      message.error(`Failed to save: ${error.message}`);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Variant',
      dataIndex: 'variant',
      key: 'variant',
      render: (variant: SkillVariant) => (
        <Tag color={VARIANT_COLORS[variant] || 'default'}>{variant.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items: Skill['items']) => (
        <Space wrap>
          {items.slice(0, 3).map((item, index) => (
            <Tag key={index}>{item.name}</Tag>
          ))}
          {items.length > 3 && <Tag>+{items.length - 3} more</Tag>}
        </Space>
      ),
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      sorter: (a: Skill, b: Skill) => a.order - b.order,
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
      render: (_: any, record: Skill) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Popconfirm
            title="Delete Skill"
            description="Are you sure you want to delete this skill?"
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
              Skills
            </Title>
            <Text type="secondary">Manage your skill categories and items</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Add Skill
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data?.skills || []}
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
        title={editingItem ? 'Edit Skill' : 'Create Skill'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter title' }]}
          >
            <Input placeholder="e.g., Frontend Development" />
          </Form.Item>

          <Form.Item
            name="variant"
            label="Variant"
            rules={[{ required: true, message: 'Please select variant' }]}
          >
            <Select options={VARIANT_OPTIONS} placeholder="Select variant" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} placeholder="Optional description" />
          </Form.Item>

          <Form.Item label="Skill Items">
            <Form.List name="items">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[{ required: true, message: 'Missing skill name' }]}
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder="Skill name" style={{ width: 300 }} />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'order']}
                        style={{ marginBottom: 0 }}
                      >
                        <InputNumber placeholder="Order" min={0} style={{ width: 80 }} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Skill Item
                  </Button>
                </>
              )}
            </Form.List>
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

export default SkillsPage;
