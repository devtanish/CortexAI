import { Router } from "express";
import type { IRouter } from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { validate } from "../middleware/validate.js";
import { sendMessageSchema } from "../validators/message.schema.js";

const router: IRouter = Router();

router.post("/", validate(sendMessageSchema), sendMessage);

export default router;