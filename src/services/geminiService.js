/*import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY manquante. Ajoute-la dans .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function askGemini({ prompt }) {
  // Utilisation d'un identifiant de modèle valide et stable
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return response.text();
}
  */


const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function askGemini({ prompt }) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "SmartLibrary BiblioIA",
    },
    body: JSON.stringify({
      // Provide an array of strictly valid free models for automatic fallback
      models: [
        "google/gemma-3-4b-it:free",
        "meta-llama/llama-3.2-3b-instruct:free"
      ],
      messages: [
        { role: "user", content: prompt }
      ],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}