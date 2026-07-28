import { Request, Response } from "express";
import { validationResult } from "express-validator";
import customerService from "../services/customer.service";
import { AuthRequest } from "../middleware/auth.middleware";
import { ApiResponse } from "../utils/ApiResponse";

export const createCustomer = async (
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

    const customer = await customerService.create(
      req.body,
      req.user.id
    );

    return res.status(201).json(
      new ApiResponse(
        true,
        "Customer created successfully",
        customer
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

export const getCustomers = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;

    const customers = await customerService.getAll(
      page,
      limit,
      search
    );

    return res.json(
      new ApiResponse(
        true,
        "Customers fetched successfully",
        customers
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

export const getCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const customer = await customerService.getById(
      req.params.id
    );

    return res.json(
      new ApiResponse(
        true,
        "Customer fetched successfully",
        customer
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

export const updateCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    const customer = await customerService.update(
      req.params.id,
      req.body
    );

    return res.json(
      new ApiResponse(
        true,
        "Customer updated successfully",
        customer
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

export const deleteCustomer = async (
  req: Request,
  res: Response
) => {
  try {
    await customerService.delete(req.params.id);

    return res.json(
      new ApiResponse(
        true,
        "Customer deleted successfully"
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