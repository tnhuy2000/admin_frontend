import { gql } from '@apollo/client';

// Navigation Mutations
export const CREATE_NAVIGATION = gql`
  mutation CreateNavigation($input: CreateNavigationInput!) {
    createNavigation(input: $input) {
      _id
      label
      href
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_NAVIGATION = gql`
  mutation UpdateNavigation($id: ID!, $input: UpdateNavigationInput!) {
    updateNavigation(id: $id, input: $input) {
      _id
      label
      href
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_NAVIGATION = gql`
  mutation DeleteNavigation($id: ID!) {
    deleteNavigation(id: $id)
  }
`;

// SocialLink Mutations
export const CREATE_SOCIAL_LINK = gql`
  mutation CreateSocialLink($input: CreateSocialLinkInput!) {
    createSocialLink(input: $input) {
      _id
      platform
      label
      href
      icon
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_SOCIAL_LINK = gql`
  mutation UpdateSocialLink($id: ID!, $input: UpdateSocialLinkInput!) {
    updateSocialLink(id: $id, input: $input) {
      _id
      platform
      label
      href
      icon
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_SOCIAL_LINK = gql`
  mutation DeleteSocialLink($id: ID!) {
    deleteSocialLink(id: $id)
  }
`;

// Skill Mutations
export const CREATE_SKILL = gql`
  mutation CreateSkill($input: CreateSkillInput!) {
    createSkill(input: $input) {
      _id
      title
      description
      variant
      items {
        name
        order
      }
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($id: ID!, $input: UpdateSkillInput!) {
    updateSkill(id: $id, input: $input) {
      _id
      title
      description
      variant
      items {
        name
        order
      }
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_SKILL = gql`
  mutation DeleteSkill($id: ID!) {
    deleteSkill(id: $id)
  }
`;

// WorkExperience Mutations
export const CREATE_WORK_EXPERIENCE = gql`
  mutation CreateWorkExperience($input: CreateWorkExperienceInput!) {
    createWorkExperience(input: $input) {
      _id
      period
      duration
      company
      position
      technologies
      isHighlighted
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_WORK_EXPERIENCE = gql`
  mutation UpdateWorkExperience($id: ID!, $input: UpdateWorkExperienceInput!) {
    updateWorkExperience(id: $id, input: $input) {
      _id
      period
      duration
      company
      position
      technologies
      isHighlighted
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_WORK_EXPERIENCE = gql`
  mutation DeleteWorkExperience($id: ID!) {
    deleteWorkExperience(id: $id)
  }
`;

// Tag Mutations
export const CREATE_TAG = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      _id
      name
      slug
      description
      color
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation UpdateTag($id: ID!, $input: UpdateTagInput!) {
    updateTag(id: $id, input: $input) {
      _id
      name
      slug
      description
      color
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id)
  }
`;

// Project Mutations
export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      _id
      title
      slug
      description
      content
      excerpt
      thumbnail {
        url
        fileName
        type
      }
      images {
        url {
          url
          fileName
          type
        }
        alt
        isFeatured
        order
      }
      tags
      technologies
      links {
        type
        url
        label
      }
      status
      startDate
      endDate
      isFeatured
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      _id
      title
      slug
      description
      content
      excerpt
      thumbnail {
        url
        fileName
        type
      }
      images {
        url {
          url
          fileName
          type
        }
        alt
        isFeatured
        order
      }
      tags
      technologies
      links {
        type
        url
        label
      }
      status
      startDate
      endDate
      isFeatured
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id)
  }
`;

// Article Mutations
export const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      _id
      title
      slug
      description
      content
      excerpt
      thumbnail {
        url
        fileName
        type
      }
      coverImage {
        url
        fileName
        type
      }
      tags
      categories
      status
      publishedAt
      author
      readingTime
      views
      isFeatured
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($id: ID!, $input: UpdateArticleInput!) {
    updateArticle(id: $id, input: $input) {
      _id
      title
      slug
      description
      content
      excerpt
      thumbnail {
        url
        fileName
        type
      }
      coverImage {
        url
        fileName
        type
      }
      tags
      categories
      status
      publishedAt
      author
      readingTime
      views
      isFeatured
      order
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id)
  }
`;

export const INCREMENT_ARTICLE_VIEWS = gql`
  mutation IncrementArticleViews($id: ID!) {
    incrementArticleViews(id: $id) {
      _id
      views
    }
  }
`;
