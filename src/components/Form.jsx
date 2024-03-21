import { GrImage } from "react-icons/gr";
import { AiOutlineFileGif } from "react-icons/ai";
import { MdChecklist } from "react-icons/md";
import { FaRegFaceSmile } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";

const Form = ( {user} ) => {
  return (
    <form className="flex gap-3 border border-[#2f3336] p-4">
        <img className="w-12 h-12 rounded-full mt-1 " src={user?.photoURL} alt={user?.displayName} />

        <div className="w-full">
            <input className="w-full bg-transparent my-2 outline-none md:text-lg" placeholder="Neler Oluyor?" type="text" />

            <div className="flex justify-between">
                {/* ikonu label içine aldık. htmlFor kısmını aşağıdaki inputun id'si ile aynı yapınca
                artık bu butona tıklanınca dosay yüklenme ekranı açılabiliyor. inputun görünümünü gizleyebiliyoruz */}
                <label className="flex gap-4 mt-4 cursor-pointer" htmlFor="image">
                    <GrImage color="#1d9bf0" size={17} />
                    <AiOutlineFileGif color="#1d9bf0" size={17} />
                    <MdChecklist color="#1d9bf0" size={18} />
                    <FaRegFaceSmile color="#1d9bf0" />
                    <SlCalender color="#1d9bf0" />
                    <IoLocationOutline color="#1d9bf0" size={19} />
                </label>
                
                <input type="file" id="image" className="hidden" />
                {/* input tipini file yaptık ki dosya yükleyebilelim */}

                <button className="bg-[#1a8cd8] flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-500">Gönder</button>
            </div>
        </div>
    </form>
  )
}

export default Form