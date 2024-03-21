import Nav from "./Nav";
import Main from "./Main";
import Aside from "./Aside";
import { auth } from "../../firebase/config";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const FeedPage = () => {
  // kullanıcı verilerini state'e aktar
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    // * kullanıcı oturum açtığı anda anlık olarak kullanıcıyı izleyip bilgilerini alabiliyoruz.
    // unsub isimli fonksiyonu biz oluşturduk, açıklaması aşağıda.
    const unsub = onAuthStateChanged(auth, (user)=>{
      setUser(user)
    })

    // * kullanıcı /home sayfasından ayrıldığında onAuthStateChanged metodunun
    // sürekli kullanıcı oturumunu izleme olayını iptal ediyoruz. (performans +)
    return ()=> unsub()
  }, [])

  /* onAuthStateChanged ile kullanıcıyı izleyip durumu state'e aktardık
  böylelikle state değiştiğinde kullanıcının bilgilerine erişebildik */

  return (
    <section className="feed h-screen bg-black overflow-hidden">
      {/* kullanıcının bilgileri bize lazım o yüzden prop olarak yolladık */}
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </section>
  );
};

export default FeedPage;














/** YETKİLENDİRME İÇİN TERCİH EDİLMEYEN YOL **
 // kullanıcı var mı yok mu state'i, yani oturum açmış mı?
    const [isAuth, setIsAuth] = useState()

    useEffect(() => {
        // * kullanıcı oturumundaki değişimleri izler onAuthStateChanged fonksiyonu.
        // * bu onAuthStateChanged fonksiyonu aldığı fonksiyon parametresiyle, kullanıcı her hesap
        // açtığında veya mevcut hesaptan çıkış yaptığında kullanıcıyla alakalı bilgileri verir.
      onAuthStateChanged(auth, (user)=>{
        if(user){
            // kullanıcı varsa yetki state'ini true'ya çek
            setIsAuth(true)
        }else {
            // kullanıcı yoksa yetki state'ini false'a çek
            setIsAuth(false)
        }
      })
    }, [])

    // eğer yetkisi yoksa ekrana bunu bas
    if(isAuth === false) {
        return <h1 className="text-4xl text-center">yetkiniz yok</h1>
    }
*/
