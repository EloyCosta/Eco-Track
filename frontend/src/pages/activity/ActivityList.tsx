"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"

// Interface de Activity
interface Activity {
  id: number
  title: string
  status: string
  description?: string
}

const mockActivities: Activity[] = [
  { id: 1, title: "Criar relatório de emissões", status: "Em andamento" },
  { id: 2, title: "Revisar projeto de energia solar", status: "Concluída" },
  { id: 3, title: "Atualizar planilha de transporte", status: "Pendente" },
]

export default function ActivityList() {
  const { user } = useAuth()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // Aqui futuramente chamaremos GET /activity
    setActivities(mockActivities)
  }, [])

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        📝 Atividades de {user?.name}
      </h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {activity.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{activity.status}</p>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Ver
              </button>
              <button className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500 transition">
                Editar
              </button>
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition">
                Deletar
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
