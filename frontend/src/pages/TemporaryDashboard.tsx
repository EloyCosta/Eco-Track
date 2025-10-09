"use client"

import React from "react"
import { useAuth } from "../contexts/AuthContext"
import { motion } from "framer-motion"
import InfoCard from "@/components/InfoCard"
import { Leaf, Activity, FileText, BarChart3 } from "lucide-react"

const TemporaryDashboard: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-50">
      {/* Cards do dashboard */}
      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <InfoCard title="Total Emissões" icon={<Leaf />} status="emConstrucao" />
        <InfoCard title="Projetos Ativos" icon={<Activity />} status="ativo" />
        <InfoCard title="Atividade Recente" icon={<BarChart3 />} status="carregando" />
        <InfoCard title="Relatórios" icon={<FileText />} status="alerta" />
      </motion.div>

      {/* Boas-vindas do usuário */}
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          🎉 Bem-vindo ao EcoTrack!
        </h1>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-green-50 rounded-lg text-center">
            <p className="text-green-700 font-semibold">Login realizado com sucesso!</p>
            <p className="text-sm text-green-600 mt-2">Logado como: {user?.name}</p>
            <p className="text-sm text-green-600">Email: {user?.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          Sair da Conta
        </button>
      </motion.div>
    </div>
  )
}

export default TemporaryDashboard
