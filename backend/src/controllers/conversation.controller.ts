import { type Request, type Response } from "express";
import prisma from "../lib/prisma.js";

export const getAll = async (_req: Request, res: Response) => {
  const convos = await prisma.conversation.findMany({ orderBy: { updatedAt: "desc" } });
  res.json(convos);
};

export const getOne = async (req: Request, res: Response) => {
  const id = String(req.params["id"]);
  const convo = await prisma.conversation.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
  if (!convo) return res.status(404).json({ error: "Not found" });
  res.json(convo);
};

export const create = async (req: Request, res: Response) => {
  const title = typeof req.body.title === "string" ? req.body.title : "New Conversation";
  const convo = await prisma.conversation.create({
    data: { title },
    include: { messages: true },
  });
  res.status(201).json(convo);
};

export const remove = async (req: Request, res: Response) => {
  const id = String(req.params["id"]);
  await prisma.conversation.delete({ where: { id } });
  res.status(204).send();
};