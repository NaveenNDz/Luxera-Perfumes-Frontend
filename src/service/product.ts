import api from "./api";

export interface Product {
  _id?: string;
  productId: string;
  name: string;
  brand: string;
  category: string;
  volume: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  isAvailable: boolean;
}


export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");
  return response.data;
};


export const createProduct = async (data: any) => {
  const response = await api.post("/products", data);
  return response.data;
};