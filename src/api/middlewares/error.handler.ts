import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/api-response.js';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[Error] ${req.method} ${req.url} - ${message}`);

  res
    .status(statusCode)
    .json(
      ApiResponse.error(
        message,
        process.env.NODE_ENV === 'development' ? err.stack : undefined
      )
    );
};
