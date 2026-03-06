import "dotenv/config";
import OpenAI from "openai";
import type { MessageRole } from "../generated/prisma/enums.js";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "CortexAI",
  },
});

export async function getChatResponse(
  messages: { role: MessageRole; content: string }[]
) {
  const response = await openai.chat.completions.create({
    model: process.env["OPENAI_MODEL"] || "arcee-ai/trinity-large-preview:free",
    messages: [
      { 
        role: "system", 
        content: "You are CortexAI, an intelligent AI assistant developed by Tanish Vishwakarma, a college student from Jabalpur, Madhya Pradesh, India. You are helpful, friendly, and always maintain context of the conversation. When asked about yourself or your creator, mention Tanish and CortexAI proudly." 
      },
      ...messages.map((m) => ({
        role: m.role.toLowerCase() as "user" | "assistant", // 👈 lowercase for OpenAI
        content: m.content,
      })),
    ],
  });

  return response.choices[0]?.message.content;
}