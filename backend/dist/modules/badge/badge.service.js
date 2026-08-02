"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeService = void 0;
const badge_repository_1 = require("./badge.repository");
class BadgeService {
    constructor() {
        this.repository = new badge_repository_1.BadgeRepository();
    }
    async asociateBadge(uid, employeId) {
        const existBadge = await this.repository.exists(uid);
        if (existBadge) {
            throw new Error("Badge deja associe");
        }
        const employeBadge = await this.repository.finddByEmployeId(employeId);
        if (employeBadge) {
            throw new Error("Employe possede deja une badge");
        }
        return this.repository.create(uid, employeId);
    }
    async getEmployeByBafge(uid) {
        const badge = await this.repository.findByUiId(uid);
        if (!badge) {
            throw new Error("Badge inconnue");
        }
        return badge.employe;
    }
}
exports.BadgeService = BadgeService;
//# sourceMappingURL=badge.service.js.map