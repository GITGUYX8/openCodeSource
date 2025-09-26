"use client"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { readAllDataFromCollection } from "@/firestore/page";
// This is a React Server Component, so server-side code can run directly.
async function getGeminiResponse() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const result = await model.generateContent("hello, give me a short response");
    return result.response.text();

  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    return "Failed to get a response from AI.";
  }
}

export default async function DumPage() {
  const aiResponse = await getGeminiResponse();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gemini Response:</h1>
      <p className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">{aiResponse}</p>
    </div>
  );
}