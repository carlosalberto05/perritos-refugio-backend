import prisma from '../../db/prisma.js';

export class ShelterRepository {
  async findAll() {
    return prisma.shelter.findMany({
      include: {
        dogs: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.shelter.findUnique({
      where: { id },
      include: {
        dogs: true,
      },
    });
  }
}
