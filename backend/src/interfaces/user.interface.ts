export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

export interface ILoginResponse {
  user: IUserResponse;
  token: string;
  refreshToken: string;
}

export interface IJWTPayload {
  userId: string;
  email: string;
}