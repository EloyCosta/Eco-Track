import React from "react"
import { motion } from "framer-motion"
import { AlertTriangle, CheckCircle, Loader2 } from "lucide-react"

interface InfoCardProps {
  title: string
  status?: "emConstrucao" | "ativo" | "alerta" | "carregando"
  value?: string
  icon?: React.ReactNode
  onClick?: () => void
  children?: React.ReactNode
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  status = "emConstrucao",
  value,
  icon,
  onClick,
  children,
}) => {
  const statusConfig = {
    emConstrucao: {
      color: "text-gray-600",
      bg: "bg-gray-100",
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      text: "⚠ Em Construção",
    },
    ativo: {
      color: "text-green-700",
      bg: "bg-green-50",
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      text: "Ativo",
    },
    alerta: {
      color: "text-red-700",
      bg: "bg-red-50",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      text: "Alerta",
    },
    carregando: {
      color: "text-blue-700",
      bg: "bg-blue-50",
      icon: <Loader2 className="w-5 h-5 animate-spin text-blue-500" />,
      text: "Carregando...",
    },
  }

  const { color, bg, icon: defaultIcon, text } = statusConfig[status]

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm text-center flex flex-col items-center justify-center transition-all duration-200 ${
        onClick ? "cursor-pointer hover:shadow-lg" : ""
      }`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <h2 className="text-sm font-medium text-gray-500 mb-2">{title}</h2>

      <div
        className={`flex flex-col items-center justify-center rounded-md p-3 w-full ${bg}`}
      >
        {icon || defaultIcon}
        <p className={`text-xl font-bold mt-2 ${color}`}>
          {value || text}
        </p>
      </div>

      {children && <div className="mt-3 w-full">{children}</div>}
    </motion.div>
  )
}

export default InfoCard
