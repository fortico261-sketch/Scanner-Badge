import { prisma } from "../../database/prisma.service";

export class EmployeRepository {

    async findAll() {
        return prisma.employe.findMany({
            include: {
                badge: true,
            }
        });
    }

    async findById(id: string) {
        return prisma.employe.findUnique({
            where: { id },
            include: {
                badge: true,
            }
        })
    }
    
    async findBadgeId(uid: string) {
    // Prisma schema stores the foreign key on Badge (employeId),
    // so query the Badge by uid and return its related employe.
    const badge = await prisma.badge.findUnique({
        where: { uid },
        include: { employe: true }
    });

    return badge?.employe ?? null;
}

    async create(data: any) {
        // do not pass badgeId directly (Badge relation is stored on Badge side)
        const { badgeId, ...rest } = data;

        const employe = await prisma.employe.create({ data: rest });

        if (badgeId) {
            // badgeId coming from client is the badge uid
            const badge = await prisma.badge.findUnique({ where: { uid: badgeId } });
            if (badge) {
                await prisma.badge.update({ where: { id: badge.id }, data: { employeId: employe.id } });
            }
        }

        return prisma.employe.findUnique({
            where: { id: employe.id },
            include: { badge: true }
        });
    }

    async update(id: string, data: any) {
        const { badgeId, ...rest } = data;

        const employe = await prisma.employe.update({ where: { id }, data: rest });

        if (badgeId !== undefined) {
            // If badgeId is null/empty, unlink previous badge(s). Otherwise link by uid.
            if (!badgeId) {
                // unlink any badge that references this employe
                await prisma.badge.updateMany({ where: { employeId: id }, data: { employeId: null } as any });
            } else {
                // find the badge by uid and set its employeId to this employe
                const badge = await prisma.badge.findUnique({ where: { uid: badgeId } });
                if (badge) {
                    await prisma.badge.update({ where: { id: badge.id }, data: { employeId: employe.id } });
                }
            }
        }

        return prisma.employe.findUnique({
            where: { id },
            include: { badge: true }
        });

    }

    async delete(id : string) {
        return prisma.employe.delete({
            where: { id }
        })
    }
}