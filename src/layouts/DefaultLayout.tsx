import Layout from "@/components/sidebar/Layout"
import DesktopNavbar from "@/components/navbar/DesktopNavbar"
import useAuth from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"

const DefaultLayout = () => {
    const { isAuthenticated } = useAuth()
	return !isAuthenticated ? (
		<Navigate to={"/auth/login"} replace />
	) : (
        
		<div className="h-svh flex overflow-hidden">
			<main className="w-full min-h-full overflow-y-auto">
                <DesktopNavbar/>
                <Layout/>
			</main>
		</div>
	)
}

export default DefaultLayout