"use client";

import { useState } from "react";
import { addProject } from "@/lib/projects";
import { getRepoData } from "@/github/github";

export default function AddProjectForm() {
  const [form, setForm] = useState({
    githubUrl: "",
    college: "",
    year: "",
    bounty: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Extract owner/repo from GitHub URL
      const regex = /github\.com\/([^/]+)\/([^/]+)/;
      const match = form.githubUrl.match(regex);

      if (!match) {
        alert("Invalid GitHub URL");
        setLoading(false);
        return;
      }

      const [_, owner, repo] = match;

      // Fetch GitHub repo data
      const repoData = await getRepoData(owner, repo);

      if (!repoData) {
        alert("Failed to fetch repo data");
        setLoading(false);
        return;
      }

      // Merge with extra fields
      const projectData = {
        ...repoData,
        college: form.college,
        year: form.year,
        bounty: form.bounty,
      };

      await addProject(projectData);

      alert("Project added successfully ✅");
      setForm({ githubUrl: "", college: "", year: "", bounty: "" });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-black rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Add Project from GitHub</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">GitHub Repo URL</label>
          <input
            type="text"
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            placeholder="https://github.com/owner/repo"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">College</label>
          <input
            type="text"
            name="college"
            value={form.college}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            type="text"
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bounty</label>
          <input
            type="text"
            name="bounty"
            value={form.bounty}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            placeholder="₹1000"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
