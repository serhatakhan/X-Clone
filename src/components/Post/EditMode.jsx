import { doc, updateDoc } from "firebase/firestore";
import { useRef } from "react";
import {BiSolidSave} from "react-icons/bi"
import {ImCancelCircle} from "react-icons/im"
import { db } from "../../firebase/config";

const EditMode = ({ tweet, close }) => {
    // * input formun içinde olmadığı için ve onSubmit özelliğini 
    // izlemediğimiz için e.target'ı kullanamayız. bu ikisi olursa e.target kullanabiliriz.
    const inputRef = useRef()

    const handleSave = async () => {
        // 1) inputun içeriğine eriş
        const newText = inputRef.current.value

        // 2) güncellenecek dökümanın referasını al
        const tweetRef = doc(db, "twits", tweet.id)

        // 3) dökümanın içeriğini güncelle (promise döndürdüğü için başına await, yukarda da async yazdık)
        await updateDoc(tweetRef, {
            // sadece güncellenecek olanları söylüyoruz. patch isteği gibi
            textContent: newText,
            isEdited: true
        })

        // 4) düzenleme modundan çık
        close()
    }

  return (
    <>
      <input ref={inputRef} type="text" defaultValue={tweet.textContent} className="bg-transparent border-2 border-[#333639] rounded p-1 px-2 focus:outline-none focus:border-[#1c9bef] focus:ring-[#1c9bef] focus:ring-1 placeholder:text-[#71767A]" />
      <button onClick={handleSave} className="mx-3 p-2 border border-zinc-500 text-green-400 hover:bg-zinc-700 transition rounded-lg shadow"> <BiSolidSave /> </button>
      <button onClick={close} className="p-2 border border-zinc-500 text-red-400 hover:bg-zinc-700 transition rounded-lg shadow" > <ImCancelCircle /> </button>
    </>
  );
};

export default EditMode;
