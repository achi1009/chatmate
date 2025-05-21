import mongoose from "mongoose";

const PolicySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create text indexes for search
PolicySchema.index(
  {
    title: "text",
    category: "text",
    content: "text",
  },
  {
    weights: {
      title: 10,
      category: 5,
      content: 1,
    },
    name: "policy_text_index",
  }
);

export default mongoose.models.Policy || mongoose.model("Policy", PolicySchema);
