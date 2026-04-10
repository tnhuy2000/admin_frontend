import { LinkDocument, TypeDocument } from '@/graphql/generated';
import { message } from 'antd';
import type { RcFile } from 'antd/es/upload/interface';

// Get API base URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
export const UPLOAD_API_URL = `${API_BASE_URL}/upload`;

/**
 * Get auth token from localStorage
 */
const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

/**
 * Upload file to server and return the URL
 */
export const uploadFile = async (file: RcFile, isImage: boolean = false): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  // Use specific endpoint for images or documents
  const endpoint = isImage ? `${UPLOAD_API_URL}/image` : `${UPLOAD_API_URL}`;

  try {
    const token = getAuthToken();
    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.url || data.fileUrl || data.path;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw error;
  }
};

/**
 * Upload file to server and return LinkDocument object
 */
export const uploadFileAsDocument = async (file: RcFile, isImage: boolean = false): Promise<LinkDocument> => {
  const url = await uploadFile(file, isImage);

  return {
    url,
    fileName: file.name,
    type: TypeDocument.File,
  };
};

/**
 * Convert file to base64 (fallback method if no upload endpoint)
 */
export const convertToBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Validate image file
 */
export const validateImageFile = (file: RcFile): boolean => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    message.error('You can only upload image files!');
    return false;
  }

  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('Image must be smaller than 5MB!');
    return false;
  }

  return true;
};

/**
 * Validate general file
 */
export const validateFile = (file: RcFile): boolean => {
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('File must be smaller than 10MB!');
    return false;
  }

  return true;
};
