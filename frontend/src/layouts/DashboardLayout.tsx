"use client"

import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/app-sidebar"
import TemporaryDashboard from "../pages/TemporaryDashboard" // importa o que já criamos

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen bg-gray-50">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          {/* Apenas renderiza o TemporaryDashboard */}
          <TemporaryDashboard />
        </main>
      </div>
    </SidebarProvider>
  )
}
