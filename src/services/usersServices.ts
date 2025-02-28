import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://67bcb0f8ed4861e07b3b954b.mockapi.io/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signIn = async (user: User) => {
  const response = await apiClient.post('/users/signin', user);
  return response.data;
};

export const signUp = async (user: User) => {
  const response = await apiClient.post('/users/signup', user);
  return response.data;
};

export const createUser = async (user: User) => {
  const response = await apiClient.post('/users', user);
  return response.data;
};












