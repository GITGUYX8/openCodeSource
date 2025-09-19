"use client";
import { useEffect, useState } from "react";
export default function GitHubProject({ params }) {
  const { owner, repo } = params;
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getRepoData(owner, repo);
      setProject(data);
    }
    fetchData();
  }, [owner, repo]);

  if (!project) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">{project.title}</h2>
      <p className="mb-2">{project.description}</p>
      <p><strong>Author:</strong> {project.author}</p>
      <p><strong>Stars:</strong> ⭐ {project.stars}</p>
      <p><strong>Forks:</strong> {project.forks}</p>
      <p><strong>Open Issues:</strong> {project.open_issues}</p>
      <a href={project.github_url} target="_blank" className="text-blue-600">
        View on GitHub
      </a>
    </div>
  );
}
export async function getRepoData(owner, repo) {
    try {
      // 1. Repo metadata
      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      if (!repoRes.ok) throw new Error("Failed to fetch repo metadata");
      const repoData = await repoRes.json();
  
      // 2. Contributors
      const contributorsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`
      );
      const contributors = contributorsRes.ok
        ? await contributorsRes.json()
        : [];
      const contributorsCount = Array.isArray(contributors)
        ? contributors.length
        : 0;
  
      // 3. Pull Requests
      const prsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&per_page=100`
      );
      const prs = prsRes.ok ? await prsRes.json() : [];
      const prCount = Array.isArray(prs) ? prs.length : 0;
  
      // Return merged object
      return {
        entry: Date.now().toString(),
        image: repoData.owner.avatar_url,
        title: repoData.name,
        description: repoData.description,
        author: repoData.owner.login,
        stars: repoData.stargazers_count,
        forks: repoData.forks,
        open_issues: repoData.open_issues,
        contributors: contributorsCount,
        prs: prCount,
        githubUrl: repoData.html_url,
        posted: repoData.created_at,
        skills: ["Auto-fetched from GitHub"], // placeholder
      };
    } catch (error) {
      console.error("Error fetching repo:", error);
      return null;
    }
  }
  