import jwt from 'jsonwebtoken';
import { IJWTPayload } from '../interfaces/user.interface';

const JWT_SECRET = process.env.JWT_SECRET || 'ecotrack_secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'ecotrack_refresh_secret';
const JWT_EXPIRES_IN = '7d';
const JWT_REFRESH_EXPIRES_IN = '30d';

export class JWTUtils {
  static generateToken(payload: IJWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  static generateRefreshToken(payload: IJWTPayload): string {
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
  }

  static verifyToken(token: string): IJWTPayload {
    try {
      return jwt.verify(token, JWT_SECRET) as IJWTPayload;
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }

  static verifyRefreshToken(token: string): IJWTPayload {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET) as IJWTPayload;
    } catch (error) {
      throw new Error('Refresh token inválido ou expirado');
    }
  }
}