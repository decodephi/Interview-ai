import { useContext, useEffect } from "react";
import { AuthContext } from "../services/auth.context";
import { Login, Register, Logout, getMe } from "../services/auth.api";

export const useAuth = () => {

    const context = useContext(AuthContext)

    const { user, loading, setUser, setLoading } = context

    // TODO: Add error handling and validation
    const handleLogin = async ({ email, password }) => {
        setLoading(true)

        
        try {
            const userData = await Login({ email, password })
            setUser(userData.user)
        } catch (error) {
            console.error("Login failed:", error)
        } finally {
            setLoading(false)
        }
    
    }

    // TODO: Add error handling and validation
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const userData = await Register({ username, email, password })
            setUser(userData.user)
        } catch (error) {
            console.error("Register failed:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
           const userData = await Logout()
            setUser(null)
        } catch (error) {
            console.error("Logout failed:", error)
        } finally {
            setLoading(false)
        }
    }   

    useEffect(()=>{
    
        const getAndSetUser = async()=>{
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
        }
        getAndSetUser()
    
    },[])
    
    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout
    }


}
