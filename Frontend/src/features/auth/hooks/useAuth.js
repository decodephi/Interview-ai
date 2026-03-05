import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { Login, Register, Logout, getMe } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext)

    const { user, loading, setUser, setLoading } = context

    
    const handleLogin = async ({ email, password }) => {
        setLoading(true)

        
        try {
            const userData = await Login({ email, password })
            setUser(userData)
        } catch (error) {
            console.error("Login failed:", error)
        } finally {
            setLoading(false)
        }
    
    }
}
