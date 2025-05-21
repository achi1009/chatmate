"use client";

import { useState, useEffect } from "react";
import { Course } from "@/types";

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError("Failed to load courses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading courses...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="space-y-2">
            {course.modules.map((module) => (
              <div
                key={module.id}
                className="flex items-center space-x-2 text-sm text-gray-500"
              >
                <span className="w-4 h-4 rounded-full border flex items-center justify-center">
                  {module.completed ? "✓" : ""}
                </span>
                <span>{module.title}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Start Course
          </button>
        </div>
      ))}
    </div>
  );
}
