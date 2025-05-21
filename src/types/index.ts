export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: CourseModule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseModule {
  id: string;
  title: string;
  content: string;
  order: number;
  completed?: boolean;
}

export interface Policy {
  id: string;
  title: string;
  category: string;
  content: string;
  lastUpdated: Date;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedModules: string[];
  startDate: Date;
  lastAccessed: Date;
  completed: boolean;
}
