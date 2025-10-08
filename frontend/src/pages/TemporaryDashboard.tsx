"use client"

import React from "react"
import { useAuth } from "../contexts/AuthContext"
import { motion } from "framer-motion"

const TemporaryDashboard: React.FC = () => {
  const { user, logout } = useAuth()

  const cards = [
    { title: "Total Emissões", value: "⚠ Em Construção" },
    { title: "Projetos Ativos", value: "⚠ Em Construção" },
    { title: "Atividade Recente", value: "⚠ Em Construção" },
    { title: "Relatórios", value: "⚠ Em Construção" },
  ]

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
        {cards.map((card) => (
          <motion.div
            key={card.title}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm text-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h2 className="text-sm font-medium text-gray-500 mb-2">{card.title}</h2>
            <p className="text-xl font-bold text-gray-700">{card.value}</p>
          </motion.div>
        ))}
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
