import { prisma } from '../../database/prisma.service';

export class ChantiersRepository {

    async findAll() {
        return prisma.chantier.findMany();
    }

    async findById(id : string) {
        return prisma.chantier.findUnique({
            where : { id }
        });
    }

    async create(data : any) {
        return prisma.chantier.create({
            data 
        });
    }

    async update(id: string, data: any) {
        return prisma.chantier.update({
            where: { id },
            data
        })
    }

    async delete(id: string) {
        return prisma.chantier.delete({
            where: { id }
        })
    }


}
