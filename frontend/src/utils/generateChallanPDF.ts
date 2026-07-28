import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Challan } from "../types/challan";

export function generateChallanPDF(
  challan: Challan
) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Sales Challan", 14, 20);

  doc.setFontSize(12);

  doc.text(
    `Challan No : ${challan.challanNumber}`,
    14,
    35
  );

  doc.text(
    `Customer : ${
      challan.customer?.customerName ??
      "N/A"
    }`,
    14,
    45
  );

  doc.text(
    `Status : ${challan.status}`,
    14,
    55
  );

  doc.text(
    `Total Quantity : ${challan.totalQuantity}`,
    14,
    65
  );

  autoTable(doc, {
    startY: 80,

    head: [
      [
        "Product",
        "SKU",
        "Qty",
        "Unit Price",
      ],
    ],

    body: challan.items.map((item) => [
      item.productName ?? "",
      item.sku ?? "",
      item.quantity,
      item.unitPrice ?? 0,
    ]),
  });

  doc.save(
    `${challan.challanNumber}.pdf`
  );
}