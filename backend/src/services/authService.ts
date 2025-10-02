import bcrypt from 'bcryptjs';
import { JWTUtils } from '../utils/jwtUtils';
import { IUser, IUserResponse, ILoginResponse } from '../interfaces/IUser';

// Mock database - depois substituiremos por PostgreSQL
const users: IUser[] = [];

export class AuthService {
  static async register(name: string, email: string, password: string): Promise<IUserResponse> {
    // Verificar se usuário já existe
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Criar usuário
    const newUser: IUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    };

    users.push(newUser);

    // Retornar usuário sem senha
    const { password: _, ...userResponse } = newUser;
    return userResponse as IUserResponse;
  }

  static async login(email: string, password: string): Promise<ILoginResponse> {
    // Encontrar usuário
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar tokens
    const tokenPayload = { userId: user.id, email: user.email };
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