import { AiOutlineMail } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { IoSearch, IoHomeSharp } from "react-icons/io5";
import { CgProfile, CgMoreO } from "react-icons/cg";
import { RiFileListLine } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa6";

export const navSections = [
  {
    title: "Anasayfa",
    icon: <IoHomeSharp />,
  },
  {
    title: "Keşfet",
    icon: <IoSearch />,
  },
  {
    title: "Bildirimler",
    icon: <FaRegBell />,
  },
  {
    title: "Mesajlar",
    icon: <AiOutlineMail />,
  },
  {
    title: "Listeler",
    icon: <RiFileListLine />,
  },
  {
    title: "Yer İşaretleri",
    icon: <BsBookmark />,
  },
  {
    title: "Profil",
    icon: <CgProfile />,
  },
  {
    title: "Daha Fazla",
    icon: <CgMoreO />,
  },
];
