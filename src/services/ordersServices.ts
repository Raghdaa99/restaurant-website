import axios from 'axios';
import type { OrderInfo } from '@/types/food';

const apiClient = axios.create({
  baseURL: 'https://613f1625e9d92a0017e17421.mockapi.io/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getOrders = async () => {
  const response = await apiClient.get('/orders');
  return response.data;
};

export const createOrder = async (order: OrderInfo) => {
  try {
    const response = await apiClient.post('/orders', order);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};


