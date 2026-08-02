"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeRepository = void 0;
const prisma_service_1 = require("../../database/prisma.service");
class BadgeRepository {
    async create(uid, employeId) {
        return prisma_service_1.prisma.badge.create({ data: {
                uid,
                employeId
            } });
    }
    async findByUiId(uid) {
        return prisma_service_1.prisma.badge.findUnique({
            where: { uid },
            include: {
                employe: true
            }
        });
    }
    async finddByEmployeId(employeId) {
        return prisma_service_1.prisma.badge.findUnique({
            where: {
                employeId
            }
        });
    }
    async exists(uid) {
        return prisma_service_1.prisma.badge.findUnique({
            where: {
                uid
            }
        });
    }
}
exports.BadgeRepository = BadgeRepository;
//# sourceMappingURL=badge.repository.js.map