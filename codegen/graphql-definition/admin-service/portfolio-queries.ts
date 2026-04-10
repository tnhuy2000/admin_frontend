import { gql } from '@apollo/client';

// Navigation Queries
export const GET_NAVIGATIONS = gql`
  query GetNavigations($isActive: Boolean) {
    navigations(isActive: $isActive) {
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

export const GET_NAVIGATION = gql`
  query GetNavigation($id: ID!) {
    navigation(id: $id) {
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

// SocialLink Queries
export const GET_SOCIAL_LINKS = gql`
  query GetSocialLinks($isActive: Boolean) {
    socialLinks(isActive: $isActive) {
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

export const GET_SOCIAL_LINK = gql`
  query GetSocialLink($id: ID!) {
    socialLink(id: $id) {
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

// Skill Queries
export const GET_SKILLS = gql`
  query GetSkills($isActive: Boolean) {
    skills(isActive: $isActive) {
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

export const GET_SKILL = gql`
  query GetSkill($id: ID!) {
    skill(id: $id) {
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

// WorkExperience Queries
export const GET_WORK_EXPERIENCES = gql`
  query GetWorkExperiences($isActive: Boolean) {
    workExperiences(isActive: $isActive) {
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

export const GET_WORK_EXPERIENCE = gql`
  query GetWorkExperience($id: ID!) {
    workExperience(id: $id) {
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

// Tag Queries
export const GET_TAGS = gql`
  query GetTags($isActive: Boolean) {
    tags(isActive: $isActive) {
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

export const GET_TAG = gql`
  query GetTag($id: ID!) {
    tag(id: $id) {
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

// Project Queries
export const GET_PROJECTS = gql`
  query GetProjects($isActive: Boolean, $isFeatured: Boolean, $status: ProjectStatus) {
    projects(isActive: $isActive, isFeatured: $isFeatured, status: $status) {
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

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
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

// Article Queries
export const GET_ARTICLES = gql`
  query GetArticles($isActive: Boolean, $isFeatured: Boolean, $status: ArticleStatus) {
    articles(isActive: $isActive, isFeatured: $isFeatured, status: $status) {
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

export const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
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
