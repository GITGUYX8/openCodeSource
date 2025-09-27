"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGithub, FaPaperPlane } from "react-icons/fa";

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
    <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
      <h3 className="text-xl font-bold mb-4">Community Chat</h3>
      <div className="max-h-60 overflow-y-auto mb-4 space-y-2 pr-2">
        {messages.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">No messages yet. Start the discussion!</p>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className="text-sm bg-white/5 p-2 rounded-lg">
            <span className="font-semibold text-blue-400 mr-2">{msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}:</span> 
            <span className="text-gray-200">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-white/20 transition"
        />
        <button
          onClick={sendMessage}
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
          aria-label="Send message"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default function ProjectPage({ params }) {
  const { project } = params;
  const [projectData, setProjectData] = useState(null); // Changed slug to project to match folder name

  useEffect(() => {
    async function fetchProject() {
      try {
        // Fetch project data from your API or Firestore
        const res = await fetch(`/api/viewProjects/${encodeURIComponent(project)}`);
        const data = await res.json();
        console.log(data);
        setProjectData(data);
      } catch (err) {
        console.error(err);
        console.error(err);
      }
    }
    fetchProject();
  }, [project]);

  if (!projectData) {
    return (
      <main className="relative min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-grid-small-white/[0.2] bg-neutral-950 flex items-center justify-center p-4 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Floating decorative blobs */}
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-blue-600/50 rounded-full filter blur-3xl opacity-40 animate-float"></div>
      <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-purple-600/50 rounded-full filter blur-3xl opacity-40 animate-float2"></div>

      <div className="relative z-10 w-full max-w-3xl p-8 bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-500/10 space-y-8">
        {/* Project Info */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">{projectData.title}</h2>
          <p className="text-gray-300 mb-4">{projectData.description}</p>
          <a
            href={projectData.github_url} // Use projectData for the URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            <FaGithub />
            View on GitHub
          </a>
        </div>

        {/* Community Chat */}
        <CommunityChat />
      </div>
    </main>
  );
}
