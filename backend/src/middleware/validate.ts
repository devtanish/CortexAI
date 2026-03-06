import { type NextFunction, type Request, type Response } from "express";
import { ZodObject } from "zod";
export const validate = (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: "Validation failed", details: result.error.flatten().fieldErrors });
    }
    req.body = result.data;
    next();
};