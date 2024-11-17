import express from "express";
import {
  addTimeline,
  deleteTimeline,
  getAllTimeline,
} from "../controllers/timeLineController.js";

const router = express.Router();

router.post("/add", addTimeline);
router.delete("/delete/:id", deleteTimeline);
router.get("/getall", getAllTimeline);

export default router;
