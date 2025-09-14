import { api } from '../config/api';

export interface UserCreate {
  name: string;
  status: number;
  count?: number | null;
  message?: string | null;
}

export interface User {
  id: string;
  name: string;
  status: number;
  count?: number | null;
  message?: string | null;
}

export interface UserResponse {
  inserted_id: string;
  user: UserCreate;
}

// Create a new user (RSVP submission)
export const createUser = async (userData: UserCreate): Promise<UserResponse> => {
  const response = await api.post<UserResponse>('/users/', userData);
  return response.data;
};

// Get all users (requires admin authentication)
export const getAllUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/users/');
  return response.data;
};
