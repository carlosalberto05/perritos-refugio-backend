import { RefugioRepository } from '../repositories/refugio.repository.js';

export class RefugioService {
  private repository: RefugioRepository;
  constructor() {
    this.repository = new RefugioRepository();
  }
  async getAllRefugios() {
    return this.repository.findAll();
  }
}
