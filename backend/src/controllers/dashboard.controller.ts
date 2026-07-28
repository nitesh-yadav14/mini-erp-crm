import { Request, Response } from "express";
import dashboardService from "../services/dashboard.service";
import { ApiResponse } from "../utils/ApiResponse";

export const getDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await dashboardService.getDashboard();

    return res.status(200).json(
      new ApiResponse(
        true,
        "Dashboard data fetched successfully",
        data
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