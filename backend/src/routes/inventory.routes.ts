import { Router } from "express";

import {
  updateStock,
  getStockMovements,
} from "../controllers/inventory.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.use(authenticate);

router.post(
  "/:id",
  authorize(
    "ADMIN",
    "WAREHOUSE"
  ),
  updateStock
);

router.get(
  "/:id",
  authorize(
    "ADMIN",
    "WAREHOUSE"
  ),
  getStockMovements
);

export default router;