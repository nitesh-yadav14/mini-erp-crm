import prisma from "../config/prisma";
import { ChallanStatus } from "@prisma/client";

class ChallanService {

  async create(
    data: any,
    userId: string
  ) {

    return await prisma.$transaction(
      async (tx) => {

        let totalQuantity = 0;

        const challanNumber =
          "CH-" +
          Date.now();

        const challan =
          await tx.challan.create({

            data: {

              challanNumber,

              customerId:
                data.customerId,

              status:
                data.status as ChallanStatus,

              totalQuantity: 0,

              createdById:
                userId,

            },

          });

        for (const item of data.items) {

          const product =
            await tx.product.findUnique({

              where: {
                id: item.productId,
              },

            });

          if (!product) {

            throw new Error(
              "Product not found"
            );

          }

          if (
            data.status ===
              "CONFIRMED" &&
            product.currentStock <
              item.quantity
          ) {

            throw new Error(
              `${product.productName} stock unavailable`
            );

          }

          totalQuantity +=
            item.quantity;

          await tx.challanItem.create({

            data: {

              challanId:
                challan.id,

              productId:
                product.id,

              productName:
                product.productName,

              sku:
                product.sku,

              unitPrice:
                product.unitPrice,

              quantity:
                item.quantity,

            },

          });

          if (
            data.status ===
            "CONFIRMED"
          ) {

            await tx.product.update({

              where: {
                id: product.id,
              },

              data: {

                currentStock: {

                  decrement:
                    item.quantity,

                },

              },

            });

            await tx.stockMovement.create({

              data: {

                productId:
                  product.id,

                quantity:
                  item.quantity,

                movementType:
                  "OUT",

                reason:
                  "Sales Challan",

                createdById:
                  userId,

              },

            });

          }

        }

        return await tx.challan.update({

          where: {
            id: challan.id,
          },

          data: {
            totalQuantity,
          },

          include: {

            customer: true,

            items: true,

          },

        });

      }
    );

  }

  async getAll() {

    return prisma.challan.findMany({

      include: {

        customer: true,

        items: true,

      },

      orderBy: {

        createdAt: "desc",

      },

    });

  }

  async getById(
    id: string
  ) {

    return prisma.challan.findUnique({

      where: {
        id,
      },

      include: {

        customer: true,

        items: true,

      },

    });

  }

}

export default new ChallanService();