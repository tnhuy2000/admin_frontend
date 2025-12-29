import { gql } from '@apollo/client';

// User Mutations
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
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

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
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

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

// Content Mutations
export const CREATE_CONTENT = gql`
  mutation CreateContent($input: CreateContentInput!) {
    createContent(input: $input) {
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

export const UPDATE_CONTENT = gql`
  mutation UpdateContent($id: ID!, $input: UpdateContentInput!) {
    updateContent(id: $id, input: $input) {
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

export const DELETE_CONTENT = gql`
  mutation DeleteContent($id: ID!) {
    deleteContent(id: $id)
  }
`;

export const BULK_DELETE_CONTENTS = gql`
  mutation BulkDeleteContents($ids: [ID!]!) {
    bulkDeleteContents(ids: $ids)
  }
`;

// Settings Mutations
export const CREATE_SETTING = gql`
  mutation CreateSetting($input: CreateSettingInput!) {
    createSetting(input: $input) {
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

export const UPDATE_SETTING = gql`
  mutation UpdateSetting($key: String!, $input: UpdateSettingInput!) {
    updateSetting(key: $key, input: $input) {
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

export const DELETE_SETTING = gql`
  mutation DeleteSetting($key: String!) {
    deleteSetting(key: $key)
  }
`;

export const BULK_UPDATE_SETTINGS = gql`
  mutation BulkUpdateSettings($settings: [BulkSettingInput!]!) {
    bulkUpdateSettings(settings: $settings)
  }
`;
