import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import TweetComposer from "./TweetComposer"
import TweetList from "./TweetList"
import SearchBar from "./SearchBar"

const Home = () => {
  const [tweets, setTweets] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const { token, logout } = useAuth()

  useEffect(() => {
    fetchTweets()
  }, [])

  const fetchTweets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tweet/my-tweets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTweets(response.data)
    } catch (error) {
      console.error("Error fetching tweets:", error)
    }
  }

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/tweet/findByUserId`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId: query },
      })
      setSearchResults(response.data)
    } catch (error) {
      console.error("Error searching tweets:", error)
    }
  }

  return (
    <div className="container mx-auto px-4">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Twitter Lite</h1>
        <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </header>
      <SearchBar onSearch={handleSearch} />
      <TweetComposer onTweetPosted={fetchTweets} />
      <TweetList tweets={searchResults.length > 0 ? searchResults : tweets} />
    </div>
  )
}

export default Home

