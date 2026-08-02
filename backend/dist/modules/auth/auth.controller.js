"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
class AuthController {
    constructor() {
        this.service = new auth_service_1.AuthService();
    }
    async register(req, res) {
        try {
            const user = await this.service.register(req.body);
            res.status(200).json(user);
        }
        catch (error) {
            console.log("ERREUR REGISTER:", error);
            res.status(400).json({ message: 'Erreur lors de la registration',
                error: error.message || error });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await this.service.login({ email, password });
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Erreur lors de la connexion', error: error.message });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map