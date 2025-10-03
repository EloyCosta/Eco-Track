import { ActivityController } from '../controllers/activity.controller';
import { authMiddleware } from "../middleware/auth.middleware";
import Router from "@koa/router";

const router = new Router({
    prefix:'/api/activities'
});

// 🔐 TODAS AS ROTAS PROTEGIDAS POR AUTENTICAÇÃO
router.use(authMiddleware);

// 📋 CRUD COMPLETO DE ATIVIDADES

// 🟢 GET /api/activities - Listar todas atividades do usuário
router.get('/', ActivityController.getUserActivities);

// 🟢 GET /api/activities/stats - Estatísticas do usuário
router.get('/stats', ActivityController.getUserStats);

// 🟢 GET /api/activities/:id - Buscar atividade específica
router.get('/:id', ActivityController.getActivity);

// 🟡 POST /api/activities - Criar nova atividade
router.post('/', ActivityController.createActivity);

// 🔵 PUT /api/activities/:id - Atualizar atividade
router.put('/:id', ActivityController.updateActivity);

// 🔴 DELETE /api/activities/:id - Deletar atividade
router.delete('/:id', ActivityController.deleteActivity);

export default router;