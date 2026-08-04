import { prisma } from "../../database/prisma.service"
import { CreatePointageDTO, UpdatePointageDTO } from "./pointage.dto"

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

    async findById(id: string) {
        return prisma.pointage.findUnique({
            where: { id },
            include: {
                employe: true,
                chantier: true
            }
        })
    }

    async create(data: CreatePointageDTO) {
        return prisma.pointage.create({
            data
        })
    }

    async  update(id: string, data: UpdatePointageDTO) {
        return prisma.pointage.update({
            where: { id },
            data
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
                ...(dateDebut && dateFin && { timestamp: { gte: new Date(dateDebut), lte: new Date(dateFin)}}),
                
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