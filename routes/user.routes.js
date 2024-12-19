import express, { Router } from "express";
import { loginUser, logoutUser, profileUser, registerUser, updateUser } from "../controllers/users.controllers.js";
const router = Router();

router.post("/users/register",registerUser);
router.post("/users/login",loginUser);
router.get("/users/login",logoutUser);
router.get("/users/profile",profileUser);
router.put("/users/profile",updateUser);


export default router;