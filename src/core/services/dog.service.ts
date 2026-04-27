import { Prisma } from '@prisma/client';
import { DogRepository } from '../repositories/dog.repository.js';

export class DogService {
  private repository: DogRepository;

  constructor() {
    this.repository = new DogRepository();
  }

  async getAllDogs() {
    return this.repository.findAll();
  }

  async getDogDetail(id: string) {
    return this.repository.findById(id);
  }

  async registerDog(data: Prisma.DogCreateInput) {
    // Aquí puedes agregar validaciones de negocio antes de guardar
    return this.repository.create(data);
  }
}
