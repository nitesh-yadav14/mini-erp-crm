import { body } from "express-validator";

export const productValidator = [

  body("productName").notEmpty(),

  body("sku").notEmpty(),

  body("category").notEmpty(),

  body("unitPrice").isFloat(),

  body("currentStock").isInt(),

  body("minimumStock").isInt(),

  body("warehouse").notEmpty(),

];