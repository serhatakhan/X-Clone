import { BsFillDoorOpenFill } from "react-icons/bs";
import { navSections } from "../../constants";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

const Nav = ( {user} ) => {

  return (
    <div className="flex flex-col justify-between items-center h-screen p-2">
      <div>
        <img src="/x-logo.webp" alt="x-logo" className="w-14 mb-3" />

        {navSections.map((item, index) => (
          <div key={index} className="flex items-center text-2xl gap-3 mb-3 px-4 py-2 cursor-pointer rounded-xl transition hover:bg-[#2a2a2a]">
            {item.icon}
            <span className="max-lg:hidden whitespace-nowrap text-xl">{item.title}</span>
            {/* 1024px in altında ikonların yazıları displayi none olsun */}
          </div>
        ))}

        <button type="submit" className="bg-blue-500 my-5 max-lg:hidden flex items-center justify-center px-4 py-2 w-full min-h-[50px] rounded-full transition hover:bg-blue-600">Gönder</button>
      </div>



      {/* kullanıcı bilgileri */}
      <div>
        {!user ? (
        <div className="w-11 h-11 bg-gray-600 rounded-full animate-pulse" />
        ) : (
            <div className="flex flex-col gap-5 mb-2">
                <div className="flex justify-center items-center gap-2">
                    <img className="w-11 h-11 rounded-full" src={user?.photoURL} alt="pic" />
                    <p className="max-lg:hidden">{user?.displayName}</p>
                </div>
                <button onClick={()=> signOut(auth)} className="flex justify-center gap-2 p-1 items-center bg-zinc-800 transition hover:bg-zinc-900 rounded text-2xl md:text-[15px]">
                    <BsFillDoorOpenFill />
                    <span className="max-lg:hidden">Çıkış Yap</span>
                </button>
            </div>
        ) }
      </div>
    </div>
  );
};

export default Nav;
