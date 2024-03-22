import { useEffect, useState } from "react"
import Form from "../../components/Form"
import Post from "../../components/Post"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/config"
import Loader from "../../components/Loader"

const Main = ( {user} ) => {
  // onSnapShot sonunda elde ettiğimiz verileri kullanmak için state'e aktar
  const [tweets, setTweets] = useState()

  // veriler sürekli güncellendiği için twitterda, useEffect kullandık
  useEffect(() => {
    // verileri canlı olarak almak için abone olunacak koleksiyonun referansı
    const collectionRef = collection(db, "twits")

    // koleksiyondaki verileri canlı olarak al
    const unsub = onSnapshot(collectionRef, (snapshot)=> {

      // chat-app deki gibi dizi oluştur
      const tempTweets = []

      // doc.data() ile bilgilere riştik ama id yok. id eklemek için bu şekilde yaptık, id'de doc içinde var. oradan aldık.
      // sonra bu elde ettiğimiz verileri kullanabilmek için state'e aktar.
      snapshot.docs.forEach((doc)=> tempTweets.push({...doc.data(), id: doc.id}))

      // state'e aktar
      setTweets(tempTweets)
    })

    // kullanıcı ana sayfadan ayrıldığı zaman koleksiyonu izlemeyi bırak. (peformans +)
    return ()=> unsub()
  }, [])
  

  return (
    <div className="border border-[#2f3336] overflow-y-auto">
      <header className="p-4 font-bold border-b border-[#2f3336]">Anasayfa</header>

      <Form user={user} />

      {!tweets ? <Loader styles={`w-8 h-8 my-10`} /> : tweets.map((tweet)=> <Post key={tweet.id} tweet={tweet} />)}

    </div>
  )
}

export default Main