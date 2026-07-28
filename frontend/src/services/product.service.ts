import api from "../api/axios";
import type { Product } from "../types/product";

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export const getProducts = async (
  search = "",
  page = 1,
  limit = 10
): Promise<ProductResponse> => {
  const response = await api.get("/products", {
    params: {
      search,
      page,
      limit,
    },
  });

  return response.data.data;
};

export const getProductById = async (
  id: string
): Promise<Product> => {
  const response = await api.get(
    `/products/${id}`
  );

  return response.data.data;
};

export const createProduct = async (
  product: Partial<Product>
): Promise<Product> => {
  const response = await api.post(
    "/products",
    product
  );

  return response.data.data;
};

export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  const response = await api.put(
    `/products/${id}`,
    product
  );

  return response.data.data;
};

export const deleteProduct = async (
  id: string
): Promise<void> => {
  await api.delete(`/products/${id}`);
};


export const getAllProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products", {
    params: {
      page: 1,
      limit: 1000,
    },
  });

  return response.data.data.products;
};