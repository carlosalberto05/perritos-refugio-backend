import { Request, Response, NextFunction } from 'express';
import { PerritoService } from '../../core/services/perrito.service.js';
import { ApiResponse } from '../utils/api-response.js';

const perritoService = new PerritoService();

export const getPerritos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await perritoService.getAllPerritos();
    res.json(ApiResponse.success(data, 'Perritos recuperados exitosamente'));
  } catch (error) {
    next(error);
  }
};

export const createPerrito = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await perritoService.registerPerrito(req.body);
    res
      .status(201)
      .json(ApiResponse.success(data, 'Perrito registrado exitosamente'));
  } catch (error) {
    next(error);
  }
};
