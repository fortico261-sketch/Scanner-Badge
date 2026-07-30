import { prisma } from "../../database/prisma.service";
import { CreatePointageDto } from "./pointage.dto";

export class PointagesRepository {
    async create(data: CreatePointageDto) {
        return await prisma.pointage.create({
            data,
        });
    }

    async lastPointageEmploye(employeId: string) {
        return await prisma.pointage.findFirst({
            where: { employeId },
            orderBy: { timestamp: "desc" },
        });
    }

    async findAll() {
        return await prisma.pointage.findMany({
            orderBy: { timestamp: "desc" },
        });
    }

    async findById(id: string) {
        return await prisma.pointage.findUnique({
            where: { id },
        });
    }
}
