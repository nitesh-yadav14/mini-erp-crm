import prisma from "../config/prisma";

class DashboardService {
  async getDashboard() {
    const [
      totalCustomers,
      totalProducts,
      totalChallans,
      products,
      recentChallans,
      recentMovements,
    ] = await Promise.all([
      prisma.customer.count(),

      prisma.product.count(),

      prisma.challan.count(),

      prisma.product.findMany(),

      prisma.challan.findMany({
        include: {
          customer: true,
          createdBy: true,
          items: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),

      prisma.stockMovement.findMany({
        include: {
          product: true,
          createdBy: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),
    ]);

    // Products with stock less than or equal to minimum stock
    const lowStockProducts = products.filter(
      (product) => product.currentStock <= product.minimumStock
    );

    return {
      stats: {
        totalCustomers,
        totalProducts,
        totalChallans,
        lowStockCount: lowStockProducts.length,
      },

      lowStockProducts,

      recentChallans,

      recentMovements,
    };
  }
}

export default new DashboardService();