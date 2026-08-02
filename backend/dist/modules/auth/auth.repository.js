"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const prisma_service_1 = require("../../database/prisma.service");
class AuthRepository {
    async findUserByEmail(email) {
        return prisma_service_1.prisma.user.findUnique({
            where: { email }
        });
    }
    async createUser(data) {
        return prisma_service_1.prisma.user.create({
            data
        });
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map