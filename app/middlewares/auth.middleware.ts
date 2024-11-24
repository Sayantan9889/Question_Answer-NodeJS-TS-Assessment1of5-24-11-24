import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const auth = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
  try {
    const token = req.header('auth-token');

    if (!token) {
      res.status(401).json({ message: 'No authentication token provided' });
      return;
    }

    const decoded:JwtPayload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid authentication token' });
  }
};