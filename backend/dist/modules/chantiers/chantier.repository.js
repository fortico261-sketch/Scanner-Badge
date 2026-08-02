"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChantiersRepository = void 0;
const prisma_service_1 = require("../../database/prisma.service");
class ChantiersRepository {
    async findAll() {
        return prisma_service_1.prisma.chantier.findMany();
    }
    async findById(id) {
        return prisma_service_1.prisma.chantier.findUnique({
            where: { id }
        });
    }
    async create(data) {
        return prisma_service_1.prisma.chantier.create({
            data
        });
    }
    async update(id, data) {
        return prisma_service_1.prisma.chantier.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        return prisma_service_1.prisma.chantier.delete({
            where: { id }
        });
    }
}
exports.ChantiersRepository = ChantiersRepository;
//# sourceMappingURL=chantier.repository.js.map