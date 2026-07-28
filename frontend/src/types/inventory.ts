export interface StockMovement {
  id: string;
  quantity: number;
  movementType: "IN" | "OUT";
  reason: string;
  createdAt: string;

  product: {
    id: string;
    productName: string;
    sku: string;
  };
}