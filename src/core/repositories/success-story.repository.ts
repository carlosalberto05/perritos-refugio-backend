import prisma from '../../db/prisma.js';

export class SuccessStoryRepository {
  async findAll() {
    return prisma.successStory.findMany();
  }
}
