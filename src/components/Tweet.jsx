import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

const Tweet = ({ tweet, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(tweet.content)
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editedComment, setEditedComment] = useState("")
  const { token, user } = useAuth()
  const [showRetweetPopup, setShowRetweetPopup] = useState(false)
  const [quoteContent, setQuoteContent] = useState("")
  const [originalTweet, setOriginalTweet] = useState(null)

  const tweetId = tweet.id
  const isOwner = tweet.user.id === user?.id
  
  const isRetweet = tweet.originalTweetId !== undefined
  const originalTweetId = isRetweet ? tweet.originalTweetId : null

  const fetchOriginalTweet = async () => {
    if (tweet.originalTweetId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/tweet/findById`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { id: tweet.originalTweetId }
          }
        )
        setOriginalTweet(response.data)
      } catch (error) {
        console.error("Failed to fetch original tweet:", error)
      }
    }
  }

  useEffect(() => {
    fetchOriginalTweet()
  }, [tweet.originalTweetId])

  const handleEdit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/tweet/${tweetId}`,
        { content: editedContent },
        { headers: { Authorization: `Bearer ${token}` }}
      )
      
      setIsEditing(false)
      onUpdate()
    } catch (error) {
      console.error("Failed to edit tweet:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/tweet/${tweetId}`,
        { headers: { Authorization: `Bearer ${token}` }}
      )
      
      onUpdate()
    } catch (error) {
      console.error("Failed to delete tweet:", error)
    }
  }

  const handleLike = async (targetTweetId) => {
    try {
      await axios.post(
        "http://localhost:3000/like",
        { tweetId: targetTweetId },
        { headers: { Authorization: `Bearer ${token}` }}
      )
      
      onUpdate()
      
      if (isRetweet) {
        fetchOriginalTweet()
      }
    } catch (error) {
      console.error("Failed to like/unlike tweet:", error)
    }
  }

  const handleRetweet = async () => {
    try {
      await axios.post(
        "http://localhost:3000/retweet",
        { 
          originalTweetId: tweetId,
          quote: quoteContent
        },
        { headers: { Authorization: `Bearer ${token}` }}
      )
      
      setShowRetweetPopup(false)
      setQuoteContent("")
      onUpdate()
    } catch (error) {
      console.error("Failed to retweet:", error)
    }
  }

  const handleAddComment = async (targetTweetId) => {
    try {
      await axios.post(
        "http://localhost:3000/comment",
        { 
          tweetId: targetTweetId,
          content: newComment 
        },
        { headers: { Authorization: `Bearer ${token}` }}
      )
      
      setNewComment("")
      setShowCommentBox(false)
      
      onUpdate()
      
      if (isRetweet) {
        fetchOriginalTweet()
      }
    } catch (error) {
      console.error("Failed to add comment:", error)
    }
  }

  const handleEditComment = async (commentId) => {
    try {
      await axios.put(
        `http://localhost:3000/comment/${commentId}`,
        { content: editedComment },
        { headers: { Authorization: `Bearer ${token}` }}
      )
      setEditingCommentId(null)
      setEditedComment("")
      
      onUpdate()
    } catch (error) {
      console.error("Failed to edit comment:", error)
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:3000/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` }}
      )
      
      onUpdate()
    } catch (error) {
      console.error("Failed to delete comment:", error)
    }
  }

  const isLiked = tweet.likes?.some(like => like.user === user?.id)
  const isRetweeted = tweet.retweets?.some(retweet => retweet.user === user?.id)

  return (
    <div className="border-b border-gray-200 p-4">
      {isRetweet && (
        <p className="text-sm text-gray-500 mb-2">
          <span className="font-medium">{tweet.user.name} {tweet.user.surname}</span> retweeted
        </p>
      )}
      <div className="flex items-center mb-2">
        <img
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${tweet.user.name[0] + tweet.user.surname[0]}`}
          alt="avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <p className="font-bold">
            {tweet.user.name} {tweet.user.surname}
          </p>
          <p className="text-gray-500">@{tweet.user.username}</p>
        </div>
      </div>

      {isRetweet && tweet.quote && (
        <p className="mb-2">{tweet.quote}</p>
      )}

      {isEditing ? (
        <div className="mt-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="mt-2">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          {isRetweet ? (
            originalTweet ? (
              <div className="border rounded p-2 bg-gray-50">
                <div className="flex items-center mb-2">
                  <img
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${originalTweet.user.name[0] + originalTweet.user.surname[0]}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="font-bold">
                      {originalTweet.user.name} {originalTweet.user.surname}
                    </p>
                    <p className="text-gray-500 text-sm">@{originalTweet.user.username}</p>
                  </div>
                </div>
                <p>{originalTweet.content}</p>
              </div>
            ) : (
              <p>Loading..</p>
            )
          ) : (
            <p>{tweet.content}</p>
          )}
        </div>
      )}

      <div className="mt-2 flex items-center space-x-4 text-gray-500">
        {isRetweet ? (
          originalTweet ? (
            <>
              <button onClick={() => handleLike(originalTweet.id)}>
                {originalTweet.likes?.some(like => like.user === user?.id) ? 'Unlike' : 'Like'} 
                ({originalTweet.likes?.length || 0})
              </button>
              <button onClick={() => setShowCommentBox(!showCommentBox)}>
                Comment ({originalTweet.comments?.length || 0})
              </button>
              {!isOwner && (
                <button onClick={() => setShowRetweetPopup(true)}>
                  {originalTweet.retweets?.some(retweet => retweet.user === user?.id) ? 'Undo Retweet' : 'Retweet'}
                </button>
              )}
            </>
          ) : (
            <p>Loading..</p>
          )
        ) : (
          <>
            <button onClick={() => handleLike(tweet.id)}>
              {isLiked ? 'Unlike' : 'Like'} ({tweet.likes?.length || 0})
            </button>
            <button onClick={() => setShowCommentBox(!showCommentBox)}>
              Comment ({tweet.comments?.length || 0})
            </button>
            {!isOwner && (
              <button onClick={() => setShowRetweetPopup(true)}>
                {isRetweeted ? 'Undo Retweet' : 'Retweet'}
              </button>
            )}
            {isOwner && (
              <>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </>
            )}
          </>
        )}
      </div>

      {showCommentBox && (
        <div className="mt-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Write a comment..."
          />
          <button
            onClick={() => handleAddComment(isRetweet ? originalTweet.id : tweet.id)}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Comment
          </button>
        </div>
      )}

      {showRetweetPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h3 className="font-bold mb-2">Retweet with quote</h3>
            
            <div className="border rounded p-2 mb-3 bg-gray-50">
              <p className="font-medium">{tweet.user.name} {tweet.user.surname}</p>
              <p className="text-gray-600">{tweet.content}</p>
            </div>

            <textarea
              value={quoteContent}
              onChange={(e) => setQuoteContent(e.target.value)}
              placeholder="Add a comment"
              className="w-full p-2 border rounded mb-3"
              rows="3"
            />
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowRetweetPopup(false)
                  setQuoteContent("")
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRetweet}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retweet
              </button>
            </div>
          </div>
        </div>
      )}

      {(isRetweet ? originalTweet?.comments : tweet.comments)?.map(comment => (
        <div key={comment.id} className="mt-2 ml-8 p-2 bg-gray-50 rounded">
          <div className="flex items-center">
            <img
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${comment.user.name[0] + comment.user.surname[0]}`}
              alt="avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="flex-grow">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">
                    {comment.user.name} {comment.user.surname}
                  </p>
                  <p className="text-gray-500 text-sm">@{comment.user.username}</p>
                </div>
                <div>
                  {(comment.user.id === user?.id || isOwner) && (
                    <>
                      {comment.user.id === user?.id && (
                        <button
                          onClick={() => {
                            setEditingCommentId(comment.id)
                            setEditedComment(comment.content)
                          }}
                          className="text-blue-500 mr-2"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
              {editingCommentId === comment.id ? (
                <div className="mt-2">
                  <textarea
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <div className="mt-2">
                    <button
                      onClick={() => handleEditComment(comment.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-1">{comment.content}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Tweet

