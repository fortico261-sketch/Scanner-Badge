"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_repository_1 = require("./auth.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor() {
        this.repository = new auth_repository_1.AuthRepository();
    }
    async register(data) {
        const existingUser = await this.repository.findUserByEmail(data.email);
        if (existingUser) {
            throw new Error('utilisateur existe deja');
        }
        const hashPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await this.repository.createUser({
            nom: data.nom,
            email: data.email,
            password: hashPassword
        });
        return {
            id: user.id,
            nom: user.nom,
            email: user.email
        };
    }
    async login(data) {
        const user = await this.repository.findUserByEmail(data.email);
        if (!user) {
            throw new Error("utilisateur introuvable");
        }
        const passwordValid = await bcrypt_1.default.compare(data.password, user.password);
        if (!passwordValid) {
            throw new Error("mot de passe incorrect");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { token };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map