import api from "../api/axios";
import type { Challan } from "../types/challan";

export const getChallans = async (): Promise<Challan[]> => {
  const response = await api.get("/challans");
  return response.data.data;
};

export const getChallanById = async (
  id: string
): Promise<Challan> => {
  const response = await api.get(`/challans/${id}`);
  return response.data.data;
};

export const createChallan = async (
  challan: Partial<Challan>
): Promise<Challan> => {
  const response = await api.post(
    "/challans",
    challan
  );

  return response.data.data;
};

export const cancelChallan = async (
  id: string
): Promise<void> => {
  await api.put(`/challans/${id}/cancel`);
};