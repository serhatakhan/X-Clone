import { FiMessageCircle } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc"
import { AiOutlineRetweet } from "react-icons/ai";
import { IoShareSocialOutline } from "react-icons/io5";

const Buttons = ({ likeCount, handleLike, isLiked }) => {
  return (
    <div className="flex justify-between">
      <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00c8ff63]">
        <FiMessageCircle size={17} />
      </div>

      <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00fd0046]">
        <AiOutlineRetweet size={18} />
      </div>

      <div onClick={handleLike} className="flex justify-center items-center gap-2 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#ff00d452]">
        {isLiked ? <FcLike size={17} /> : <FaRegHeart/> }
        <span>{likeCount}</span>
      </div>

      <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#80808062]">
        <IoShareSocialOutline size={18} />
      </div>
    </div>
  );
};

export default Buttons;
