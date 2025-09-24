import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DesktopSidebar from "./DesktopSidebar"
import { Outlet } from 'react-router-dom';

const  Layout= () => {
  return (
    <SidebarProvider>
      <DesktopSidebar />
      <main>
        <SidebarTrigger />
      </main>
      <Outlet/>
      
      
    </SidebarProvider>
  )
}
export default Layout;