import express from "express";
import {
  addNewSoftwareApplication,
  deleteSoftwareApplication,
  getAllSoftwareApplication,
} from "../controllers/softwareAppController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewSoftwareApplication);
router.delete("/delete/:id", isAuthenticated, deleteSoftwareApplication);
router.get("/getall", getAllSoftwareApplication);

export default router;
