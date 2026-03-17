import { SuccessStoryRepository } from '../repositories/success-story.repository.js';

export class SuccessStoryService {
  private repository: SuccessStoryRepository;
  constructor() {
    this.repository = new SuccessStoryRepository();
  }
  async getAllSuccessStories() {
    return this.repository.findAll();
  }
}
