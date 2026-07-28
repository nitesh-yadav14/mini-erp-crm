import prisma from "../config/prisma";
import { MovementType } from "@prisma/client";

class InventoryService {
  async updateStock(
    productId: string,
    quantity: number,
    movementType: MovementType,
    reason: string,
    userId: string
  ) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    let updatedStock = product.currentStock;

    if (movementType === "IN") {
      updatedStock += quantity;
    } else {
      if (product.currentStock < quantity) {
        throw new Error("Insufficient stock");
      }

      updatedStock -= quantity;
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedProduct = await tx.product.update({
        where: {
          id: productId,
        },
        data: {
          currentStock: updatedStock,
        },
      });

      await tx.stockMovement.create({
        data: {
          quantity,
          movementType,
          reason,
          productId,
          createdById: userId,
        },
      });

      return updatedProduct;
    });

    return result;
  }

  async getMovements(productId: string) {
    return await prisma.stockMovement.findMany({
      where: {
        productId,
      },
      include: {
        createdBy: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export default new InventoryService();