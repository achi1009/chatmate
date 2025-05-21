import mongoose from "mongoose";

const CourseModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    modules: [CourseModuleSchema],
  },
  {
    timestamps: true,
  }
);

// Create text indexes for search
CourseSchema.index(
  {
    title: "text",
    description: "text",
    "modules.title": "text",
    "modules.content": "text",
  },
  {
    weights: {
      title: 10,
      description: 5,
      "modules.title": 3,
      "modules.content": 1,
    },
    name: "course_text_index",
  }
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
