"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "@/types";
import ReactMarkdown from "react-markdown";

interface ChatProps {
  sidebarInput?: string;
  setSidebarInput?: React.Dispatch<React.SetStateAction<string>>;
  sidebarMessages?: Message[];
  setSidebarMessages?: React.Dispatch<React.SetStateAction<Message[]>>;
  sidebarIsLoading?: boolean;
  setSidebarIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Chat({
  sidebarInput,
  setSidebarInput,
  sidebarMessages,
  setSidebarMessages,
  sidebarIsLoading,
  setSidebarIsLoading,
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use sidebar state if provided
  const chatMessages =
    sidebarMessages !== undefined ? sidebarMessages : messages;
  const setChatMessages =
    setSidebarMessages !== undefined ? setSidebarMessages : setMessages;
  const chatInput = sidebarInput !== undefined ? sidebarInput : input;
  const setChatInput =
    setSidebarInput !== undefined ? setSidebarInput : setInput;
  const chatIsLoading =
    sidebarIsLoading !== undefined ? sidebarIsLoading : isLoading;
  const setChatIsLoading =
    setSidebarIsLoading !== undefined ? setSidebarIsLoading : setIsLoading;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
      timestamp: new Date(),
    };

    // Use functional update to ensure we have the latest messages
    setChatMessages((prevMessages) => [...prevMessages, userMessage]);
    setChatInput("");
    setChatIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };

      // Use functional update to ensure we have the latest messages including the user message
      setChatMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setChatIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <ReactMarkdown className="prose">{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {chatIsLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="animate-pulse">Thinking...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex space-x-4">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Enter a prompt here..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={chatIsLoading}
          />
          <button
            type="submit"
            disabled={chatIsLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
