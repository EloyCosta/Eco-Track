import React from "react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/Sidebar";
import { useLocation } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaLeaf } from "react-icons/fa";

const MenuSidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/home", icon: <FaTachometerAlt /> },
    { name: "Perfil", path: "/profile", icon: <FaUser /> },
    { name: "Atividades", path: "/activities", icon: <FaLeaf /> },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton
            asChild
            isActive={location.pathname === item.path}
          >
            <a href={item.path} className="flex items-center gap-2">
              {item.icon}
              {item.name}
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default MenuSidebar;
