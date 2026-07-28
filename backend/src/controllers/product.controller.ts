import { Request, Response } from "express";
import { validationResult } from "express-validator";
import productService from "../services/product.service";
import { ApiResponse } from "../utils/ApiResponse";

export const createProduct = async (
  req: Request,
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

    const product = await productService.create(req.body);

    return res.status(201).json(
      new ApiResponse(
        true,
        "Product created successfully",
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

export const getProducts = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as string;

    const products = await productService.getAll(
      page,
      limit,
      search
    );

    return res.status(200).json(
      new ApiResponse(
        true,
        "Products fetched successfully",
        products
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

export const getProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product = await productService.getById(
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        true,
        "Product fetched successfully",
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

export const updateProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product = await productService.update(
      req.params.id,
      req.body
    );

    return res.status(200).json(
      new ApiResponse(
        true,
        "Product updated successfully",
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

export const deleteProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await productService.delete(
      req.params.id
    );

    return res.status(200).json(
      new ApiResponse(
        true,
        result.message
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