import api from "../api/axios";

export const updateStock = async (
  productId: string,
  data: {
    quantity: number;
    movementType: "IN" | "OUT";
    reason: string;
  }
) => {
  const response = await api.post(
    `/inventory/update-stock`,
    {
      productId,
      ...data,
    }
  );

  return response.data.data;
};

export const getMovements = async (
  productId: string
) => {
  const response = await api.get(
    `/inventory/movements/${productId}`
  );

  return response.data.data;
};