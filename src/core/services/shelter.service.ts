import { ShelterRepository } from '../repositories/shelter.repository.js';

export class ShelterService {
  private repository: ShelterRepository;
  constructor() {
    this.repository = new ShelterRepository();
  }
  async getAllShelters() {
    return this.repository.findAll();
  }
}
