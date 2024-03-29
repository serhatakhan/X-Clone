const Content = ({ tweet }) => {
  return (
    <>
      {tweet.textContent && <p>{tweet.textContent}</p>}

      {tweet.imageContent && (
        <img
          src={tweet.imageContent}
          className="max-h-[400px] object-cover rounded-md w-full my-[10px]"
          alt="tweet-img"/>)}
    </>
  );
};

export default Content;
