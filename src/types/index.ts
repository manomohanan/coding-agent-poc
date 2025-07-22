export type OrderStatus = 'placed' | 'approved' | 'delivered';

export interface Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  status?: OrderStatus;
  complete?: boolean;
}

export interface Category {
  id?: number;
  name?: string;
}

export interface User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  userStatus?: number;
}

export interface Tag {
  id?: number;
  name?: string;
}

export type PetStatus = 'available' | 'pending' | 'sold';

export interface Pet {
  id?: number;
  name: string;
  category?: Category;
  photoUrls: string[];
  tags?: Tag[];
  status?: PetStatus;
}

export interface ApiResponse {
  code?: number;
  type?: string;
  message?: string;
}

export interface LoginResponse {
  token: string;
  expiresAfter?: string;
  rateLimit?: number;
}