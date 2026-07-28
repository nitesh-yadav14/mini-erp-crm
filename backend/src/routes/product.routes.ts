import { Router } from "express";

import {

createProduct,

getProducts,

getProduct,

updateProduct,

deleteProduct,

} from "../controllers/product.controller";

import { authenticate } from "../middleware/auth.middleware";

import { authorize } from "../middleware/role.middleware";

import { productValidator } from "../validators/product.validator";

const router = Router();

router.use(authenticate);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post(

"/",

authorize(

"ADMIN",

"WAREHOUSE"

),

productValidator,

createProduct

);

router.put(

"/:id",

authorize(

"ADMIN",

"WAREHOUSE"

),

updateProduct

);

router.delete(

"/:id",

authorize("ADMIN"),

deleteProduct

);

export default router;