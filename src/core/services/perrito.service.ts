import { PerritoRepository } from '../repositories/perrito.repository.js';

export class PerritoService {
  private repository: PerritoRepository;

  constructor() {
    this.repository = new PerritoRepository();
  }

  async getAllPerritos() {
    return this.repository.findAll();
  }

  async getPerritoDetail(id: string) {
    return this.repository.findById(id);
  }

  async registerPerrito(data: any) {
    // Aquí puedes agregar validaciones de negocio antes de guardar
    return this.repository.create(data);
  }
}
