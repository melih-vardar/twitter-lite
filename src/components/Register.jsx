import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from 'axios'

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const history = useHistory()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await axios.post("http://localhost:3000/users/register", formData)
      login(response.data.token)
      history.push("/")
    } catch (error) {
      console.error("Registration failed:", error)
      setError(error.response?.data?.errors || "Registration failed. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Create an account</h3>
        {error && (
          <div className="mt-2 text-red-600 text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="surname">Surname</label>
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password (min 8 characters)"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={formData.password}
                onChange={handleChange}
                minLength="8"
                required
              />
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <button
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                type="submit"
              >
                Register
              </button>
              <button
                className="px-6 py-2 text-blue-600 hover:underline"
                type="button"
                onClick={() => history.push("/login")}
              >
                Back to Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register 