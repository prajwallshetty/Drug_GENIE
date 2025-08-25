import { Request, Response, NextFunction } from 'express';

// Handles requests to routes that do not exist (404 Not Found)
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// A general-purpose error handler that catches all other errors
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // If the status code is 200 (OK), but an error was thrown, set it to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  
  res.json({
    message: err.message,
    // Only show the detailed error stack in development mode for security reasons
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };