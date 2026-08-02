"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeService = void 0;
const employe_repository_1 = require("./employe.repository");
const chantier_service_1 = require("../chantiers/chantier.service");
class EmployeService {
    constructor() {
        this.repository = new employe_repository_1.EmployeRepository();
        this.chantierService = new chantier_service_1.ChantiersService();
    }
    async getAll() {
        return this.repository.findAll();
    }
    async getByid(id) {
        return this.repository.findById(id);
    }
    async getBadgeId(uid) {
        return this.repository.findBadgeId(uid);
    }
    async create(data) {
        const chantier = await this.chantierService.getById(data.chantierId);
        if (!chantier) {
            throw new Error('chantier introuvable');
        }
        return this.repository.create(data);
    }
    async update(id, data) {
        if (data.chantierId) {
            const chantier = await this.chantierService.getById(data.chantierId);
            if (!chantier) {
                throw new Error('chantier introuvable');
            }
        }
        return this.repository.update(id, data);
    }
    async delete(id) {
        return this.repository.delete(id);
    }
}
exports.EmployeService = EmployeService;
//# sourceMappingURL=employe.service.js.map