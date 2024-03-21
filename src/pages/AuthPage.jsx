import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { auth, provider } from './../firebase/config';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  // kullanıcı giriş yap modunda mı yoksa kaydol modunda mı (başta kaydol modunda değil, giriş yap modunda olsun o yüzden false)
  const [isSignUp, setIsSignUp] = useState(false)
  // inputlardaki verileri(email ve şifreyi) bu projede state'de tuttuk. neden handleSubmit içinde yapmadık?
  // -> kullanıcıya mail gönderme işlemi de yapacağız. o yüzden sadece giriş yap butonuna tıklanınca değil, kullanıcı bu sayfadayken her an bizim kullanıcının inputa girdiği verileri bilmemiz gereko yüzden state'de tuttuk
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  // şifre yanlış girildinde ortaya çıkan şifreyi unuttum butonu için state tut
  const [isError, setIsError] = useState()


  const navigate = useNavigate()


  const handleSubmit = (e)=>{
    e.preventDefault()

    if(isSignUp){
        // eğer KAYDOLMA modundaysa
        createUserWithEmailAndPassword(auth, email, pass)
        .then(()=> {
            toast.info("Hesabınız oluşturuldu")
            // hesap oluşturulduktan sonra home sayfasına yolla
            navigate("/home")
        })
        .catch((err)=> toast.error(err.message))

    }else {
        //eğer GİRİŞ YAP modundaysa
        signInWithEmailAndPassword(auth, email, pass)
        .then(()=> {
            toast.info("Giriş başarılı")
            navigate("/home")
        })
        .catch((err)=> {
            toast.error(err.message)
            // bunu true'ya çektik ki şifreyi unuttum ekranını yapabilelim(hatanın olup olmadığını state'de tutuyoruz)
            setIsError(true)
        })
    }
  }

  // şifre sıfırlama maili gönder
  const sendEmail = ()=>{
    sendPasswordResetEmail(auth, email)
    .then(()=> {
        toast.info("Eposta adresinize şifre sıfırlama bağlantısı gönderildi")
    })
  }

  // google ile gir
  const handleGoogle = ()=>{
    signInWithPopup(auth, provider)
    .then(()=> {
        toast.success("Giriş başarılı")
        navigate("/home")
    })
  }

  return (
    <section className="h-screen grid place-items-center">
        <div className="bg-black flex flex-col gap-8 py-10 px-32 rounded-lg">
            <div className="flex justify-center">
                <img className="h-[62px]" src="x-logo.webp" alt="x" />
            </div>

            <h1 className="text-center font-bold text-2xl">X'e giriş yap</h1>

            <button onClick={handleGoogle} className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-200">
                <img className="h-[20px]" src="/google-logo.svg" alt="google" />
                <span className="text-black whitespace-nowrap">Google ile oturum açın</span>
                {/* whitespace-nowrap --> yazının alt alta gelmemesi için verdik */}
            </button>

            <div className="relative">
                <hr className="h-[1.4px] border-0 bg-[#333639]" />
                <div className="bg-black absolute p-2 top-[-21px] left-[111px]">veya</div>
            </div>

            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label>Email</label>
                <input onChange={(e)=> setEmail(e.target.value)} className="bg-transparent border-2 border-[#333639] rounded-md mt-1 p-2 focus:outline-none focus:border-[#1c9bef] focus:ring-[#1c9bef] focus:ring-1 placeholder:text-[#71767A]" type="email" placeholder="E-mailinizi yazınız" />
                {/* şifre her değiştiğinde şifreyi alak için setEmail(e.target.value) */}

                <label className="mt-5">Şifre</label>
                <input onChange={(e)=> setPass(e.target.value)} className="bg-transparent border-2 border-[#333639] rounded-md mt-1 p-2 focus:outline-none focus:border-[#1c9bef] focus:ring-[#1c9bef] focus:ring-1 placeholder:text-[#71767A]" type="password" placeholder="Şifrenizi giriniz" />

                <button className="mt-8 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-200" type="submit">{isSignUp ? "Kaydol" : "Giriş Yap"}</button>

                <p className="mt-5" onClick={()=> setIsSignUp(!isSignUp)}>
                    <span className="text-gray-500">{isSignUp ? "Zaten bir hesabın var mı?" : "Henüz bir hesabın yok mu?"}</span>
                    <span className="text-blue-500 cursor-pointer hover:underline ms-1">{isSignUp ? "Giriş Yap" : "Kaydol"}</span>
                </p>
            </form>

            {!isSignUp && isError && <button onClick={sendEmail} className="text-center text-red-500 cursor-pointer hover:underline">Şifrenizi mi unuttunuz?</button> }
        </div>
    </section>
  )
}

export default AuthPage