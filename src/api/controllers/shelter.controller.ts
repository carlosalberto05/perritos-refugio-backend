import { Request, Response, NextFunction } from 'express';
import { ShelterService } from '../../core/services/shelter.service.js';
import { ApiResponse } from '../utils/api-response.js';

const shelterService = new ShelterService();

export const getShelters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await shelterService.getAllShelters();
    res.json(ApiResponse.success(data, 'Refugios recuperados exitosamente'));
  } catch (error) {
    next(error);
  }
};
