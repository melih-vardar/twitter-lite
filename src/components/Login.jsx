import { useState } from "react"
import { useHistory, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const history = useHistory()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    
    try {
      const response = await axios.post("http://localhost:3000/users/login", { 
        username, 
        password 
      })
      login(response.data.token)
      history.push("/")
    } catch (error) {
      console.error("Login failed:", error)
      setError(error.response?.data?.errors || "Login failed. Please try again.")
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        {error && (
          <div className="mt-2 text-red-600 text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" type="submit">
                Login
              </button>
              <Link 
                to="/register"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

