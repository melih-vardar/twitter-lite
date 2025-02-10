import Tweet from "./Tweet"

const TweetList = ({ tweets }) => {
  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  )
}

export default TweetList

