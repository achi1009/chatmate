import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header removed as requested */}
      </div>
      {/* Floating Chat Widget */}
      <ChatWidget />
    </main>
  );
}
