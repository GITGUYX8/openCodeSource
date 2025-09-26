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
    const result = await model.generateContent(
      `Summarize this GitHub README in a concise and contributor-friendly way:
      `
    );
    // \n\n${readme}
    console.log("result: ",result)
    return NextResponse.json({ summary: result.response.text() });
  } catch (err) {
    console.error("AI Summary Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
