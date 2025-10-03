import bcrypt from 'bcryptjs';
import { JWTUtils } from '../utils/jwt.utils';
import { IUser, IUserResponse, ILoginResponse } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

export class AuthService {
  static async register(name: string, email: string, password: string): Promise<IUserResponse> {
    // Verificar se usuário já existe NO BANCO REAL
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    // Criar usuário NO BANCO REAL
    const user = await UserModel.create({
      name,
      email,
      password
    });

    return user;
  }

  static async login(email: string, password: string): Promise<ILoginResponse> {
    // Buscar usuário NO BANCO REAL
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar tokens
    const tokenPayload = { userId: user.id.toString(), email: user.email };
    const token = JWTUtils.generateToken(tokenPayload);
    const refreshToken = JWTUtils.generateRefreshToken(tokenPayload);

    // Retornar usuário sem senha
    const { password: _, ...userResponse } = user;

    return {
      user: userResponse as IUserResponse,
      token,
      refreshToken
    };
  }

  static async refreshToken(refreshToken: string): Promise<{ token: string }> {
    try {
      const decoded = JWTUtils.verifyRefreshToken(refreshToken);
      
      // Verificar se usuário ainda existe no banco
      const user = await UserModel.findById(decoded.userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const newToken = JWTUtils.generateToken({
        userId: decoded.userId,
        email: decoded.email
      });

      return { token: newToken };
    } catch (error) {
      throw new Error('Refresh token inválido');
    }
  }
}