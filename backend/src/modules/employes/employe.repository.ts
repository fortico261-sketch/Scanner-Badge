import { prisma } from "../../database/prisma.service";

export class EmployeRepository {

    async findAll() {
        return prisma.employe.findMany();
    }

    async findById(id: string) {
        return prisma.employe.findUnique({
            where: { id }
        })
    }
    
    async findBadgeId(uid: string) {
    return prisma.employe.findFirst({
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

    async create(data: any) {
        return prisma.employe.create({
            data
        });
    }

    async update(id: string, data: any) {
        return prisma.employe.update({
            where: { id },
            data
        });

    }

    async delete(id : string) {
        return prisma.employe.delete({
            where: { id }
        })
    }
}