"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeController = void 0;
const badge_service_1 = require("./badge.service");
class BadgeController {
    constructor() {
        this.service = new badge_service_1.BadgeService();
        this.asociate = async (req, res) => {
            try {
                const { uid, employeId } = req.body;
                const bagde = await this.service.asociateBadge(uid, employeId);
                res.status(201).json(bagde);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        };
        this.findEmploye = async (req, res) => {
            try {
                const { uid } = req.params;
                const employe = await this.service.getEmployeByBafge(uid);
                res.status(200).json(employe);
            }
            catch (error) {
                res.status(404).json({ message: error.message });
            }
        };
    }
}
exports.BadgeController = BadgeController;
//# sourceMappingURL=badge.controller.js.map