import api from "../api/axios";
import type { Customer } from "../types/customer";

export interface CustomerResponse {
  customers: Customer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getCustomers = async (
  search = "",
  page = 1,
  limit = 10
): Promise<CustomerResponse> => {
  const response = await api.get("/customers", {
    params: {
      search,
      page,
      limit,
    },
  });

  return response.data.data;
};

export const getCustomerById = async (
  id: string
): Promise<Customer> => {
  const response = await api.get(`/customers/${id}`);
  return response.data.data;
};

export const createCustomer = async (
  customer: Partial<Customer>
): Promise<Customer> => {
  const response = await api.post(
    "/customers",
    customer
  );

  return response.data.data;
};

export const updateCustomer = async (
  id: string,
  customer: Partial<Customer>
): Promise<Customer> => {
  const response = await api.put(
    `/customers/${id}`,
    customer
  );

  return response.data.data;
};

export const deleteCustomer = async (
  id: string
): Promise<void> => {
  await api.delete(`/customers/${id}`);
};