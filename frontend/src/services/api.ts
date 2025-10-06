import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// ✅ 1. INTERFACES PARA AS RESPOSTAS DA API
interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  token: string;
  refreshToken: string;
  message: string;
}

interface RegisterResponse {
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  message: string;
}

interface ErrorResponse {
  error: string;
}

// ✅ 2. CONFIGURAÇÃO BASE DO AXIOS
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // Nosso back-end
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 3. INTERCEPTOR PARA ADICIONAR TOKEN AUTOMATICAMENTE
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ecotrack_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ 4. INTERCEPTOR PARA TRATAR ERROS GLOBALMENTE
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ErrorResponse>) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('ecotrack_token');
      localStorage.removeItem('ecotrack_user');
      window.location.href = '/login'; // Redirecionar para login
    }
    
    const errorMessage = error.response?.data?.error || 'Erro de conexão';
    return Promise.reject(new Error(errorMessage));
  }
);

// ✅ 5. FUNÇÕES DE AUTENTICAÇÃO
export const authAPI = {
  // LOGIN
  async login(email: string, password: string): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  // REGISTER
  async register(name: string, email: string, password: string): Promise<RegisterResponse> {
    const response: AxiosResponse<RegisterResponse> = await api.post('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },

  // GET PROFILE (rota protegida)
  async getProfile(): Promise<LoginResponse['user']> {
    const response: AxiosResponse<{ user: LoginResponse['user'] }> = await api.get('/auth/profile');
    return response.data.user;
  },

  // REFRESH TOKEN
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response: AxiosResponse<{ token: string }> = await api.post('/auth/refresh-token', {
      refreshToken,
    });
    return response.data;
  },
};

// ✅ 6. FUNÇÕES DE ATIVIDADES (para usar depois)
export const activitiesAPI = {
  async getUserActivities() {
    const response = await api.get('/activities');
    return response.data;
  },

  async createActivity(activityData: any) {
    const response = await api.post('/activities', activityData);
    return response.data;
  },
};

// ✅ 7. EXPORTAR INSTÂNCIA PARA USO DIRETO (se necessário)
export default api;