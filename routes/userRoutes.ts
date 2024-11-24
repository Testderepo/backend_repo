import express from "express";
import { getUsers, updateUser, createNewUser, getingUserById } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/fetch-user-data", authMiddleware, getUsers);
router.put("/update-user-data/:id", authMiddleware, updateUser);
router.get("/fetch-user-data/:id", authMiddleware, getingUserById); 
router.post("/create-user", createNewUser); // Add this line for creating a new user

export default router;
