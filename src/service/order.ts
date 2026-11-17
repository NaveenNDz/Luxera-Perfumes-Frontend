import api from './api';

export interface OrderItem {
  _id?: string;
  id?: string;
  customer: string;
  email: string;
  salon: string;
  flacon: string;
  quantity: number;
  total: number;
  status: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerItem {
  _id: string;
  name: string;
  email: string;
  salon: string;
  ordersCount: number;
  totalSpend: number;
  lastDate: string;
}

export interface CreateOrderPayload {
  customer: string;
  email: string;
  salon: string;
  flacon: string;
  quantity: number;
  total: number;
  status?: string;
  date?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  data: OrderItem;
}

export const getAllOrders = async (): Promise<OrderItem[]> => {
  const response = await api.get<OrderItem[]>('/orders');
  return response.data;
};

export const placeOrder = async (orderData: CreateOrderPayload): Promise<CreateOrderResponse> => {
  const response = await api.post<CreateOrderResponse>('/orders', orderData);
  return response.data;
};

export const updateOrderStatus = async (
  orderId: string,
  status: string
): Promise<OrderItem> => {
  const response = await api.put<{ success: boolean; data: OrderItem }>(`/orders/${orderId}`, {
    status,
  });
  return response.data.data;
};

export const getCustomers = async (): Promise<CustomerItem[]> => {
  const response = await api.get<CustomerItem[]>('/orders/customers');
  return response.data;
};
