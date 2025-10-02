import { Context, Next } from 'koa';
import { JWTUtils } from '../utils/jwtUtils';

export const authMiddleware = async (ctx: Context, next: Next) => {
  try {
    const authHeader = ctx.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      ctx.status = 401;
      ctx.body = { error: 'Token de autenticação não fornecido' };
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = JWTUtils.verifyToken(token);
    
    // Adiciona usuário decodificado ao contexto
    ctx.state.user = decoded;
    
    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { error: 'Token inválido ou expirado' };
  }
};

export const optionalAuthMiddleware = async (ctx: Context, next: Next) => {
  try {
    const authHeader = ctx.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = JWTUtils.verifyToken(token);
      ctx.state.user = decoded;
    }
    
    await next();
  } catch (error) {
    // Continua mesmo com token inválido (para rotas opcionais)
    await next();
  }
};