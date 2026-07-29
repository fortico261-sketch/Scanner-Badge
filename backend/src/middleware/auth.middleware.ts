import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "token manquant" });
        }

        const [, token] = authHeader.split(" ");
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET manquant");
        }

        const decoded = jwt.verify(token, secret);

        (req as any).user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: "token invalide", error });
    }
};
