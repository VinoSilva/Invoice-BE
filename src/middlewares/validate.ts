// src/middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the incoming request against the provided schema
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // If valid, proceed to the controller
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Send a 400 status code with exact details on which fields failed
        return res.status(400).json({
          error: 'Validation failed',
          details: error.flatten().fieldErrors,
        });
      }

      // Fallback for non-validation errors
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};
