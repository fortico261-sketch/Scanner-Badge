import { prisma } from "../../database/prisma.service";

export class EmployeRepository {

    async findAll() {
        return prisma.employe.findMany();
    }

    async findById(id: String) {
        return prisma.employe.findUnique({
            where: { id }
        })
    }
    
    async findBadgeId(badgeId: String) {
        return prisma.employe.findUnique({
            where: { badgeId }
        })
    }

    async create(data: any) {
        return prisma.employe.create({
            data
        });
    }

    async update(id: String, data: any) {
        return prisma.employe.update({
            where: { id },
            data
        });

    }

    async delete(id : String) {
        return prisma.employe.delete({
            where: { id }
        })
    }
}