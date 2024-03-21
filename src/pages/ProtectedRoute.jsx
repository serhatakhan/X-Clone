import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = () => {
  // kullancının yetkisi var mı state'i
  const [isAuth, setIsAuth] = useState();

  // const navigate = useNavigate()

  useEffect(() => {
    // onAuthStateChanged -> kullanıcı oturumunun değişimini izler (açılma/kapanma)
    const unsub = onAuthStateChanged(auth, (user) => {
        // eğer oturum açtıysa yetkiyi true'ya, kapattıysa false'a çekiyoruz
        setIsAuth(user ? true : false)
    });

    //performans için. açıklaması index.jsx de !
    return ()=> unsub()
  }, []);

  // eğer kullanıcının yetkisi yoksa login'e yönlendir
  if (isAuth === false){
    // * useNavigate kullanınca, bileşen tam yüklenmeden yönlendirme yapmamızdan kaynaklı
    // olarak react uyarı veriyordu. bizde onun yerine <Navigate/> bileşeni kullandık.
    // * Navigate bileşenini kullanınca BrowserRouter, bileşenin yüklenme işlemini tamamlamış
    // gibi algılıyor ve to propu olarak tanımladığımız sayfaya yönlendiriyor.
    return <Navigate to={"/"} />
  }

  // * Bir kapsayıcı route'da, alt route'un bilgilerini göstermek istiyorsak
  // <Outlet/> bileşenini kullanacağız. Böylelikle alt route'ların verilerini görebiliyoruz.
  return <Outlet />;
};

export default ProtectedRoute;




/*
* useNavigate yerine neden Navigate bileşenini kullandık? sebebi şu:
* useNavigate bileşen ekrana basılmadan, ekrana basma işlemi daha yarıdayken bizi 
yönlendirmeye çalışıyor. Bundan dolayı BrowserRouter'ın kafası karışıyor ve konsolda hata
alıyorduk. 
* Navigate bileşenini kullandığımıda, yönelndirilen sayfanın yüklenmesi yerine diyoruz ki
farklı bir bileşen yüklensin bu bileşen de çok hafif olduğu için daha hızlı yükleniyor.
ve sayfa yüklenme işlemi diğerindeki gibi yarıda kalmıyor, sayfa yüklenme işleminin sonuna
gelmiş oluyoruz. yani sayfa yülenmiş gibi algılıyor react-router-dom. bundan dolayı işlem 
yarıda kalmış gibi algılamıyor.
*/
