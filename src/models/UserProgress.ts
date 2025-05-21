import mongoose from "mongoose";

const UserProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  completedModules: [
    {
      type: String,
      required: true,
    },
  ],
  startDate: {
    type: Date,
    default: Date.now,
  },
  lastAccessed: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.UserProgress ||
  mongoose.model("UserProgress", UserProgressSchema);
