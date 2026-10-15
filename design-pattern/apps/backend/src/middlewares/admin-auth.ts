import { timingSafeEqual } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

// Guards settings routes with the ADMIN_TOKEN env var. Fails closed if unset.
export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    res.status(503).json({ error: 'ADMIN_TOKEN is not configured' });
    return;
  }
  const given = req.header('x-admin-token') ?? '';
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    res.status(401).json({ error: 'invalid admin token' });
    return;
  }
  next();
}
