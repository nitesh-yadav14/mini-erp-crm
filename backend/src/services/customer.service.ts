import prisma from "../config/prisma";

class CustomerService {
  async create(data: any, userId: string) {
    return await prisma.customer.create({
      data: {
        ...data,
        createdById: userId,
      },
      include: {
        createdBy: true,
        followUps: true,
      },
    });
  }

  async getAll(
    page: number,
    limit: number,
    search?: string
  ) {
    const where = search
      ? {
          OR: [
            {
              customerName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              businessName: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              mobile: {
                contains: search,
              },
            },
          ],
        }
      : {};

    const customers = await prisma.customer.findMany({
      where,
      include: {
        createdBy: true,
        followUps: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.customer.count({
      where,
    });

    return {
      customers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: string) {
    return await prisma.customer.findUnique({
      where: {
        id,
      },
      include: {
        createdBy: true,
        followUps: true,
      },
    });
  }

  async update(id: string, data: any) {
    return await prisma.customer.update({
      where: {
        id,
      },
      data,
      include: {
        createdBy: true,
        followUps: true,
      },
    });
  }

  async delete(id: string) {
    return await prisma.customer.delete({
      where: {
        id,
      },
    });
  }
}

export default new CustomerService();