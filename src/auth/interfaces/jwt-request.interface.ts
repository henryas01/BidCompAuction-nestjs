import { Request } from 'express';

export interface JwtRequest extends Request {
  user: {
    sub: number;
    email: string;
    isAdmin?: boolean;
  };
}
