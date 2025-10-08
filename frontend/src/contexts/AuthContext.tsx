import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authAPI } from '../services/api';

// ✅ 1. INTERFACE DO USUÁRIO
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

// ✅ 2. INTERFACE DO CONTEXTO
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

// ✅ 3. CRIAR CONTEXT
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ 4. PROVEDOR DO CONTEXT
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // ✅ 5. ESTADOS - MOVER PARA DENTRO DO COMPONENTE
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ 6. EFFECT - Verificar se já está logado
  useEffect(() => {
    const storedToken = localStorage.getItem('ecotrack_token');
    const storedUser = localStorage.getItem('ecotrack_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ 7. FUNÇÃO DE LOGIN COM API REAL
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // ✅ CHAMADA REAL DA API
      const response = await authAPI.login(email, password);
      
      // ✅ DADOS REAIS DO BACK-END
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('ecotrack_token', response.token);
      localStorage.setItem('ecotrack_user', JSON.stringify(response.user));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ 8. FUNÇÃO DE REGISTRO COM API REAL
  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // ✅ CHAMADA REAL DA API
      const response = await authAPI.register(name, email, password);
      
      // ✅ FAZER LOGIN AUTOMATICAMENTE APÓS REGISTRO
      await login(email, password);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar conta';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ 9. FUNÇÃO DE LOGOUT
  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ecotrack_token');
    localStorage.removeItem('ecotrack_user');
    setError(null);
  };

  // ✅ 10. VALOR DO CONTEXT
  const contextValue: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ 11. HOOK PERSONALIZADO
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};