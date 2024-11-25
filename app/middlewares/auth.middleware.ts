import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  name: string;
  image: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  isVarified?: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('auth-token');

    if (!token) {
      res.status(401).json({ message: 'No authentication token provided' });
      return;
    }

    const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { ...decoded };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid authentication token' });
  }
};