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
import { PlusOutlined, EditOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client/react';
import {
  GET_WORK_EXPERIENCES,
} from '@/codegen/graphql-definition/admin-service/portfolio-queries';
import {
  CREATE_WORK_EXPERIENCE,
  UPDATE_WORK_EXPERIENCE,
  DELETE_WORK_EXPERIENCE,
} from '@/codegen/graphql-definition/admin-service/portfolio-mutations';
import type {
  GetWorkExperiencesQuery,
  CreateWorkExperienceMutation,
  CreateWorkExperienceMutationVariables,
  UpdateWorkExperienceMutation,
  UpdateWorkExperienceMutationVariables,
  DeleteWorkExperienceMutation,
  DeleteWorkExperienceMutationVariables,
  CreateWorkExperienceInput,
  UpdateWorkExperienceInput,
} from '@/graphql/generated';

const { Title, Text } = Typography;

type WorkExperience = GetWorkExperiencesQuery['workExperiences'][number];

const WorkExperiencesPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WorkExperience | null>(null);
  const [form] = Form.useForm();

  const { data, loading, refetch } = useQuery<GetWorkExperiencesQuery>(
    GET_WORK_EXPERIENCES
  );

  const [createWorkExperience, { loading: creating }] = useMutation<
    CreateWorkExperienceMutation,
    CreateWorkExperienceMutationVariables
  >(CREATE_WORK_EXPERIENCE);

  const [updateWorkExperience, { loading: updating }] = useMutation<
    UpdateWorkExperienceMutation,
    UpdateWorkExperienceMutationVariables
  >(UPDATE_WORK_EXPERIENCE);

  const [deleteWorkExperience] = useMutation<
    DeleteWorkExperienceMutation,
    DeleteWorkExperienceMutationVariables
  >(DELETE_WORK_EXPERIENCE);

  const handleCreate = () => {
    setEditingItem(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true, isHighlighted: false, order: 0 });
    setModalOpen(true);
  };

  const handleEdit = (record: WorkExperience) => {
    setEditingItem(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteWorkExperience({ variables: { id } });
      message.success('Work experience deleted successfully!');
      refetch();
    } catch (error: any) {
      message.error(`Failed to delete: ${error.message}`);
    }
  };

  const handleSubmit = async (values: CreateWorkExperienceInput | UpdateWorkExperienceInput) => {
    try {
      if (editingItem) {
        await updateWorkExperience({
          variables: { id: editingItem._id, input: values as UpdateWorkExperienceInput },
        });
        message.success('Work experience updated successfully!');
      } else {
        await createWorkExperience({
          variables: { input: values as CreateWorkExperienceInput },
        });
        message.success('Work experience created successfully!');
      }
      setModalOpen(false);
      refetch();
    } catch (error: any) {
      message.error(`Failed to save: ${error.message}`);
    }
  };

  const columns = [
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (company: string, record: WorkExperience) => (
        <Space>
          {company}
          {record.isHighlighted && <StarOutlined style={{ color: '#faad14' }} />}
        </Space>
      ),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
      render: (period: string) => <Text code>{period}</Text>,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Technologies',
      dataIndex: 'technologies',
      key: 'technologies',
      ellipsis: true,
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      sorter: (a: WorkExperience, b: WorkExperience) => a.order - b.order,
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
      render: (_: any, record: WorkExperience) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Popconfirm
            title="Delete Work Experience"
            description="Are you sure you want to delete this work experience?"
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
              Work Experiences
            </Title>
            <Text type="secondary">Manage your work experience timeline</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Add Experience
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data?.workExperiences || []}
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
        title={editingItem ? 'Edit Work Experience' : 'Create Work Experience'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Please enter company name' }]}
          >
            <Input placeholder="e.g., Google Inc." />
          </Form.Item>

          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: 'Please enter position' }]}
          >
            <Input placeholder="e.g., Senior Software Engineer" />
          </Form.Item>

          <Space style={{ width: '100%' }} size="middle">
            <Form.Item
              name="period"
              label="Period"
              rules={[{ required: true, message: 'Please enter period' }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="e.g., 2022 - Present" />
            </Form.Item>

            <Form.Item
              name="duration"
              label="Duration"
              rules={[{ required: true, message: 'Please enter duration' }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="e.g., 2 years 3 months" />
            </Form.Item>
          </Space>

          <Form.Item
            name="technologies"
            label="Technologies"
            rules={[{ required: true, message: 'Please enter technologies' }]}
          >
            <Input placeholder="e.g., React, Node.js, AWS" />
          </Form.Item>

          <Form.Item name="order" label="Order">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Space>
            <Form.Item name="isHighlighted" label="Highlighted" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item name="isActive" label="Active" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Space>

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

export default WorkExperiencesPage;
