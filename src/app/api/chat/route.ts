import { NextResponse } from "next/server";
import OpenAI from "openai";
import connectDB from "@/lib/mongodb";
import Policy from "@/models/Policy";
import Course from "@/models/Course";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getContextualKnowledge(message: string) {
  await connectDB();

  // Get relevant policies and courses based on the message
  const policies = await Policy.find({
    $text: { $search: message },
  }).limit(3);

  const courses = await Course.find({
    $text: { $search: message },
  }).limit(3);

  let context = "";

  if (policies.length > 0) {
    context += "\nRelevant Policies:\n";
    policies.forEach((policy) => {
      context += `${policy.title}: ${policy.content}\n`;
    });
  }

  if (courses.length > 0) {
    context += "\nRelevant Courses:\n";
    courses.forEach((course) => {
      context += `${course.title}: ${course.description}\n`;
    });
  }

  return context;
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const context = await getContextualKnowledge(message);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant for our company's helpdesk. 
          You have knowledge about company policies, processes, and micro-courses.
          Use the following contextual information to provide accurate responses:
          ${context}
          You should be professional, friendly, and provide accurate information.
          If you're not sure about something, please say so rather than making assumptions.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
