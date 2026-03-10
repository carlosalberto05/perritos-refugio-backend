import prisma from '../../db/prisma.js';

export class DogRepository {
  async findAll() {
    return prisma.dog.findMany({
      include: {
        shelter: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.dog.findUnique({
      where: { id },
      include: {
        shelter: true,
      },
    });
  }

  async create(data: any) {
    return prisma.dog.create({
      data,
    });
  }
}
