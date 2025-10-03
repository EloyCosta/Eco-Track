import { query } from '../config/database';
import { IActivity, IActivityResponse, IActivityCreate, IActivityUpdate } from '../interfaces/activity.interface';

export class ActivityModel {

    static async create(activityData: IActivityCreate): Promise<IActivityResponse> {
        const { user_id, type, description, value, carbon_footprint, date } = activityData;
        const now = new Date();

        const result = await query(
            `INSERT INTO activities (user_id, type, description, value, carbon_footprint, date, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING id, user_id, type, description, value, carbon_footprint, date, created_at, updated_at`,
            [user_id, type, description, value, carbon_footprint, date, now, now]
        );

        return result.rows[0];
    }

    static async findByUserId(user_id: number): Promise<IActivityResponse[]> {
        const result = await query(
            'SELECT * FROM activities WHERE user_id = $1 ORDER BY date DESC',
            [user_id]
        );

        return result.rows;
    }

    static async findById(id: number): Promise<IActivityResponse | null> {
        const result = await query(
            'SELECT * FROM activities WHERE id = $1',
            [id]
        );

        return result.rows[0] || null;
    }

    static async update(id: number, activityData: IActivityUpdate): Promise<IActivityResponse> {
        const fields = [];
        const values = [];
        let paramCount = 1;

        for (const [key, value] of Object.entries(activityData)) {
            if (value !== undefined) {
                fields.push(`${key} = $${paramCount}`);
                values.push(value);
                paramCount++;
            }
        }

        fields.push('updated_at = $' + paramCount);
        values.push(new Date());

        values.push(id);

        const result = await query(
            `UPDATE activities SET ${fields.join(', ')} WHERE id = $${paramCount} 
       RETURNING *`,
            values
        );

        return result.rows[0];
    }

    static async delete(id: number): Promise<boolean> {
        const result = await query(
            'DELETE FROM activities WHERE id = $1',
            [id]
        );

        return (result.rowCount ?? 0) > 0;
    }

    static async getUserStats(user_id: number): Promise<{ total_carbon: number; activity_count: number }> {
        const result = await query(
            `SELECT 
         COUNT(*) as activity_count,
         COALESCE(SUM(carbon_footprint), 0) as total_carbon
         FROM activities 
         WHERE user_id = $1`,
            [user_id]
        );

        return {
            total_carbon: parseFloat(result.rows[0].total_carbon),
            activity_count: parseInt(result.rows[0].activity_count)
        };
    }
}