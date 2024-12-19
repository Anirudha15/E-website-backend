import { Router } from "express";
import { createOrder, deleteOrderById, getAllOrders, getMyOrders, getOrderById, updarteOrderStatus } from "../controllers/order.controllers";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware.js";
const router = Router();
// user
router.post("/orders/create",isAuthenticated,createOrder);
router.get("/orders/all",isAuthenticated,getMyOrders);

router.get("/orders/:id",isAuthenticated,getOrderById);
// admin
router.get("/orders/all",isAuthenticated,isAdmin,getAllOrders);
router.delete("/orders/delete/:id",isAuthenticated,isAdmin,deleteOrderById);
router.put("/orders/update-status",isAuthenticated,isAdmin,updarteOrderStatus);

export default  router;