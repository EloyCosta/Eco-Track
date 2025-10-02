import Router from '@koa/router';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = new Router({
  prefix: '/api/auth'
});

// Rotas públicas
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

// Rotas protegidas
router.get('/profile', authMiddleware, AuthController.getProfile);

export default router;