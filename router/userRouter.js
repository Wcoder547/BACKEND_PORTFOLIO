import express from "express";
import {
  forgetPassword,
  getUser,
  getUserForPortfolio,
  login,
  logout,
  Register,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/Register", Register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.put("/update/me", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);
router.get("/me/portfolio", getUserForPortfolio);
router.get("/password/forgot", forgetPassword);
router.put("/password/reset/:token", resetPassword);
export default router;
