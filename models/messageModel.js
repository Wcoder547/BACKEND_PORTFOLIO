import mongoose from "mongoose";

const messgaeSchema = new mongoose.Schema({
  senderName: {
    type: String,
    minLength: [2, "senderName must contain atleast two chracters!"],
  },
  subject: {
    type: String,
    minLength: [2, "subject must contain atleast two chracters!"],
  },
  message: {
    type: String,
    minLength: [2, "message must contain atleast two chracters!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Message = mongoose.model("Message", messgaeSchema);
