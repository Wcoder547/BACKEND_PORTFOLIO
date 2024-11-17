import express from "express";
import {
  addNewProject,
  deleteProject,
  updateProject,
  getSingleProject,
  getAllProject,
} from "../controllers/projectController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.get("/get/:id", isAuthenticated, getSingleProject);
router.get("/getall", isAuthenticated, getAllProject);

export default router;
