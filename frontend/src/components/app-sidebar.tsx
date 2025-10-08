import * as React from "react"
import {
  HomeIcon,
  BarChartIcon,
  FileTextIcon,
  GearIcon,
} from "@radix-ui/react-icons"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Usuário EcoTrack",
    email: "user@ecotrack.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Início",
      url: "/dashboard",
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: "Relatórios",
      url: "/dashboard/reports",
      icon: BarChartIcon,
    },
    {
      title: "Projetos",
      url: "/dashboard/projects",
      icon: FileTextIcon,
    },
    {
      title: "Configurações",
      url: "/dashboard/settings",
      icon: GearIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* HEADER */}
      <SidebarHeader>
        <h2 className="text-xl font-extrabold text-gray-800 px-4 py-3 tracking-tight">
          EcoTrack
        </h2>
      </SidebarHeader>

      {/* NAV MAIN */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
