"use client";

import { useEffect, useState } from "react";

// Simple community chat
function CommunityChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { text: newMessage, time: new Date() }]);
    setNewMessage("");
  };

  return (
    <div className="mt-6 p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Community Chat</h3>
      <div className="max-h-48 overflow-y-auto mb-2 space-y-1">
        {messages.length === 0 && (
          <p className="text-sm text-gray-500">No messages yet. Start the discussion!</p>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className="text-sm text-gray-800 dark:text-gray-200">
            <span className="font-semibold">{msg.time.toLocaleTimeString()}:</span> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 text-black dark:text-white focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default function ProjectPage({ params }) {
  const { projectName } = params;
  const [project, setProject] = useState(null);
  const [aiSummary, setAiSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      try {
        // Replace this with your firestore fetching logic if needed
        const res = await fetch(`/api/projects/${encodeURIComponent(projectName)}`);
        const data = await res.json();
        setProject(data);

        // Generate AI summary
        setLoadingSummary(true);
        const summaryRes = await fetch("/api/generateDesc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: data.description || "" }),
        });
        const summaryData = await summaryRes.json();
        console.log(summaryData);
        setAiSummary(summaryData.summary);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSummary(false);
      }
    }

    fetchProject();
  }, [projectName]);

  if (!project) return <p className="text-center mt-12">Loading project...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Project Info */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          <strong>Author:</strong> {project.author}
        </p>
        <a
          href={project.githubUrl}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          View on GitHub
        </a>
      </div>

      {/* AI Summary */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">AI-Generated Summary</h3>
        {loadingSummary ? (
          <p className="text-gray-500 dark:text-gray-400">Generating summary...</p>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">{aiSummary}</p>
        )}
      </div>

      {/* Community Chat */}
      <CommunityChat />
    </div>
  );
}
