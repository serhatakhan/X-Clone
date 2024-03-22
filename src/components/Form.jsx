import { GrImage } from "react-icons/gr";
import { AiOutlineFileGif } from "react-icons/ai";
import { MdChecklist } from "react-icons/md";
import { FaRegFaceSmile } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Loader from "./Loader";

const Form = ( {user} ) => {
  // tweeti attıktan sonra yüklenme simgesi için state tut
  const [isLoading, setIsLoading] = useState(false)


  // tweetler koleksiyonunun referansını al(bunudaha sonra yine kullanacağız)
  const tweetsCol = collection(db, "twits")


  /* RESİM, MÜZİK, VİDEO AYNI YOLLA BU YÖNTEMLE STORAGE'A KAYDEDEBİLİYORUZ */
  // * dosya resim ise, resmi storage'a yükle ve resmin url'ini
  // fonksiyonun çağırıldığı yere döndür
  const uploadImage = async (file)=> {

    // 1) yüklenen dosya resim değilse fonksiyonu durdur (type, image kelimesiyle başlıyor mu? bunu kontrol etmemiz lazım. js'nin startsWith metoduyla. bir metin yazılan kelimeyle başlıyor mu? bunu kontrol etmeyi sağlar.) includes de olur
    // --> resim yoksa veya resim varsa ve image ile başlamıyorsa dedik.
    if(!file || !file.type.startsWith("image")){
      return null
    }

    // 2) dosyanın yükleneceği konumun referansını alma (aynı isimli görselleri yüklemeyip sadece bir tane gösterdiğinden başına id koyarak artık aynı resimlerinde yüklenebilmesini sağlıyoruz.)
    const fileRef = ref(storage, v4() + file.name)

    // 3) referansını oluşturduğumuz konuma dosyayı yükle
    await uploadBytes(fileRef, file)

    // 4) yüklenen dosyanın url'ine eriş ve döndür
    return await getDownloadURL(fileRef)
  }
  

  const handleSubmit = async (e)=>{
    e.preventDefault()

    // 1) inputlardaki verilere eriş (yani kullanıcının ne yazdığına ve hangi resmi seçtğinin verisi)
    const textContent = e.target[0].value
    // --> files, dosya seçebildiğimiz inputlarda seçilen dosyaya erişmemizi sağlar. dizi şeklindedir. kullanıcı birden fazla eleman seçebilsin diye. şu an birden fazla seçemiyoruz bunun için forma multi veya muştiple özelliği verilebilir.
    const imageContent = e.target[1].files[0]
    
    // 2) yazı ve resim içeriği yoksa uyarı ver (ikisinden birinin doldurulması yeterli yani)
    if(!textContent && !imageContent){
      return toast.info("Lütfen içerik giriniz")
    }
    
    // yüklenme state'ini true'ya çek handleSubmit çalıştığında.
    // burada yaptık çünkü hiçbir şey girilmeyip göndere tıklandığı senaryoda, bir üstteki if çalışac ve uyarı verecek, aşağıdaki setIsLoading(false)'a gitmeyecekti. burada yaparak en başta yükleniyor çıkmasını engellemiş olduk
    setIsLoading(true)

    try {
      // 3) resmi storage'a yükle
      const url = await uploadImage(imageContent)
  
      // 4) yeni twit dökümanını koleksiyona ekle (veritabanına kaydetmiş olduk)
      await addDoc(tweetsCol, {
        textContent, 
        imageContent: url,
        createdAt: serverTimestamp(),
        like: [],
        isEdited: false,
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL 
        }
      })
    } catch (err) {
      console.log(err)      
    }

    // yüklenme state'ını false'a çek. artık yüklenme bitiyor
    setIsLoading(false)

    // 5) formu temizle
    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 border border-[#2f3336] p-4">
        <img className="w-12 h-12 rounded-full mt-1 " src={user?.photoURL} alt={user?.displayName} />

        <div className="w-full">
            <input className="w-full bg-transparent my-2 outline-none md:text-lg" placeholder="Neler Oluyor?" type="text" />

            <div className="flex justify-between">
                {/* ikonu label içine aldık. htmlFor kısmını aşağıdaki inputun id'si ile aynı yapınca
                artık bu butona tıklanınca dosay yüklenme ekranı açılabiliyor. inputun görünümünü gizleyebiliyoruz */}
                <label className="flex gap-[18px] mt-4 cursor-pointer" htmlFor="image">
                    <GrImage color="#1d9bf0" size={17} />
                    <AiOutlineFileGif color="#1d9bf0" size={17} />
                    <MdChecklist color="#1d9bf0" size={18} />
                    <FaRegFaceSmile color="#1d9bf0" />
                    <SlCalender color="#1d9bf0" />
                    <IoLocationOutline color="#1d9bf0" size={19} />
                </label>
                
                <input type="file" id="image" className="hidden" />
                {/* input tipini file yaptık ki dosya yükleyebilelim */}

                <button type="submit" className="bg-blue-500 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-600">{isLoading ? <Loader styles={`!text-white`} /> : "Gönder"}</button>
                {/* styles={`!text-white`} ! koyduk çünkü bunu ezen başka bir stil vardı. bu olsun diye direttik o yüzden ! */}
            </div>
        </div>
    </form>
  )
}

export default Form