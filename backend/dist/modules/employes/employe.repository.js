"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeRepository = void 0;
const prisma_service_1 = require("../../database/prisma.service");
class EmployeRepository {
    async findAll() {
        return prisma_service_1.prisma.employe.findMany();
    }
    async findById(id) {
        return prisma_service_1.prisma.employe.findUnique({
            where: { id }
        });
    }
    async findBadgeId(uid) {
        return prisma_service_1.prisma.employe.findFirst({
            where: {
                badge: {
                    uid
                }
            },
            include: {
                badge: true
            }
        });
    }
    async create(data) {
        return prisma_service_1.prisma.employe.create({
            data
        });
    }
    async update(id, data) {
        return prisma_service_1.prisma.employe.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        return prisma_service_1.prisma.employe.delete({
            where: { id }
        });
    }
}
exports.EmployeRepository = EmployeRepository;
//# sourceMappingURL=employe.repository.js.map