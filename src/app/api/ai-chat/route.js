import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { repoUrl, query } = await req.json();

    if (!repoUrl || !query) {
      return NextResponse.json({ error: "Missing repoUrl or query" }, { status: 400 });
    }

    // Create a Gemini model instance
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an AI assistant helping contributors understand a GitHub repository.
Repository: ${repoUrl}

Answer the following user query clearly and concisely:
${query}
    `;

    const result = await model.generateContent(prompt);

    return NextResponse.json({ reply: result.response.text() });
  } catch (err) {
    console.error("AI Chat Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
    