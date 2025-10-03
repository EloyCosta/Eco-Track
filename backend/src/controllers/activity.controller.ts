import { Context } from 'koa';
import { ActivityModel } from '../models/activities.model';
import { createActivitySchema, updateActivitySchema } from '../validations/activity.schemas';

export class ActivityController {

    // CRUD

    static async createActivity(ctx: Context) {
        try {
            // Validar dados com Zod
            const validatedData = createActivitySchema.parse(ctx.request.body);

            // Pegar user_id do middleware de autenticação
            const user_id = parseInt(ctx.state.user.userId);

            const activity = await ActivityModel.create({
                ...validatedData,
                user_id,
                carbon_footprint: validatedData.carbon_footprint ?? 0 // usa 0 se não passar
            });

            ctx.status = 201;
            ctx.body = {
                message: 'Atividade criada com sucesso',
                activity
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

    static async updateActivity(ctx: Context) {
        try {
            const { id } = ctx.params;
            const user_id = parseInt(ctx.state.user.userId);
            const updateData = updateActivitySchema.parse(ctx.request.body);

            const existingActivity = await ActivityModel.findById(parseInt(id));
            if (!existingActivity) {
                ctx.status = 404;
                ctx.body = { error: 'Atividade não encontrada' };
                return;
            }

            if (existingActivity.user_id !== user_id) {
                ctx.status = 403;
                ctx.body = { error: 'Acesso negado' };
                return;
            }

            const updatedActivity = await ActivityModel.update(parseInt(id), updateData);

            ctx.status = 200;
            ctx.body = {
                message: 'Atividade atualizada com sucesso',
                activity: updatedActivity
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

    static async deleteActivity(ctx: Context) {
        try {
            const { id } = ctx.params;
            const user_id = parseInt(ctx.state.user.userId);

            const existingActivity = await ActivityModel.findById(parseInt(id));
            if (!existingActivity) {
                ctx.status = 404;
                ctx.body = { error: 'Atividade não encontrada' };
                return;
            }

            if (existingActivity.user_id !== user_id) {
                ctx.status = 403;
                ctx.body = { error: 'Acesso negado' };
                return;
            }

            await ActivityModel.delete(parseInt(id));

            ctx.status = 200;
            ctx.body = { message: 'Atividade deletada com sucesso' };
        } catch {
            ctx.status = 500;
            ctx.body = { error: 'Erro interno do servidor' };
        }
    }

    // GET

    static async getUserActivities(ctx: Context) {
        try {
            const user_id = parseInt(ctx.state.user.userId);
            const activities = await ActivityModel.findByUserId(user_id);

            ctx.status = 200;
            ctx.body = { activities, count: activities.length };
        } catch {
            ctx.status = 500;
            ctx.body = { error: 'Erro interno do servidor' };
        }
    }

    static async getActivity(ctx: Context) {
        try {
            const { id } = ctx.params;
            const user_id = parseInt(ctx.state.user.userId);

            const activity = await ActivityModel.findById(parseInt(id));
            if (!activity) {
                ctx.status = 404;
                ctx.body = { error: 'Atividade não encontrada' };
                return;
            }

            if (activity.user_id !== user_id) {
                ctx.status = 403;
                ctx.body = { error: 'Acesso negado' };
                return;
            }

            ctx.status = 200;
            ctx.body = { activity };
        } catch {
            ctx.status = 500;
            ctx.body = { error: 'Erro interno do servidor' };
        }
    }

    static async getUserStats(ctx: Context) {
        try {
            const user_id = parseInt(ctx.state.user.userId);
            const stats = await ActivityModel.getUserStats(user_id);

            ctx.status = 200;
            ctx.body = { stats };
        } catch {
            ctx.status = 500;
            ctx.body = { error: 'Erro interno do servidor' };
        }
    }
}
