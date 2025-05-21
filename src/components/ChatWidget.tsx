"use client";
import { useState } from "react";
import ChatSidebar from "@/components/ChatSidebar";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors"
          aria-label="Open chat"
        >
          <span className="text-3xl text-white font-bold">?</span>
        </button>
      )}

      {/* Chat Popup/Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
          {/* Overlay (optional, for click outside to close) */}
          <div
            className="absolute inset-0 bg-black bg-opacity-20 transition-opacity pointer-events-auto"
            onClick={() => setOpen(false)}
          />
          {/* Chat Box */}
          <div
            className="relative m-6 pointer-events-auto"
            style={{ width: 380, maxWidth: "100vw", height: "80vh" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white hover:bg-gray-100 shadow"
              aria-label="Close chat"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
            <div className="w-full h-full bg-transparent rounded-xl shadow-2xl flex flex-col overflow-hidden">
              <ChatSidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
