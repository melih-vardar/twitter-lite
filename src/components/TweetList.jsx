import Tweet from "./Tweet"

const TweetList = ({ tweets, onUpdate }) => {
  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet 
          key={tweet.id} 
          tweet={tweet} 
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}

export default TweetList

