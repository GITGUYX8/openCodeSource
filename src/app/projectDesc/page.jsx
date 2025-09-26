"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { dataByQuery } from "@/firestore/page";
import { Star, Users, GitPullRequest, Github, ExternalLink, Calendar, Code, Award, School } from "lucide-react";
import Link from "next/link";
import CommunityChat from "@/components/CommunityChat";
import EscrowFormBtn from "@/components/bountyBtn";

export default function ProjectDescriptionPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [projectData, setProjectData] = useState(null);
  const [summary, setSummary] = useState("Loading AI summary...");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjectData() {
      if (!title) {
        setLoading(false);
        return;
      };
      setLoading(true);
      const dataQ = await dataByQuery("title", title);

      if (dataQ && dataQ.length > 0) {
        setProjectData(dataQ[0]);
      }
      setLoading(false);
    }
    fetchProjectData();
  }, [title]);

  useEffect(() => {
    async function fetchSummary() {
      if (!projectData?.githubUrl) return;
      const encodedUrl = encodeURIComponent(projectData.githubUrl);
      const res = await fetch(
        `/api/generateDesc?repoUrl=${encodedUrl}`
      );
      const data = await res.json();
      setSummary(data.summary);
    }
    fetchSummary();
  }, [projectData]);

  const handleChat = async (query) => {
    if (!projectData?.githubUrl) return;
    const res = await fetch("/api/ai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoUrl: projectData.githubUrl, query }),
    });
    const data = await res.json();
    setChatHistory([
      ...chatHistory,
      { role: "user", content: query },
      { role: "ai", content: data.reply },
    ]);
  };

  if (loading) {
    return <div className="text-center p-10">Loading project details...</div>;
  }

  if (!projectData) {
    return <div className="text-center p-10">Project not found.</div>;
  }

  const { image, description, author, college, year, skills, bounty, stars, contributors, prs, posted, githubUrl } = projectData;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <img src={image} alt={title} className="w-full h-64 object-cover rounded-lg mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
            <p className="text-zinc-400 mb-6">{description}</p>

            <h2 className="text-xl font-semibold mb-3 border-t border-zinc-800 pt-4">AI-Generated Summary</h2>
            <p className="text-zinc-300 prose prose-invert max-w-none">{summary}</p>
          </div>

          {/* AI Chat */}
          <div className="border rounded-xl p-4 bg-zinc-900 border-zinc-800">
            <h2 className="text-lg font-semibold mb-3">Ask AI about this project</h2>
            <div className="h-64 overflow-y-auto mb-3 space-y-2 p-2 bg-zinc-950 rounded-lg">
              {chatHistory.map((msg, idx) => (
                <p key={idx} className={msg.role === "user" ? "text-blue-400" : "text-green-400"}>
                  <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
                </p>
              ))}
            </div>
            <ChatInput onSend={handleChat} />
          </div>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Project Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><Award className="w-5 h-5 text-zinc-400" /> <span className="font-bold text-green-400 text-base">{bounty}</span></div>
              <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-zinc-400" /> <span>Posted {posted}</span></div>
              <div className="flex items-center gap-3"><Star className="w-5 h-5 text-zinc-400" /> <span>{stars} stars</span></div>
              <div className="flex items-center gap-3"><Users className="w-5 h-5 text-zinc-400" /> <span>{contributors} contributors</span></div>
              <div className="flex items-center gap-3"><GitPullRequest className="w-5 h-5 text-zinc-400" /> <span>{prs} open PRs</span></div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
                <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                    <Github size={18} /> View on GitHub
                </Link>
                <EscrowFormBtn
                  // Parse the numeric value from the bounty string (e.g., "₹5000" -> 5000)
                  inrBounty={bounty ? Number(bounty.replace(/[^0-9.]/g, "")) : 0}
                  projectTitle={title}
                />
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Maintainer</h3>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-zinc-700 flex items-center justify-center text-lg font-bold text-zinc-300">{author.charAt(0)}</div>
              <div className="ml-3">
                <p className="font-medium text-zinc-200">{author}</p>
                <p className="text-xs text-zinc-400 flex items-center gap-1"><School size={12}/> {college} • {year}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Code size={20}/> Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="bg-zinc-800 text-zinc-300 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CommunityChat projectId={projectData.id} />
    </div>
  );
}

function ChatInput({ onSend }) {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value);
      setValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 border border-zinc-700 rounded-lg px-3 py-2 bg-zinc-800 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ask something about this repo..."
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Send
      </button>
    </form>
  );
}
