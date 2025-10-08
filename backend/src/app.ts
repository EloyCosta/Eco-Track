import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { config } from 'dotenv';

// Carregar variáveis de ambiente
config();

// Importar rotas
import authRoutes from './routes/auth.router';
import activityRoutes from './routes/activity.router';
import { Context } from 'vm';

const app = new Koa();

// Middlewares
app.use(cors({
  origin: (ctx: Context) => {
    // ✅ Permite várias portas do localhost
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174', 
      'http://localhost:5175',
      'http://localhost:3000'
    ];
    const requestOrigin = ctx.headers.origin;
    
    if (allowedOrigins.includes(requestOrigin)) {
      return requestOrigin;
    }
    // ✅ Retorna a primeira permitida como fallback
    return allowedOrigins[0];
  },
  credentials: true
}));

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
  formLimit: '10mb',
  jsonLimit: '10mb'
}));

// Logger middleware
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Error:", err);

    if (err instanceof Error) {
      ctx.status = 500;
      ctx.body = {
        error: err.message,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        error: "Internal Server Error",
      };
    }
  }
});


// Rotas
app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());

app.use(activityRoutes.routes());      
app.use(activityRoutes.allowedMethods());


// Health check route
app.use(async (ctx) => {
  if (ctx.path === '/health') {
    ctx.status = 200;
    ctx.body = { 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      service: 'EcoTrack API'
    };
  }
});

export default app;