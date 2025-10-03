import { Context } from 'koa';
import { AuthService } from '../services/authService';
import { registerSchema, loginSchema } from '../validations/auth.schemas';

export class AuthController {
  static async register(ctx: Context) {
    try {
      // Validar dados com Zod
      const validatedData = registerSchema.parse(ctx.request.body);

      const user = await AuthService.register(
        validatedData.name,
        validatedData.email,
        validatedData.password
      );

      ctx.status = 201;
      ctx.body = {
        message: 'Usuário criado com sucesso',
        user
      };
    } catch (error) {
      if (error instanceof Error) {
        ctx.status = 400;
        ctx.body = { error: error.message };
      } else {
        ctx.status = 500;
        ctx.body = { error: 'Erro interno do servidor' };
      }
    }
  }

  static async login(ctx: Context) {
    try {
      // Validar dados com Zod
      const validatedData = loginSchema.parse(ctx.request.body);

      const result = await AuthService.login(
        validatedData.email,
        validatedData.password
      );

      ctx.status = 200;
      ctx.body = {
        message: 'Login realizado com sucesso',
        ...result
      };
    } catch (error) {
      if (error instanceof Error) {
        ctx.status = 401;
        ctx.body = { error: error.message };
      } else {
        ctx.status = 500;
        ctx.body = { error: 'Erro interno do servidor' };
      }
    }
  }

  static async refreshToken(ctx: Context) {
    try {
      const { refreshToken } = ctx.request.body as { refreshToken: string };

      if (!refreshToken) {
        ctx.status = 400;
        ctx.body = { error: 'Refresh token é obrigatório' };
        return;
      }

      const result = await AuthService.refreshToken(refreshToken);

      ctx.status = 200;
      ctx.body = {
        message: 'Token atualizado com sucesso',
        ...result
      };
    } catch (error) {
      if (error instanceof Error) {
        ctx.status = 401;
        ctx.body = { error: error.message };
      } else {
        ctx.status = 500;
        ctx.body = { error: 'Erro interno do servidor' };
      }
    }
  }

  static async getProfile(ctx: Context) {
    try {
      // Usuário vem do middleware de autenticação
      const user = ctx.state.user;
      
      ctx.status = 200;
      ctx.body = {
        user: {
          userId: user.userId,
          email: user.email
        }
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: 'Erro interno do servidor' };
    }
  }
}   