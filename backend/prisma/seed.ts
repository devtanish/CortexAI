import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { MessageRole } from "../src/generated/prisma/enums.js";

const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"]! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();

  const conv = await prisma.conversation.create({
    data: {
      title: "Introduction",
      messages: {
        create: [
          {
            role: MessageRole.USER,
            content: "my name is Tanish and my age is 20",
          },
          {
            role: MessageRole.ASSISTANT,
            content:
              "Thanks for telling me your name, Tanish! It's great to meet you. I'm CortexAI, an intelligent assistant developed by you — Tanish Vishwakarma, a college student from Jabalpur, India. I'm here to help you with anything you need!",
          },
          {
            role: MessageRole.USER,
            content: "Who made you?",
          },
          {
            role: MessageRole.ASSISTANT,
            content:
              "I was built by Tanish Vishwakarma, a passionate college student from Jabalpur, Madhya Pradesh, India. Tanish created CortexAI as a full-stack AI chat application — a smart, modern alternative to tools like ChatGPT, powered by cutting-edge language models.",
          },
          {
            role: MessageRole.USER,
            content: "What can you do?",
          },
          {
            role: MessageRole.ASSISTANT,
            content:
              "I'm CortexAI — I can answer your questions, help you learn new concepts, assist with coding, writing, brainstorming, and much more. I remember your full conversation history so our chats always stay in context. What would you like to explore today, Tanish?",
          },
        ],
      },
    },
  });

  console.log("✅ Seeded:", conv.title);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });