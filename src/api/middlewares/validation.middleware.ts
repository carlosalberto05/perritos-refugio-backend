import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';
import { ApiResponse } from '../utils/api-response.js';

export const validateRequest = (schema: ZodType<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        return res
          .status(400)
          .json(ApiResponse.error('Error de validación de datos', errors));
      }
      next(error);
    }
  };
};
