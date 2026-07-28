import { body } from "express-validator";

export const customerValidator = [
  body("customerName").notEmpty().withMessage("Customer name is required"),
  body("mobile").notEmpty().withMessage("Mobile number is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("businessName").notEmpty(),
  body("customerType").isIn([
    "RETAIL",
    "WHOLESALE",
    "DISTRIBUTOR",
  ]),
  body("address").notEmpty(),
  body("status").isIn([
    "LEAD",
    "ACTIVE",
    "INACTIVE",
  ]),
];