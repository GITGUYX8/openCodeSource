"use client";
import { getRepoData } from "@/github/github";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { dataByQuery } from "@/firestore/page";

export default function ProjectDescriptionPage({params}) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [summary, setSummary] = useState("Loading AI summary...");
  const [chatHistory, setChatHistory] = useState([]);
  const [githubUrl, setGithubUrl] = useState(""); // Add this line
useEffect(() => {
    async function fetchGithubUrl() {
      const dataQ = await dataByQuery("title", title);
      setGithubUrl(dataQ[0]?.githubUrl || "");
    }
    if (title) fetchGithubUrl();
  }, [title]);

  useEffect(() => {
    async function fetchSummary() {
      

      const encodedUrl =  encodeURIComponent(githubUrl)
      const res = await fetch(
        `/api/generateDesc?repoUrl=${encodedUrl}`
      );
      const data = await res.json();
      setSummary(data.summary);
    }
    if (githubUrl) fetchSummary();
  }, [githubUrl]);

  const handleChat = async (query) => {
    const res = await fetch("/api/ai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoUrl: githubUrl, query }),
    });
    const data = await res.json();
    setChatHistory([
      ...chatHistory,
      { role: "user", content: query },
      { role: "ai", content: data.reply },
    ]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{title || "Project Details"}</h1>
      <p className="text-zinc-700 dark:text-zinc-300 mb-6">{summary}</p>

      {/* Chat Section */}
      <div className="border rounded-xl p-4 bg-white dark:bg-zinc-900">
        <h2 className="text-lg font-semibold mb-3">Ask AI about this project</h2>
        <div className="h-64 overflow-y-auto mb-3 space-y-2">
          {chatHistory.map((msg, idx) => (
            <p
              key={idx}
              className={msg.role === "user" ? "text-blue-600" : "text-green-600"}
            >
              <strong>{msg.role === "user" ? "You" : "AI"}:</strong>{" "}
              {msg.content}
            </p>
          ))}
        </div>
        <ChatInput onSend={handleChat} />
      </div>
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
        className="flex-1 border rounded-lg px-3 py-2 dark:bg-zinc-800 dark:text-zinc-200"
        placeholder="Ask something about this repo..."
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </form>
  );
}
