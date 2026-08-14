import { prisma } from "../../database/prisma.service";
import { CreateCongeDto, UpdateCongeDto } from "./conges.dto";
export class CongesRepository {
    async findall() {
        return  prisma.conge.findMany(
            {
                include: { employe: true },
                orderBy: {dateDebut: 'desc' }
            }
        );
    }

    async findById(id :string) {
        return prisma.conge.findUnique(
            {
                where: { id },
                include: { employe: true }
            }

        )
    }

    async findByEmployeId(employeId: string) {
        return prisma.conge.findMany(
            {
                where: { employeId },
                orderBy: { dateDebut: 'desc'}
            }
        )
    }

    async findEmployeById(employeId: string) {
        return prisma.employe.findUnique(
        {
            where: { id: employeId }
        }
    );
    }

    async findOveralapping( employeId: string , dateDebut: Date, dateFin: Date, excludeId?: string ) {
        return prisma.conge.findFirst(
            {
                where: {
                    employeId,
                    ...(excludeId && { id: { not: excludeId } }),
                    dateDebut: {
                        lte: dateFin
                    },
                    dateFin: {
                        gte: dateDebut
                    }
                }

            }
        )
    }

    async create( data: {employeId: string; dateDebut: Date; dateFin: Date; }) {
        return prisma.conge.create({ data });
    }

    async update(id: string,   data: { dateDebut?: Date; dateFin?: Date; }) {
        return prisma.conge.update(
           {
              where: { id },
              data
           }
        )
    }

    async delete(id: string) {
        return prisma.conge.delete(
            {
                where: { id }
            }
        )
    }
}