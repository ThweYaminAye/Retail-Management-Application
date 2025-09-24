import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export default function useAuth() {
	const token = Cookies.get("react-app-token")
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token)
	const [isAuthRole, setIsAuthRole] = useState<string>("")

	const userLogin = (token: string) => {
		setIsAuthenticated(true)
		Cookies.set("react-app-token", token)
	}

	const userLogout = () => {
		Cookies.remove("react-app-token")
		setIsAuthenticated(false)
    	setIsAuthRole("") 
	}
	useEffect(() => {
		if (token) {
		  const decodedToken = JSON.parse(atob(token.split(".")[1]));
		  setIsAuthRole(decodedToken.role || "");
		}
	  }, [token]);

	return { isAuthenticated, isAuthRole, userLogin, userLogout }
}


