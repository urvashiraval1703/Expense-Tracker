import express from "express";
import { registerUser,loginUser,verifyOtp, resendOtp } from "../controllers/authController.js";

const router = express.Router();

//APIS
router.post("/register",registerUser)
router.post("/verifyOtp",verifyOtp)
router.post("/login",loginUser)
router.post("/resendOtp",resendOtp)

export default router;