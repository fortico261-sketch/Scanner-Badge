"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChantiersService = void 0;
const chantier_repository_1 = require("./chantier.repository");
class ChantiersService {
    constructor() {
        this.repository = new chantier_repository_1.ChantiersRepository();
    }
    async getAll() {
        return this.repository.findAll();
    }
    async getById(id) {
        return this.repository.findById(id);
    }
    async create(data) {
        return this.repository.create(data);
    }
    async update(id, data) {
        return this.repository.update(id, data);
    }
    async delete(id) {
        return this.repository.delete(id);
    }
}
exports.ChantiersService = ChantiersService;
//# sourceMappingURL=chantier.service.js.map