import { ZodError } from 'zod';

// Middleware genérico que valida body/params/query com base num schema Zod.
// Guarda os dados normalizados em req.validated para evitar repetições.
export function validateRequest(schema) {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const error = result.error instanceof ZodError ? result.error : null;
      return next({
        status: 400,
        message: 'Invalid request',
        errors: error?.flatten().fieldErrors,
      });
    }

    req.validated = result.data;
    next();
  };
}