import { createContext, useState, useContext, useEffect } from "react"
import {jwtDecode} from "jwt-decode"
import axios from "axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)

  const fetchUserWithToken = async (username, currentToken) => {
    if (!currentToken) {
      console.error("No token available")
      return
    }
    
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${username}`,
        { 
          headers: { 
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json'
          }
        }
      )
      setUser(response.data)
    } catch (error) {
      console.log("Full error response:", error.response)
      logout()
    }
  }

  const fetchUser = async (username) => {
    await fetchUserWithToken(username, token)
  }

  const login = async (newToken) => {
    if (!newToken) {
      console.error("No token provided to login")
      return
    }

    try {
      const decoded = jwtDecode(newToken)
      
      setToken(newToken)
      localStorage.setItem("token", newToken)
      await fetchUserWithToken(decoded.sub, newToken)
    } catch (error) {
      console.error("Login error:", error)
      logout()
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken)
        setToken(storedToken)
        fetchUser(decoded.sub)
      } catch (error) {
        console.error("Invalid token:", error)
        logout()
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
 
  return context
}

