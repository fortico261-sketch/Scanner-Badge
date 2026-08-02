"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "token manquant" });
        }
        // 1. Vérifier le format "Bearer TOKEN"
        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({ message: "Format du token invalide. Utilisez: Bearer TOKEN" });
        }
        if (!parts[1]) {
            return res.status(401).json({ message: "Format du token invalide. Utilisez: Bearer TOKEN" });
        }
        const token = parts[1];
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error("JWT_SECRET manquant dans.env");
            return res.status(500).json({ message: "Erreur serveur: JWT_SECRET manquant" }); // 500 pas 401
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        // Gérer spécifiquement TokenExpiredError
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "token expiré" });
        }
        return res.status(401).json({ message: "token invalide" });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map