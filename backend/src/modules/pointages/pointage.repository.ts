import { prisma } from "../../database/prisma.service"
import { CreatePointageData, CreatePointageDTO, UpdatePointageDTO } from "./pointage.dto"

export class PointageRepository {

    async findAll() {
        return prisma.pointage.findMany({
            include: {
                employe: true,
                chantier: true
            },
            orderBy: {
                timestamp: 'desc'
            }
        });
    }

    async findLastByEmploye(employeId: string) {
        return prisma.pointage.findFirst({
            where: { employeId },
            orderBy: {
                timestamp: "desc"
            }
        })
    }

    async findById(id: string) {
        return prisma.pointage.findUnique({
            where: { id },
            include: {
                employe: true,
                chantier: true
            }
        })
    }

    
    async create(data: CreatePointageData) {
        return prisma.pointage.create({
            data,
            include: {
                employe: true,
                chantier: true

            }
        })
    }

    async  update(id: string, data: UpdatePointageDTO) {
        return prisma.pointage.update({
            where: { id },
            data,
            include: {
              employe: true,
              chantier: true
            }
        })

    }

    async delete(id: string) {
        return prisma.pointage.delete({
            where: { id } 
        })
    }

   async findWithFilters(employeId?: string, dateDebut?: string, dateFin?: string) {

    return prisma.pointage.findMany({
        where: {
            ...(employeId && { employeId }),

            ...(dateDebut || dateFin) && { timestamp: {
                    ...(dateDebut && { gte: new Date(dateDebut) }),
                    ...(dateFin && {lte: new Date(dateFin)})
                }
            }
        },

        include: {
            employe: true,
            chantier: true
        },

        orderBy: {
            timestamp: 'desc'
        }
    })
}

}