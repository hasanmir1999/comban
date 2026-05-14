// components/UserItem.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faInfoCircle,
    faPenToSquare,
    faTrash,
    faEllipsisVertical,
    faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function UserItem({
    user,
    onInfo,
    onEdit,
    onDelete,
    openMenuId,
    setOpenMenuId,
}) {
    const btnMenuStatus = openMenuId === user.id;
    const toggleMenu = () => {
        setOpenMenuId(btnMenuStatus ? null : user.id);
    };
    return (
        <>
            {btnMenuStatus && (
                <div
                    onClick={() => setOpenMenuId(null)}
                    className="filter-for-btn-menu fixed w-full h-full top-0 right-0"
                ></div>
            )}
            <div className="user-item border border-gray-300 p-3 rounded-lg flex justify-between items-center">
                <div className="icon-name-role min-w-0 flex items-center gap-2">
                    <div className="icon flex items-center justify-center bg-emerald-600 size-10 text-white rounded-lg text-xl">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="name-role flex flex-col gap-1 min-w-0">
                        <p className="name text-gray-800 text-sm sm:text-base truncate">
                            {user.fullname}
                        </p>
                        <p className="role text-gray-400 text-xs sm:text-sm truncate">
                            {user.role}
                        </p>
                    </div>
                </div>
                <div
                    onClick={toggleMenu}
                    className="res-btn-menu cursor-pointer relative sm:hidden text-emerald-600 flex justify-center items-center"
                >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                    <div
                        className={`btn-menu ${btnMenuStatus ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} transition-all duration-300 absolute gap-3 flex items-center bottom-6 bg-gray-100 shadow-md p-2 rounded-2xl left-3`}
                    >
                        <FontAwesomeIcon
                            className="absolute text-gray-100 left-0 top-6"
                            icon={faPlay}
                        />
                        <button
                            onClick={() => onInfo?.(user)}
                            className="info-btn cursor-pointer flex justify-center items-center text-blue-500"
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </button>
                        <button
                            onClick={() => onEdit?.(user)}
                            className="edit-btn cursor-pointer flex justify-center items-center text-yellow-500"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button
                            onClick={() => onDelete?.(user)}
                            className="delete-btn cursor-pointer flex justify-center items-center text-red-500"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
                <div className="btns-container hidden sm:flex items-center gap-2">
                    <button
                        onClick={() => onInfo?.(user)}
                        className="info-btn cursor-pointer flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white size-9 rounded-lg transition-colors"
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                    <button
                        onClick={() => onEdit?.(user)}
                        className="edit-btn cursor-pointer flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 text-white size-9 rounded-lg transition-colors"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                        onClick={() => onDelete?.(user)}
                        className="delete-btn cursor-pointer flex justify-center items-center bg-red-500 hover:bg-red-600 text-white size-9 rounded-lg transition-colors"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
        </>
    );
}
