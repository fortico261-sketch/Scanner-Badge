import { prisma } from '../../database/prisma.service';


export class BadgeRepository {
    async create(uid: string, employeId: string) {
        return prisma.badge.create(
            { data : {
                uid,
                employeId
            }}
        )

    }

    async findByUiId(uid: string) {
        return prisma.badge.findUnique(
            {
                where: { uid },
                
                include: {
                   employe: true
                }
            }
        )
    }

    async finddByEmployeId(employeId: string) {
        return prisma.badge.findUnique(
            {
                where: {
                    employeId
                }
            }
        )
    }

    async exists(uid: string) {
        return prisma.badge.findUnique(
            {
                where: {
                    uid
                }
            }
        )
    }
}