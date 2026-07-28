export interface ChallanItem {
  productId: string;
  productName?: string;
  sku?: string;
  unitPrice?: number;
  quantity: number;
}

export interface Challan {
  id: string;
  challanNumber: string;
  customerId: string;
  totalQuantity: number;
  status: "DRAFT" | "CONFIRMED" | "CANCELLED";

  customer?: {
    id: string;
    customerName: string;
  };

  items: ChallanItem[];

  createdAt?: string;
}