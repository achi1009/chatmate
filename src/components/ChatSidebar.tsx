"use client";
import { useState } from "react";
import Chat from "@/components/Chat";
import {
  UserCircleIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { Message } from "@/types";

const suggestions = [
  {
    icon: <SparklesIcon className="w-5 h-5 text-blue-500" />,
    label: "What can I do?",
    prompt: "What can you do?",
  },
  {
    icon: <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-500" />,
    label: "Show company policies",
    prompt: "Show me company policies",
  },
  {
    icon: <UserCircleIcon className="w-5 h-5 text-purple-500" />,
    label: "Start a micro-course",
    prompt: "Show me available micro-courses",
  },
];

export default function ChatSidebar() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle suggestion click
  const handleSuggestion = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <aside className="w-[380px] max-w-full h-screen bg-white border-l shadow-lg flex flex-col">
      {/* Greeting */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 rounded-full p-2">
            <UserCircleIcon className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-900">
              Hello, User
            </div>
            <div className="text-sm text-gray-500">
              How can I help you today?
            </div>
          </div>
        </div>
      </div>
      {/* Suggestions */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-col space-y-2">
          {suggestions.map((s, i) => (
            <button
              key={i}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white hover:bg-blue-50 border border-gray-200 text-left transition"
              onClick={() => handleSuggestion(s.prompt)}
            >
              {s.icon}
              <span className="text-sm font-medium text-gray-700">
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <Chat
          sidebarInput={input}
          setSidebarInput={setInput}
          sidebarMessages={messages}
          setSidebarMessages={setMessages}
          sidebarIsLoading={isLoading}
          setSidebarIsLoading={setIsLoading}
        />
      </div>
    </aside>
  );
}
