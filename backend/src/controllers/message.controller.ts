import { type Request, type Response } from "express";
import prisma from "../lib/prisma.js";
import { getChatResponse } from "../services/openai.service.js";
import { MessageRole } from "../generated/prisma/enums.js";

export const sendMessage = async (req: Request, res: Response) => {
  const { conversationId, content } = req.body;

  const userMsg = await prisma.message.create({
    data: { role: MessageRole.USER, content, conversationId },
  });

  const history = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });

  const aiText = await getChatResponse(history);

  const assistantMsg = await prisma.message.create({
    data: { role: MessageRole.ASSISTANT, content: aiText || "", conversationId },
  });

  res.status(201).json({ userMessage: userMsg, assistantMessage: assistantMsg });
};