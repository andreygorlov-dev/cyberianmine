import { Request, Response } from "express";

export function successAuth(req: Request, res: Response): Response {
    return res.json({ message: "Ты авторизован по jwt токену" });
}