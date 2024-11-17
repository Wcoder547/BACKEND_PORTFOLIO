import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Timeline } from "../models/timelineModel.js";

export const addTimeline = catchAsyncError(async (req, res, next) => {
  const { title, description, from, to } = req.body;
  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });
  return res.status(200).json({
    success: true,
    message: "Timeline added",
    newTimeline,
  });
});

export const deleteTimeline = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const timeLine = await Timeline.findById(id);
  if (!timeLine) {
    return next(new ErrorHandler("Timeline not founded!!"));
  }
  return res.status(200).json({
    success: true,
    message: "Timeline deleted!!",
  });
});

export const getAllTimeline = catchAsyncError(async (req, res, next) => {
  const timeline = await Timeline.find();
  return res.status(200).json({
    success: true,
    timeline,
  });
});
