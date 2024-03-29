import { useEffect, useState } from "react"
import { collection, count, onSnapshot, query } from 'firebase/firestore';
import { db } from './../../firebase/config';
import { IoSearchOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";

const Aside = () => {
  // gelen uzunluğu state'e aktar
  const [tweetsCount, setTweetsCount] = useState(0)

  useEffect(() => {
    const tweetsCol = collection(db, "twits")

    const q = query(tweetsCol, count())

    onSnapshot(q, (snapshot)=> {
      setTweetsCount(snapshot.size)
    })

  }, [])
  
  return (
    // 1024px altında görünmesin 
    <div className="max-lg:hidden p-4 px-12 ">

      <div className="relative">
        <input type="text" placeholder="Ara" className="bg-[#202327] py-3 px-4 ps-12 rounded-full w-full placeholder:text-[#71767b] outline-none border-none" />
        <IoSearchOutline className="absolute top-[14px] left-5" color="#71767b" size={20} />
      </div>

      <div className="mt-4 bg-[#202327] p-4 rounded-2xl">
        <h1 className="font-bold text-2xl">Premium'a Abone Ol</h1>
        <p className="my-2 mb-3 text-[16px] font-normal">Yeni özellikleri açmak için abone ol ve uygun olman durumunda reklam geliri payı kazan.</p>
        <button type="submit" className="bg-blue-500 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-600">Abone Ol</button>
      </div>

      <div className="mt-4 bg-[#202327] p-4 rounded-2xl">
        <h1 className="font-bold text-xl">İlgini Çekebilecek Gündemler</h1>

        <div className="mt-5">
          <div className="flex justify-between">
            <p className="text-[#71767b] text-sm font-medium">Türkiye tarihinde gündemde</p>
            <span><IoIosMore color="#71767b" size={21} /></span>
          </div>
          <p className="font-bold">#ÇetinTekindor</p>
        </div>

        <div className="mt-5">
          <div className="flex justify-between">
            <p className="text-[#71767b] text-sm font-medium">Spor · Gündemdekiler</p>
            <span><IoIosMore color="#71767b" size={21} /></span>
          </div>
          <p className="font-bold">Galatasaray - Hatayspor</p>
          <p className="text-xs font-semibold text-[#71767b]">2.820 posts </p>
        </div>

        <div className="mt-5">
          <div className="flex justify-between">
            <p className="text-[#71767b] text-sm font-medium">Spor · Gündemdekiler</p>
            <span><IoIosMore color="#71767b" size={21} /></span>
          </div>
          <p className="font-bold">Real Madrid</p>
          <p className="text-xs font-semibold text-[#71767b]">51,5 B posts </p>
        </div>

        <div className="mt-5">
          <div className="flex justify-between">
            <p className="text-[#71767b] text-sm font-medium">Eğlence · Gündemdekiler</p>
            <span><IoIosMore color="#71767b" size={21} /></span>
          </div>
          <p className="font-bold">#Gaddar</p>
        </div>

        <div className="mt-5">
          <div className="flex justify-between">
            <p className="text-[#71767b] text-sm font-medium">Türkiye tarihinde gündemde</p>
            <span><IoIosMore color="#71767b" size={21} /></span>
          </div>
          <p className="font-bold">#dolar</p>
          <p className="text-xs font-semibold text-[#71767b]">9.729 posts </p>
        </div>

        <div className="mt-5">
          <div className="flex justify-between">
            <p className="text-[#71767b] text-sm font-medium">Spor · Gündemdekiler</p>
            <span><IoIosMore color="#71767b" size={21} /></span>
          </div>
          <p className="font-bold">Kulüpler Birliği</p>
          <p className="text-xs font-semibold text-[#71767b]">2.903 posts </p>
        </div>
      </div>

      <div className="flex flex-wrap whitespace-nowrap gap-[9px] p-1 mt-2">
        <p className="hover:underline text-sm text-[#71767B] cursor-pointer">Hizmet Şartları</p>
        <p className="hover:underline text-sm text-[#71767B] cursor-pointer">Gizlilik Politikası</p>
        <p className="hover:underline text-sm text-[#71767B] cursor-pointer">Çerez Politikası</p>
        <p className="hover:underline text-sm text-[#71767B] cursor-pointer">Imprint</p>
        <p className="hover:underline text-sm text-[#71767B] cursor-pointer">Erişilebilirlik</p>
        <p className="hover:underline text-sm text-[#71767B] cursor-pointer">Reklam bilgisi</p>
        <p className="hover:underline text-sm text-[#71767B] cursor-pointer">| 2024 &copy; Serhat Akhan</p>
      </div>

      <span className="text-md font-normal p-1 mt-3 text-[#95989b]">Gönderi sayısı: {tweetsCount}</span>
    </div>
  )
}

export default Aside