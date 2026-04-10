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
import { PlusOutlined, EditOutlined, DeleteOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons';
import RichTextEditor from '@/components/RichTextEditor';
import { useQuery, useMutation } from '@apollo/client/react';
import dayjs from 'dayjs';
import {
  GET_ARTICLES,
  GET_TAGS,
} from '@/codegen/graphql-definition/admin-service/portfolio-queries';
import {
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
} from '@/codegen/graphql-definition/admin-service/portfolio-mutations';
import type {
  GetArticlesQuery,
  GetTagsQuery,
  CreateArticleMutation,
  CreateArticleMutationVariables,
  UpdateArticleMutation,
  UpdateArticleMutationVariables,
  DeleteArticleMutation,
  DeleteArticleMutationVariables,
  CreateArticleInput,
  UpdateArticleInput,
  ArticleStatus,
  LinkDocument,
} from '@/graphql/generated';
import LinkDocumentUpload from '@/components/LinkDocumentUpload';

const { Title, Text } = Typography;

type Article = GetArticlesQuery['articles'][number];

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

const ArticlesPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Article | null>(null);
  const [form] = Form.useForm();

  const { data, loading, refetch } = useQuery<GetArticlesQuery>(
    GET_ARTICLES
  );

  const { data: tagsData } = useQuery<GetTagsQuery>(GET_TAGS);

  const [createArticle, { loading: creating }] = useMutation<
    CreateArticleMutation,
    CreateArticleMutationVariables
  >(CREATE_ARTICLE);

  const [updateArticle, { loading: updating }] = useMutation<
    UpdateArticleMutation,
    UpdateArticleMutationVariables
  >(UPDATE_ARTICLE);

  const [deleteArticle] = useMutation<
    DeleteArticleMutation,
    DeleteArticleMutationVariables
  >(DELETE_ARTICLE);

  const handleCreate = () => {
    setEditingItem(null);
    form.resetFields();
    form.setFieldsValue({ isActive: true, isFeatured: false, status: 'draft', order: 0, readingTime: 5 });
    setModalOpen(true);
  };

  const handleEdit = (record: Article) => {
    setEditingItem(record);
    form.setFieldsValue({
      ...record,
      thumbnail: {
        fileName: record?.thumbnail?.fileName,
        type: record?.thumbnail?.type,
        url: record?.thumbnail?.url,
      },
      coverImage: {
        fileName: record?.coverImage?.fileName,
        type: record?.coverImage?.type,
        url: record?.coverImage?.url,
      },
      publishedAt: record.publishedAt ? dayjs(record.publishedAt) : null,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteArticle({ variables: { id } });
      message.success('Article deleted successfully!');
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
      thumbnail: {
        fileName: values?.thumbnail?.fileName,
        type: values?.thumbnail?.type,
        url: values?.thumbnail?.url,
      },
      coverImage: {
        fileName: values?.coverImage?.fileName,
        type: values?.coverImage?.type,
        url: values?.coverImage?.url,
      },
        publishedAt: values.publishedAt?.toISOString() || null,
      };

      if (editingItem) {
        await updateArticle({
          variables: { id: editingItem._id, input: input as UpdateArticleInput },
        });
        message.success('Article updated successfully!');
      } else {
        await createArticle({
          variables: { input: input as CreateArticleInput },
        });
        message.success('Article created successfully!');
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
      render: (title: string, record: Article) => (
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
      render: (status: ArticleStatus) => (
        <Tag color={STATUS_COLORS[status]}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (author: string) => author || '-',
    },
    {
      title: 'Reading Time',
      dataIndex: 'readingTime',
      key: 'readingTime',
      width: 100,
      render: (time: number) => `${time} min`,
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
      width: 80,
      render: (views: number) => (
        <Space>
          <EyeOutlined />
          {views}
        </Space>
      ),
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
      width: 80,
      sorter: (a: Article, b: Article) => a.order - b.order,
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
      render: (_: any, record: Article) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Popconfirm
            title="Delete Article"
            description="Are you sure you want to delete this article?"
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
              Articles
            </Title>
            <Text type="secondary">Manage your blog articles</Text>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Add Article
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={data?.articles || []}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} articles`,
          }}
        />
      </Card>

      <Modal
        title={editingItem ? 'Edit Article' : 'Create Article'}
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
            <Input placeholder="Article title" onChange={handleTitleChange} />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: 'Please enter slug' }]}
          >
            <Input placeholder="article-slug" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} placeholder="Short description" />
          </Form.Item>

          <Form.Item name="excerpt" label="Excerpt">
            <Input.TextArea rows={2} placeholder="Brief excerpt for previews" />
          </Form.Item>

          <Form.Item name="content" label="Content">
            <RichTextEditor placeholder="Full article content..." minHeight={300} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="thumbnail" label="Thumbnail">
                <LinkDocumentUpload isImage placeholder="Enter thumbnail URL" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="coverImage" label="Cover Image">
                <LinkDocumentUpload isImage placeholder="Enter cover image URL" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="status" label="Status">
                <Select options={STATUS_OPTIONS} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="publishedAt" label="Publish Date">
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="author" label="Author">
                <Input placeholder="Author name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="readingTime" label="Reading Time (min)">
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="order" label="Order">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="tags" label="Tags">
            <Select mode="multiple" options={tagOptions} placeholder="Select tags" />
          </Form.Item>

          <Form.Item name="categories" label="Categories">
            <Select mode="tags" placeholder="Type and press enter to add" />
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

export default ArticlesPage;
