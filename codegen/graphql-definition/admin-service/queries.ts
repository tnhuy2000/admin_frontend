import { gql } from '@apollo/client';

// User Queries
export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      email
      name
      role
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      _id
      email
      name
      role
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      email
      name
      role
      isActive
      createdAt
      updatedAt
    }
  }
`;

// Content Queries
export const GET_CONTENTS = gql`
  query GetContents($query: QueryContentInput!) {
    contents(query: $query) {
      data {
        _id
        title
        slug
        content
        excerpt
        type
        status
        featuredImage
        tags
        categories
        metadata
        author
        publishedAt
        order
        isActive
        createdAt
        updatedAt
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export const GET_CONTENT = gql`
  query GetContent($id: ID!) {
    content(id: $id) {
      _id
      title
      slug
      content
      excerpt
      type
      status
      featuredImage
      tags
      categories
      metadata
      author
      publishedAt
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_CONTENT_BY_SLUG = gql`
  query GetContentBySlug($slug: String!) {
    contentBySlug(slug: $slug) {
      _id
      title
      slug
      content
      excerpt
      type
      status
      featuredImage
      tags
      categories
      metadata
      author
      publishedAt
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

// Settings Queries
export const GET_SETTINGS = gql`
  query GetSettings($category: SettingCategory) {
    settings(category: $category) {
      _id
      key
      value
      category
      description
      type
      isPublic
      createdAt
      updatedAt
    }
  }
`;

export const GET_SETTING = gql`
  query GetSetting($key: String!) {
    setting(key: $key) {
      _id
      key
      value
      category
      description
      type
      isPublic
      createdAt
      updatedAt
    }
  }
`;

export const GET_PUBLIC_SETTINGS = gql`
  query GetPublicSettings {
    publicSettings
  }
`;
