import { FiMessageCircle } from "react-icons/fi";
import { FaRetweet } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const Buttons = ( {likeCount} ) => {
  return (
    <div>
        <div>
        <FiMessageCircle />
        <FaRetweet />
        <FaRegHeart />
        </div>
    </div>
  )
}

export default Buttons