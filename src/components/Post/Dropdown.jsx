import { FiEdit2 } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";

const Dropdown = ({ handleDelete, handleEdit }) => {
  return (
    <label className="popup">
      <input type="checkbox" />
      <div className="burger" tabIndex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className="popup-window">
        <legend>Actions</legend>
        <ul>
          <li>
            <button onClick={handleEdit}>
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
