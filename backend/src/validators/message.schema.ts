import { z } from "zod";
export const sendMessageSchema = z.object({
  conversationId: z.string().min(1),
  content: z.string().min(1).max(4000),
});