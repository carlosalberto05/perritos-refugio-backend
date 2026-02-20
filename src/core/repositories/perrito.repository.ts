// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient(); // Comentado hasta que se use

export class PerritoRepository {
  async findAll() {
    // Aquí irá la lógica de Prisma después
    return [];
  }

  async findById(_id: string) {
    return null;
  }

  async create(data: any) {
    return data;
  }
}
