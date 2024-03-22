import moment from "moment/moment";
import "moment/locale/tr";
import Buttons from "./Buttons";

const Post = ({ tweet }) => {
  // tarihin günümüze göre kıyasını al
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  return (
    <div className="border-b py-6 px-3 border-[#2f3336] flex gap-3">
      <img
        src={tweet.user.photo}
        className="w-12 h-12 rounded-full"
        alt={tweet.user.name}/>

      <div className="w-full">
        {/* üst kısım */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <p className="font-semibold">{tweet.user.name}</p>
            <p className="text-gray-400 text-sm">@{tweet.user.name.toLowerCase().split(" ").join("_")}</p>
            {/* split(" ") ile boşluklara göre böldük, join("_") ile boşluk kısımlarının yerine ne koyalım da birleştirelim onu belirledik. */}
            <p className="text-gray-400 text-sm">{date}</p>
            {tweet.isEdited && (
              <p className="text-gray-400 text-xs">*Düzenlendi</p>
            )}
          </div>

          <button>|||</button>
        </div>

        {/* orta kısım */}
        <div className="my-6">
          {tweet.textContent && <p>{tweet.textContent}</p> }
          {tweet.imageContent && <img src={tweet.imageContent} className="max-h-[400px] object-cover rounded-md w-full my-[10px]" alt="tweet-img" /> }
        </div>

        {/* alt kısım */}
        <Buttons likeCount={tweet.like.length} />
      </div>
    </div>
  );
};

export default Post;
