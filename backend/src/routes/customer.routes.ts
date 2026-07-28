import { Router } from "express";

import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customer.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { customerValidator } from "../validators/customer.validator";

const router = Router();

router.use(authenticate);

router.get("/", getCustomers);

router.get("/:id", getCustomer);

router.post(
  "/",
  authorize(
    "ADMIN",
    "SALES"
  ),
  customerValidator,
  createCustomer
);

router.put(
  "/:id",
  authorize(
    "ADMIN",
    "SALES"
  ),
  updateCustomer
);

router.delete(
  "/:id",
  authorize("ADMIN"),
  deleteCustomer
);

export default router;