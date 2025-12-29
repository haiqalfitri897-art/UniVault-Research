import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function useAPI(token) {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const post = async (url, data) => {
    try {
      const response = await client.post(url, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'An error occurred' };
    }
  };

  const get = async (url) => {
    try {
      const response = await client.get(url);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'An error occurred' };
    }
  };

  return { post, get, client };
}
