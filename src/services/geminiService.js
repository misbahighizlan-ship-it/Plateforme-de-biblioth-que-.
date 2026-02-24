import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY manquante. Ajoute-la dans .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function askGemini({ prompt }) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}