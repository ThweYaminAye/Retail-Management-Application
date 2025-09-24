import { Calendar, Inbox, Search } from "lucide-react"
import { Link } from "react-router-dom"
import useAuth from "@/hooks/useAuth"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const adminItems = [
  {
    title: "Shop",
    url: "/products",
    icon: Inbox,
  },
  {
    title: "Stock",
    url: "/stock",
    icon: Calendar,
  },
  {
    title: "Sale Reports",
    url: "/sale",
    icon: Search,
  },
]
const userItems = [
  {
    title: "Shop",
    url: "/products",
    icon: Inbox,
  },
  {
    title: "Contact",
    url: "#",
    icon: Calendar,
  },
  {
    title: "About",
    url: "#",
    icon: Search,
  },
]


const  DesktopSidebar = () =>{
  const {isAuthRole} = useAuth()
  const renderItems = isAuthRole === 'admin'? adminItems : userItems
    
  return (
      <Sidebar className="mt-20">
      <SidebarContent className="bg-indigo-200 ">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                  <Link to={item.url}> 
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    )
}
export default DesktopSidebar;


