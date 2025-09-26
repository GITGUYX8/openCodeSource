"use client";
import { useState, useEffect } from "react";

// Simple community chat
function CommunityChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, time: new Date() }]);
    setInput("");
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-md">
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none"
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
  const { projectId } = params; // use project ID from URL
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        // Fetch project from Firestore API
        const res = await fetch(`/api/projects/${projectId}`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const data = await res.json();
        setProjectData(data);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [projectId]);

  if (loading) return <p className="text-center mt-12">Loading project...</p>;
  if (!projectData) return <p className="text-center mt-12">Project not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Project Info */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{projectData.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          {projectData.description || "No description available."}
        </p>
        {projectData.githubUrl && (
          <a
            href={projectData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View on GitHub
          </a>
        )}
      </div>

      {/* Community Chat */}
      <CommunityChat />
    </div>
  );
}
