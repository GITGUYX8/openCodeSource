import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const repoUrl = searchParams.get("repoUrl");

    if (!repoUrl) {
      return NextResponse.json({ error: "Missing repoUrl" }, { status: 400 });
    }

    // Extract owner/repo from URL
    const parts = repoUrl.split("/");
    const owner = parts[parts.length - 2];
    const repo = parts[parts.length - 1];
    console.log(owner, repo)
    // Fetch README.md from GitHub API
    const readmeRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/README.md?ref=main`,
      { headers: { Accept: "application/vnd.github.v3.raw" } }
    );

    if (!readmeRes.ok) {
      return NextResponse.json(
        { error: "Could not fetch README.md" },
        { status: 500 }
      );
    }

    const readme = await readmeRes.text();

    // Use Gemini to generate summary
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
You are an expert project manager and developer advocate. Your goal is to create a summary of a GitHub project's README file that is both informative for potential users and encouraging for new contributors.

Based on the following README content, please generate a summary in Markdown format.

The summary should include:
1.  **Project Overview**: A brief, one-sentence description of what the project does.
2.  **Tech Stack**: A list of the key technologies and languages used, if mentioned.
3.  **Getting Started**: A very short, high-level guide on how to set up the project locally.
4.  **How to Contribute**: A welcoming message encouraging contributions and pointing out how someone can start (e.g., "Look for 'good first issue' labels").

Here is the README content:
---
${readme}
---
`;
    const result = await model.generateContent(prompt);
    return NextResponse.json({ summary: result.response.text() });
  } catch (err) {
    console.error("AI Summary Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
