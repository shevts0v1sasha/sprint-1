import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { log } from 'node:console';
import { JWT_SECRET } from '../config';
import UnauthorizedError from '../errors/unauthorized-error';

interface JwtPayload {
  _id: string
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization || '';
  log(token);
  let payload: JwtPayload | null = null;
  try {
    payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    log(req.user);
    next();
  } catch (e) {
    log('exception');
    next(new UnauthorizedError('Необходима авторизация'));
  }
};

export default auth;
