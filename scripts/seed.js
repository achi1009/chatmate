require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const { Schema } = mongoose;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/helpdesk";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Define schemas with text indexes
const CourseModuleSchema = new Schema({
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

const CourseSchema = new Schema(
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

const PolicySchema = new Schema(
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

// Create models
const Course = mongoose.model("Course", CourseSchema);
const Policy = mongoose.model("Policy", PolicySchema);

const sampleCourses = [
  {
    title: "Onboarding Essentials",
    description: "Learn everything you need to know as a new employee",
    modules: [
      {
        title: "Company Overview",
        content: "Learn about our company history, mission, and values",
        order: 1,
      },
      {
        title: "HR Policies",
        content: "Understanding key HR policies and procedures",
        order: 2,
      },
      {
        title: "IT Systems",
        content: "Getting started with our IT systems and tools",
        order: 3,
      },
    ],
  },
  {
    title: "Project Management Basics",
    description: "Master the fundamentals of project management",
    modules: [
      {
        title: "Project Planning",
        content: "Learn how to plan and scope projects effectively",
        order: 1,
      },
      {
        title: "Team Management",
        content: "Best practices for managing project teams",
        order: 2,
      },
    ],
  },
];

const samplePolicies = [
  {
    title: "Remote Work Policy",
    category: "HR",
    content:
      "Guidelines for working remotely, including communication expectations and work hours.",
  },
  {
    title: "Security Guidelines",
    category: "IT",
    content:
      "Important security practices including password policies and data protection.",
  },
  {
    title: "Expense Policy",
    category: "Finance",
    content:
      "Rules and procedures for submitting and getting approval for expenses.",
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Course.deleteMany({});
    await Policy.deleteMany({});

    // Insert sample data
    await Course.insertMany(sampleCourses);
    await Policy.insertMany(samplePolicies);

    // Ensure indexes are created
    await Course.createIndexes();
    await Policy.createIndexes();

    console.log("Sample data seeded successfully and indexes created");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seed();
