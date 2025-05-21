import mongoose from "mongoose";
import Course from "../src/models/Course";
import Policy from "../src/models/Policy";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/helpdesk";

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

    console.log("Sample data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seed();
