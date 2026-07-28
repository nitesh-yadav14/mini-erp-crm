import { Response } from "express";
import inventoryService from "../services/inventory.service";
import { AuthRequest } from "../middleware/auth.middleware";
import { ApiResponse } from "../utils/ApiResponse";

export const updateStock = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const product = await inventoryService.updateStock(
      req.params.id,
      req.body.quantity,
      req.body.movementType,
      req.body.reason,
      req.user.id
    );

    return res.status(200).json(
      new ApiResponse(
        true,
        "Stock updated successfully",
        product
      )
    );
  } catch (err: any) {
    return res.status(err.statusCode || 500).json(
      new ApiResponse(
        false,
        err.message || "Internal Server Error"
      )
    );
  }
};

export const getStockMovements = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const movements = await inventoryService.getMovements(
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        true,
        "Stock movements fetched successfully",
        movements
      )
    );
  } catch (err: any) {
    return res.status(err.statusCode || 500).json(
      new ApiResponse(
        false,
        err.message || "Internal Server Error"
      )
    );
  }
};