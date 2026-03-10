import { Request, Response, NextFunction } from 'express';
import { SuccessStoryService } from '../../core/services/success-story.service.js';
import { ApiResponse } from '../utils/api-response.js';

const successStoryService = new SuccessStoryService();

export const getSuccessStories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await successStoryService.getAllSuccessStories();
    res.json(
      ApiResponse.success(data, 'Historias de éxito recuperadas exitosamente')
    );
  } catch (error) {
    next(error);
  }
};
