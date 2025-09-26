// app/api/generateSummary/route.js

export async function POST(req) {
  const { description } = await req.json();

  if (!description) {
    return new Response(JSON.stringify({ summary: "" }), { status: 200 });
  }

  const apiKey = process.env.GOOGLE_API_KEY; // Store your API key securely
  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: {
        text: description,
      },
    }),
  });

  const data = await response.json();
  const summary = data?.choices?.[0]?.message?.content || "Summary not available";

  return new Response(JSON.stringify({ summary }), { status: 200 });
}
