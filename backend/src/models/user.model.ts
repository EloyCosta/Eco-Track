import { query } from '../config/database';
import { IUser, IUserResponse } from '../interfaces/user.interface';
import bcrypt from 'bcryptjs';

export class UserModel {
  static async create(userData: Omit<IUser, 'id' | 'created_at' | 'updated_at'>): Promise<IUserResponse> {
    const { name, email, password } = userData;
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const now = new Date();

    const result = await query(
      `INSERT INTO users (name, email, password, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, name, email, created_at, updated_at`,
      [name, email, hashedPassword, now, now]
    );

    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    return result.rows[0] || null;
  }

  static async findById(id: string): Promise<IUserResponse | null> {
    const result = await query(
      'SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );

    return result.rows[0] || null;
  }
}