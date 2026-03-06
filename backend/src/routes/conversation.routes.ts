import { Router } from "express";
import type { IRouter } from "express";
import { getAll, create, getOne, remove } from "../controllers/conversation.controller.js";

const router: IRouter = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.delete("/:id", remove);

export default router;