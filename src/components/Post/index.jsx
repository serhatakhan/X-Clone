import moment from "moment/moment";
import "moment/locale/tr";
import Buttons from "./Buttons";
import { auth, db } from './../../firebase/config';
import Dropdown from "./Dropdown";
import { deleteDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { toast } from "react-toastify";

const Post = ({ tweet }) => {
  console.log(tweet)
  // tarihin günümüze göre kıyasını al
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  // oturumu açık olan kullanıcı tweet'in like dizisinde var mı?
  const isLiked = tweet.like.includes(auth.currentUser.uid)


  //console.log(auth.currentUser.uid)  // oturumu açık olan kullanıcının id'si
  //console.log(tweet.user.id)         // tweeti atan kullanıcının id'si

  
  // tweeti kaldır
  const handleDelete = async ()=> {
    // kaldırılacak dökümanın referasını al
    const tweetRef = doc(db, "twits", tweet.id)

    // dökümanı kaldır (then-catch kullanmasaydık try catch kullanırdık / await olan her yerde bunu yapmalıyız)
    deleteDoc(tweetRef)
    .then(()=> toast.warn("Tweet akıştan kaldırıldı"))
    .catch(()=> toast.danger("Tweet kaldırılırken sorun oluştu"))
  }

  //tweet'i like'la
  const handleLike = async ()=>{
    // güncellenecek dökümanın referansını alma
    const tweetRef = doc(db, "twits", tweet.id)

      // dökümanı güncelle
      // like'layan kullanıcının id'sini like dizisine ekle
      updateDoc(tweetRef, {
        like: isLiked 
        ? arrayRemove(auth.currentUser.uid)  // like varsa like'ı kaldır
        : arrayUnion(auth.currentUser.uid),  // like yokse ekle
      })
  }


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
        
          {/* oturumu açan kullanıcı ile tweeti atan kullanıcı aynı ise düzenleme yapabilsin. yoksa herkes her tweeti düzenleyebiliyor. böyle olmamalı. */}
          {tweet.user.id === auth.currentUser.uid && <Dropdown handleDelete={handleDelete} /> }
        </div>

        {/* orta kısım */}
        <div className="my-6">
          {tweet.textContent && <p>{tweet.textContent}</p> }
          {tweet.imageContent && <img src={tweet.imageContent} className="max-h-[400px] object-cover rounded-md w-full my-[10px]" alt="tweet-img" /> }
        </div>

        {/* alt kısım */}
        <Buttons likeCount={tweet.like.length} handleLike={handleLike} isLiked={isLiked} />
      </div>
    </div>
  );
};

export default Post;
