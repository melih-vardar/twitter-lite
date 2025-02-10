import { useState } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"

const TweetComposer = ({ onTweetPosted }) => {
  const [content, setContent] = useState("")
  const { token } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        "http://localhost:3000/tweet",
        { content },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      setContent("")
      onTweetPosted()
    } catch (error) {
      console.error("Error posting tweet:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
        rows={3}
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Tweet
      </button>
    </form>
  )
}

export default TweetComposer

