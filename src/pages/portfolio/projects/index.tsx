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
  DatePicker,
  Image,
  Row,
  Col,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, StarOutlined, MinusCircleOutlined } from '@ant-design/icons';
import RichTextEditor from '@/components/RichTextEditor';
import { useQuery, useMutation } from '@apollo/client/react';
import dayjs from 'dayjs';
import {
  GET_PROJECTS,
  GET_TAGS,
} from '@/codegen/graphql-definition/admin-service/portfolio-queries';
import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from '@/codegen/graphql-definition/admin-service/portfolio-mutations';
import type {
  GetProjectsQuery,
  GetTagsQuery,
  CreateProjectMutation,
  CreateProjectMutationVariables,
  UpdateProjectMutation,
  UpdateProjectMutationVariables,
  DeleteProjectMutation,
  DeleteProjectMutationVariables,
  CreateProjectInput,
  UpdateProjectInput,
  ProjectStatus,
  LinkDocument,
  ProjectImageInput,
} from '@/graphql/generated';
import LinkDocumentUpload from '@/components/LinkDocumentUpload';

const { Title, Text } = Typography;

type Project = GetProjectsQuery['projects'][number];

const STATUS_OPTIONS = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
];

const STATUS_COLORS: Record<string, string> = {
  draft: 'default',
  published: 'green',
  archived: 'red',
};

const LINK_TYPE_OPTIONS = [
  { label: 'GitHub', value: 'github' },
  { label: 'Live Demo', value: 'live' },
  { label: 'Demo', value: 'demo' },
  { label: 'Documentation', value: 'docs' },
  { label: 'Other', value: 'other' },
];

const ProjectsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [form] = Form.useForm();

  const { data, loading, refetch } = useQuery<GetProjectsQuery>(
    GET_PROJECTS
  );

  const { data: tagsData } = useQuery<GetTagsQuery>(GET_TAGS);

  const [createProject, { loading: creating }] = useMutation<
    CreateProjectMutation,
    CreateProjectMutationVariables
  >(CREATE_PROJECT);

  const [updateProject, { loading: updating }] = useMutation<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >(UPDATE_PROJECT);

  const [deleteProject] = useMutation<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
  >(DELETE_PROJECT);

  const handleCreate = () => {
    setEditingItem(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true, isFeatured: false, status: 'draft', order: 0 });
    setModalOpen(true);
  };

  const handleEdit = (record: Project) => {
    setEditingItem(record);
    form.setFieldsValue({
      ...record,
      thumbnail: record.thumbnail || null,
      startDate: record.startDate ? dayjs(record.startDate) : null,
      endDate: record.endDate ? dayjs(record.endDate) : null,
      links: record.links.map((link) => ({
        type: link.type,
        url: link.url,
        label: link.label,
      })),
      images: record.images?.map((img) => ({
        url: img.url || null,
        alt: img.alt,
        isFeatured: img.isFeatured,
        order: img.order,
      })) || [],
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProject({ variables: { id } });
      message.success('Project deleted successfully!');
      refetch();
    } catch (error: any) {
      message.error(`Failed to delete: ${error.message}`);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!editingItem) {
      form.setFieldsValue({ slug: generateSlug(title) });
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const input = {
        ...values,
        startDate: values.startDate?.toISOString() || null,
        endDate: values.endDate?.toISOString() || null,
        links: values.links || [],
        images: values.images?.map((img: ProjectImageInput) => ({
          url: {
            fileName: img?.url?.fileName,
            type: img?.url?.type,
            url: img?.url?.url,
          },
          alt: img.alt,
          isFeatured: img.isFeatured,
          order: img.order,
        })) || [],
        thumbnail: {
           fileName: values?.thumbnail?.fileName,
          type: values?.thumbnail?.type,
          url: values?.thumbnail?.url,
        }
      };

      if (editingItem) {
        await updateProject({
          variables: { id: editingItem._id, input: input as UpdateProjectInput },
        });
        message.success('Project updated successfully!');
      } else {
        await createProject({
          variables: { input: input as CreateProjectInput },
        });
        message.success('Project created successfully!');
      }
      setModalOpen(false);
      refetch();
    } catch (error: any) {
      message.error(`Failed to save: ${error.message}`);
    }
  };

  const columns = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 80,
      render: (thumbnail: LinkDocument | null) =>
        thumbnail?.url ? (
          <Image src={thumbnail.url} alt="thumbnail" width={60} height={40} style={{ objectFit: 'cover', borderRadius: 4 }} />
        ) : (
          <div style={{ width: 60, height: 40, background: '#f0f0f0', borderRadius: 4 }} />
        ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: Project) => (
        <Space>
          {title}
          {record.isFeatured && <StarOutlined style={{ color: '#faad14' }} />}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: ProjectStatus) => (
        <Tag color={STATUS_COLORS[status]}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Technologies',
      dataIndex: 'technologies',
      key: 'technologies',
      render: (technologies: string[]) => (
        <Space wrap>
          {technologies.slice(0, 3).map((tech, i) => (
            <Tag key={i}>{tech}</Tag>
          ))}
          {technologies.length > 3 && <Tag>+{technologies.length - 3}</Tag>}
        </Space>
      ),
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      sorter: (a: Project, b: Project) => a.order - b.order,
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 80,
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'Yes' : 'No'}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_: any, record: Project) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Popconfirm
            title="Delete Project"
            description="Are you sure you want to delete this project?"
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

  const tagOptions = tagsData?.tags.map((tag) => ({ label: tag.name, value: tag._id })) || [];

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
              Projects
            </Title>
            <Text type="secondary">Manage your portfolio projects</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Add Project
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data?.projects || []}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} projects`,
          }}
        />
      </Card>

      <Modal
        title={editingItem ? 'Edit Project' : 'Create Project'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter title' }]}
          >
            <Input placeholder="Project title" onChange={handleTitleChange} />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: 'Please enter slug' }]}
          >
            <Input placeholder="project-slug" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} placeholder="Short description" />
          </Form.Item>

          <Form.Item name="content" label="Content">
            <RichTextEditor placeholder="Full project content..." />
          </Form.Item>

          <Form.Item name="thumbnail" label="Thumbnail">
            <LinkDocumentUpload isImage placeholder="Enter thumbnail URL" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="status" label="Status">
                <Select options={STATUS_OPTIONS} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="order" label="Order">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="startDate" label="Start Date">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="endDate" label="End Date">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="tags" label="Tags">
            <Select mode="multiple" options={tagOptions} placeholder="Select tags" />
          </Form.Item>

          <Form.Item name="technologies" label="Technologies">
            <Select mode="tags" placeholder="Type and press enter to add" />
          </Form.Item>

          <Form.Item label="Links">
            <Form.List name="links">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item {...restField} name={[name, 'type']} style={{ marginBottom: 0 }}>
                        <Select options={LINK_TYPE_OPTIONS} placeholder="Type" style={{ width: 120 }} />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'url']} style={{ marginBottom: 0, flex: 1 }}>
                        <Input placeholder="URL" style={{ width: 300 }} />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'label']} style={{ marginBottom: 0 }}>
                        <Input placeholder="Label (optional)" style={{ width: 150 }} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Link
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item label="Images">
            <Form.List name="images">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card key={key} size="small" style={{ marginBottom: 8 }}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Form.Item {...restField} name={[name, 'url']} label="Image" style={{ marginBottom: 8 }}>
                          <LinkDocumentUpload isImage placeholder="Upload or enter image URL" />
                        </Form.Item>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item {...restField} name={[name, 'alt']} label="Alt Text" style={{ marginBottom: 8 }}>
                              <Input placeholder="Image alt text" />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item {...restField} name={[name, 'order']} label="Order" style={{ marginBottom: 8 }}>
                              <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item {...restField} name={[name, 'isFeatured']} label="Featured" valuePropName="checked" style={{ marginBottom: 8 }}>
                              <Switch />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Button type="link" danger onClick={() => remove(name)} icon={<MinusCircleOutlined />} style={{ padding: 0 }}>
                          Remove Image
                        </Button>
                      </Space>
                    </Card>
                  ))}
                  <Button type="dashed" onClick={() => add({ isFeatured: false, order: fields.length })} block icon={<PlusOutlined />}>
                    Add Image
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Space>
            <Form.Item name="isFeatured" label="Featured" valuePropName="checked">
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

export default ProjectsPage;
