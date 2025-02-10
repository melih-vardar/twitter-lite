const Tweet = ({ tweet }) => {
  return (
    <div className="border-b border-gray-200 p-4">
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
      <p>{tweet.content}</p>
      <div className="mt-2 text-gray-500">
        <span className="mr-4">{tweet.likes?.length || 0} Likes</span>
        <span>{tweet.comments?.length || 0} Comments</span>
      </div>
    </div>
  )
}

export default Tweet

