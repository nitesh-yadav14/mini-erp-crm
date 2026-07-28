import { Router } from "express";

import {
  createChallan,
  getChallans,
  getChallan,
} from "../controllers/challan.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { challanValidator } from "../validators/challan.validator";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  getChallans
);

router.get(
  "/:id",
  getChallan
);

router.post(
  "/",
  authorize(
    "ADMIN",
    "SALES"
  ),
  challanValidator,
  createChallan
);

export default router;