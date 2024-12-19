import express,{Router} from 'express';
import { createManyProducts, createProduct, deleteProduct, getAllProduct, updateProduct } from '../controllers/product.controllers';
const router = Router();

router.post("/products/create",createProduct);
router.get("/products/all",getAllProduct);
router.delete("/products/delete",deleteProduct);
router.put("/products/update",updateProduct);
router.post("/products/create-many",createManyProducts);

export default router;