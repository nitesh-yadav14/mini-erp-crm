import { body } from "express-validator";

export const challanValidator = [

  body("customerId").notEmpty(),

  body("items").isArray({
    min: 1,
  }),

  body("status").isIn([
    "DRAFT",
    "CONFIRMED",
  ]),

];