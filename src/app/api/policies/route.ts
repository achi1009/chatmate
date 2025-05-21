import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Policy from "@/models/Policy";

export async function GET() {
  try {
    await connectDB();
    const policies = await Policy.find({}).sort({ createdAt: -1 });
    return NextResponse.json(policies);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch policies" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const policy = await Policy.create(body);
    return NextResponse.json(policy, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create policy" },
      { status: 500 }
    );
  }
}
