import express from "express";
import {
  addSkill,
  deleteSkill,
  updateSkill,
  getAllSkill,
} from "../controllers/skillController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addSkill);
router.delete("/delete/:id", isAuthenticated, deleteSkill);
router.put("/update/:id", isAuthenticated, updateSkill);
router.get("/getall", isAuthenticated, getAllSkill);

export default router;
