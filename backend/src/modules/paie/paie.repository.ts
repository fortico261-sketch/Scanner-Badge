import { prisma } from "../../database/prisma.service";

export class PaieRepository {

    async findEmployeWithData(employeId: string, dateDebut: Date, dateFin: Date) {
        return prisma.employe.findUnique({
            where: { id: employeId },
            include: {
                pointages: {
                    where: {
                        timestamp: {
                            gte: dateDebut,
                            lte: dateFin
                        }
                    }
                },

                conges: {
                    where: {
                        dateDebut: {
                            lte: dateFin
                        },
                        dateFin: {
                            gte: dateDebut
                        }
                    }
                },


            }
        })
    }

}