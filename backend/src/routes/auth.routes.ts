import { Router } from "express";

import {
  login,
  register,
} from "../controllers/auth.controller";

import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator";

const router = Router();

router.post(
  "/register",
  registerValidator,
  register
);

router.post(
  "/login",
  loginValidator,
  login
);

export default router;