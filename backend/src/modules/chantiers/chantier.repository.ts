import { prisma } from '../../database/prisma.service';

export class ChantiersRepository {

    async findAll() {
        return prisma.chantier.findMany();
    }

    async findById(id : String) {
        return prisma.chantier.findUnique({
            where : { id }
        });
    }

    async create(data : any) {
        return prisma.chantier.create({
            data 
        });
    }

    async update(id: String, data: any) {
        return prisma.chantier.update({
            where: { id },
            data
        })
    }

    async delete(id: String) {
        return prisma.chantier.delete({
            where: { id }
        })
    }


}
