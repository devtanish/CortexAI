import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import conversationRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/message.routes.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on port ${process.env.PORT || 5000}`);
});