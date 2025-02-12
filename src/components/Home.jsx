import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import TweetComposer from "./TweetComposer"
import TweetList from "./TweetList"
import SearchBar from "./SearchBar"

const Home = () => {
  const [tweets, setTweets] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const { token, logout, user } = useAuth()
  const [query, setQuery] = useState("")

  const fetchAllContent = async () => {
    if(searchResults.length > 0) {
      handleSearch(query)
      return
    }

    try {
      const [tweetsResponse, retweetsResponse] = await Promise.all([
        axios.get("http://localhost:3000/tweet/my-tweets", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3000/retweet/my-retweets", {
          headers: { Authorization: `Bearer ${token}` },
        })
      ])

      // sıralama
      const allContent = [...tweetsResponse.data, ...retweetsResponse.data].sort((a, b) => 
        new Date(b.startDate) - new Date(a.startDate)
      )

      setTweets(allContent)
    } catch (error) {
      console.error("Error fetching content:", error)
    }
  }

  useEffect(() => {
    fetchAllContent()
  }, [])
  
  const handleSearch = async (query) => {
    try {
      const [tweetsResponse, retweetsResponse] = await Promise.all([
        axios.get(`http://localhost:3000/tweet/findByUserId`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId: query }
        }),
        axios.get(`http://localhost:3000/retweet/findByUserId`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId: query }
        })
      ])

      //sıralama
      const allSearchResults = [...tweetsResponse.data, ...retweetsResponse.data].sort((a, b) => 
        new Date(b.startDate) - new Date(a.startDate)
      )

      setSearchResults(allSearchResults)
    } catch (error) {
      console.error("Error searching content:", error)
      setSearchResults([])
    }
  }

  return (
    <div className="container mx-auto px-4">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Twitter Lite</h1>
        <div className="flex items-center gap-4">
          <span className="font-medium">
            {user?.name} {user?.surname}
          </span>
          <button 
            onClick={logout} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>
      <SearchBar onSearch={handleSearch} setQuery={setQuery} query={query} />
      <TweetComposer onTweetPosted={fetchAllContent} />
      <TweetList 
        tweets={searchResults.length > 0 ? searchResults : tweets} 
        onUpdate={fetchAllContent}
      />
    </div>
  )
}

export default Home

