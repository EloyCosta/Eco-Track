// src/pages/Home.tsx
import React from "react";
import {
  SidebarProvider,
  SidebarContent,
} from "../components/ui/Sidebar"; // ajuste conforme seu caminho
import MenuSidebar from "../components/ui/menuSidebar";

const Home: React.FC = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <SidebarContent>
          <MenuSidebar />
        </SidebarContent>

        {/* Conteúdo Principal */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

          {/* Placeholders de Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-2">Consumo Diário</h2>
              <p className="text-2xl font-bold text-green-600">120 kg CO₂</p>
              <p className="text-sm text-gray-500">Últimos 7 dias</p>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-2">Pegada de Carbono</h2>
              <p className="text-2xl font-bold text-red-600">1.2 t CO₂</p>
              <p className="text-sm text-gray-500">Este mês</p>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-2">Atividades Recentes</h2>
              <ul className="text-sm text-gray-700">
                <li>🚴‍♂️ Bicicleta: 5 km</li>
                <li>🛵 Carro: 10 km</li>
                <li>🏃‍♂️ Caminhada: 3 km</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Home;
