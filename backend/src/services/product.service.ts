import prisma from "../config/prisma";
import { ApiError } from "../utils/ApiError";

class ProductService {
  async create(data: any) {
    const existingProduct = await prisma.product.findUnique({
      where: {
        sku: data.sku,
      },
    });

    if (existingProduct) {
      throw new ApiError(400, "Product with this SKU already exists");
    }

    return await prisma.product.create({
      data,
    });
  }

  async getAll(
    page: number = 1,
    limit: number = 10,
    search?: string
  ) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            {
              productName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              sku: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              category: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.product.count({
        where,
      }),
    ]);

    return {
      total,
      page,
      limit,
      products,
    };
  }

  async getById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return product;
  }

  async update(id: string, data: any) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return await prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return {
      message: "Product deleted successfully",
    };
  }
}

export default new ProductService();