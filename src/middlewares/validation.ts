// middlewares/validate.ts
import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../exceptions/bad-request";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new BadRequestException(
        "Algunos campos no cumplen con las restricciones establecidas, verifiquelos por favor..",
      );
    }

    // Opcional: reemplazás el body con los datos validados
    req.body = result.data;
    next();
  };
