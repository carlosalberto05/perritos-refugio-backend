import { Request, Response, NextFunction } from 'express';
import { RefugioService } from '../../core/services/refugio.service.js';
import { ApiResponse } from '../utils/api-response.js';

const refugioService = new RefugioService();

export const getRefugios = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await refugioService.getAllRefugios();
    res.json(ApiResponse.success(data, 'Refugios recuperados exitosamente'));
  } catch (error) {
    next(error);
  }
};
