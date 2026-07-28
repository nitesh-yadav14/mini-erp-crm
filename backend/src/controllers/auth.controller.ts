import { Request, Response } from "express";
import { validationResult } from "express-validator";
import authService from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";

export const register = async (
  req: Request,
  res: Response
) => {

  console.log("REGISTER BODY:", req.body);

  try {

    const errors = validationResult(req);

    console.log("VALIDATION ERRORS:", errors.array());

    if (!errors.isEmpty()) {

      return res.status(400).json(
        new ApiResponse(
          false,
          "Validation failed",
          errors.array()
        )
      );

    }

    const result = await authService.register(req.body);

    return res.status(201).json(
      new ApiResponse(
        true,
        "User registered successfully",
        result
      )
    );

  } catch (err: any) {

    console.error(err);

    return res.status(err.statusCode || 500).json(
      new ApiResponse(
        false,
        err.message
      )
    );

  }

};

export const login = async (
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

    const result = await authService.login(
      req.body.email,
      req.body.password
    );

    return res.json(
      new ApiResponse(
        true,
        "Login successful",
        result
      )
    );

  } catch (err: any) {

    console.error(err);

    return res.status(err.statusCode || 500).json(
      new ApiResponse(
        false,
        err.message
      )
    );

  }

};