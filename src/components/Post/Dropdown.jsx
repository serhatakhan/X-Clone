import { FiEdit2 } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { useRef } from "react";

const Dropdown = ({ handleDelete, handleEdit }) => {

  // * dropdown açıldıktan sonra içindekileri seçince kapanmıyordu.
  // * konsolda bu dropdownı incelediğimizde checkbox yapısına sahip olduğunu, 
  // aslında dropdown'a tıkladığımızda checkboxın tiklendiğini anlıyoruz. checkbox'ın tikli
  // olup olmama değerine göre açılıp kapanıyor. Düzenleye tıklandıktan sonra kapanmasını
  // istiyoruz. bunu state tutarak da yapabiliriz ya da inputun referasının 
  // alacağız ve bu ref üzerinden inputa erişeceğiz:
  const inputRef = useRef()

  return (
    <label className="popup">
      <input ref={inputRef} type="checkbox" />
      <div className="burger" tabIndex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className="popup-window">
        <ul>
          <li>
            <button onClick={()=> {
              handleEdit();
              inputRef.current.checked = false
              }}>
              <FiEdit2 />
              <span>Düzenle</span>
            </button>
          </li>
          <hr />
          <li>
            <button onClick={handleDelete}>
              <FaTrashAlt />
              <span>Sil</span>
            </button>
          </li>
        </ul>
      </nav>
    </label>
  );
};

export default Dropdown;
