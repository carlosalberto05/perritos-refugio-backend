import { Request, Response, NextFunction } from 'express';
import { DogService } from '../../core/services/dog.service.js';
import { ApiResponse } from '../utils/api-response.js';

const dogService = new DogService();

export const getDogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await dogService.getAllDogs();
    res.json(ApiResponse.success(data, 'Perritos recuperados exitosamente'));
  } catch (error) {
    next(error);
  }
};

export const createDog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await dogService.registerDog(req.body);
    res
      .status(201)
      .json(ApiResponse.success(data, 'Perrito registrado exitosamente'));
  } catch (error) {
    next(error);
  }
};
