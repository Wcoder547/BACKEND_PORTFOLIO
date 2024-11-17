import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!!"],
  },
  description: {
    type: String,
    required: [true, "description is required!!"],
  },
  timeline: {
    from: {
      type: String,
      required: [true, "TimeLine starting date is required!!"],
    },
    to: String,
  },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);
