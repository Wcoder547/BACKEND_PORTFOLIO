import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageModel.js";
import mongoose from "mongoose";
export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { senderName, subject, message } = req.body;

  if (!senderName || !subject || !message) {
    return next(new ErrorHandler("Please Fill full form!!", 400));
  }
  const data = await Message.create({ senderName, subject, message });

  return res.status(201).json({
    success: true,
    message: "Message Sent",
    data,
  });
});

export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find();
  return res.status(200).json({
    success: true,
    messages,
  });
});
export const deleteMessage = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const trimmedId = id.trim();
  console.log("Received ID:", trimmedId);
  if (!mongoose.Types.ObjectId.isValid(trimmedId)) {
    return next(new ErrorHandler("Invalid ID format!", 400));
  }

  const message = await Message.findById(trimmedId);

  if (!message) {
    return next(new ErrorHandler("Message Already Deleted or Not Found!", 400));
  }
  await message.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Message deleted successfully!",
  });
});
