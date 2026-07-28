import { Response } from "express";
import { validationResult } from "express-validator";
import { AuthRequest } from "../middleware/auth.middleware";
import challanService from "../services/challan.service";
import { ApiResponse } from "../utils/ApiResponse";

export const createChallan = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(
        new ApiResponse(
          false,
          "Validation failed",
          errors.array()
        )
      );
    }

    const challan = await challanService.create(
      req.body,
      req.user.id
    );

    return res.status(201).json(
      new ApiResponse(
        true,
        "Challan created successfully",
        challan
      )
    );
  } catch (err: any) {
    return res.status(err.statusCode || 500).json(
      new ApiResponse(
        false,
        err.message
      )
    );
  }
};

export const getChallans = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const challans = await challanService.getAll();

    return res.json(
      new ApiResponse(
        true,
        "Challans fetched successfully",
        challans
      )
    );
  } catch (err: any) {
    return res.status(err.statusCode || 500).json(
      new ApiResponse(
        false,
        err.message
      )
    );
  }
};

export const getChallan = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const challan = await challanService.getById(
      req.params.id
    );

    return res.json(
      new ApiResponse(
        true,
        "Challan fetched successfully",
        challan
      )
    );
  } catch (err: any) {
    return res.status(err.statusCode || 500).json(
      new ApiResponse(
        false,
        err.message
      )
    );
  }
};