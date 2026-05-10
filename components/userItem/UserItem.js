// components/UserItem.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faInfoCircle,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function UserItem({ user, onInfo, onEdit, onDelete }) {
    return (
        <div className="user-item border border-gray-300 p-3 rounded-lg flex justify-between items-center">
            <div className="icon-name-role flex items-center gap-2">
                <div className="icon flex items-center justify-center bg-emerald-600 size-10 text-white rounded-lg text-xl">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="name-role">
                    <p className="name text-gray-800">{user.fullname}</p>
                    <p className="role text-gray-400 text-sm">{user.role}</p>
                </div>
            </div>
            <div className="btns-container flex items-center gap-2">
                <button
                    onClick={() => onInfo?.(user)}
                    className="info-btn cursor-pointer bg-blue-500 hover:bg-blue-600 text-white size-9 rounded-lg transition-colors"
                >
                    <FontAwesomeIcon icon={faInfoCircle} />
                </button>
                <button
                    onClick={() => onEdit?.(user)}
                    className="edit-btn cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white size-9 rounded-lg transition-colors"
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                    onClick={() => onDelete?.(user)}
                    className="delete-btn cursor-pointer bg-red-500 hover:bg-red-600 text-white size-9 rounded-lg transition-colors"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}
