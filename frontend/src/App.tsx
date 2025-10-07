import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';

// import Register from './pages/Register'; // Vamos criar depois
// import Dashboard from './pages/Dashboard'; // Vamos criar depois

// ✅ Componente para rotas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// ✅ Componente para rotas públicas (quando já está logado)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/dashboard" />;
};

// ✅ Componente de Loading
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Carregando...</p>
    </div>
  </div>
);

// ✅ Página temporária de Dashboard
const TemporaryDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          🎉 Bem-vindo ao EcoTrack!
        </h1>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-green-700 text-center">
              <strong>Login realizado com sucesso!</strong>
            </p>
            <p className="text-sm text-green-600 mt-2 text-center">
              Logado como: {user?.name}
            </p>
            <p className="text-sm text-green-600 text-center">
              Email: {user?.email}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            Sair da Conta
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Dashboard em construção... 🚧
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const { isLoading } = useAuth();

  // ✅ Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        {/* ✅ Rota pública - Login */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* ✅ Rota protegida - Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <TemporaryDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Rota raiz redireciona para login ou dashboard */}
        <Route path="/"element={<Navigate to="/dashboard" />}/>
        {/* ✅ Rota fallback */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </Router>
  );
}

export default App;