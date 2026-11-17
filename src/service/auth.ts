import api from './api';

export interface User {
  _id?: string;
  id?: string;
  firstName: string;
  lastName?: string;
  email: string;
  roles: string[];
  createdAt?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'STAFF';
}

export interface AuthSuccessData {
  firstName: string;
  email: string;
  roles: string[];
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  message: string;
  data: AuthSuccessData;
}

export interface RegisterResponse {
  message: string;
}

export interface RefreshTokenResponse {
  access_token: string;
}

export const loginUser = async (credentials: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData: RegisterPayload): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/auth/register', userData);
  return response.data;
};

export const refreshToken = async (refreshTokenValue: string): Promise<RefreshTokenResponse> => {
  const response = await api.post<RefreshTokenResponse>('/auth/refresh-token', {
    refreshToken: refreshTokenValue,
  });
  return response.data;
};

export const getSystemUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/auth/users');
  return response.data;
};

export const updateSystemUser = async (
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: 'ADMIN' | 'STAFF';
  }
): Promise<User> => {
  const response = await api.put<{ message: string; data: User }>(
    `/auth/users/${userId}`,
    data
  );
  return response.data.data;
};

export const deleteSystemUser = async (userId: string): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`/auth/users/${userId}`);
  return response.data;
};
