"use client";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faInfoCircle,
    faPenToSquare,
    faTrash,
    faEllipsisVertical,
    faPlay,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function UserItem({ user, openMenuId, setOpenMenuId }) {
    const queryClient = useQueryClient();
    const btnMenuStatus = openMenuId === user.id;

    const toggleMenu = () => {
        setOpenMenuId(btnMenuStatus ? null : user.id);
    };

    const deleteUserMutation = useMutation({
        mutationFn: async (userId) => {
            const response = await api.delete(`/api-v1/delete-user/${userId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });

            Swal.fire({
                title: "حذف شد!",
                text: "کاربر با موفقیت حذف شد.",
                icon: "success",
                confirmButtonText: "باشه",
            });
        },
        onError: (error) => {
            Swal.fire({
                title: "خطا!",
                text:
                    error.response?.data?.message ||
                    "مشکلی در حذف کاربر پیش آمد.",
                icon: "error",
                confirmButtonText: "باشه",
            });
        },
    });

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "آیا مطمئن هستید؟",
            text: "این عملیات قابل بازگشت نیست!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "تایید",
            cancelButtonText: "لغو",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            deleteUserMutation.mutate(user.id);
        }
    };

    const [showInfo, setShowInfo] = useState(false);

    return (
        <>
            <div
                className={`show-info-container flex items-center transition-all px-5 duration-300 ${showInfo ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} justify-center bg-gray-950/30 fixed w-full h-full top-0 right-0 z-10`}
            >
                <div className="show-info-box flex sm:items-center gap-5 relative bg-white p-5 rounded-lg w-200">
                    <button
                        onClick={() => setShowInfo(false)}
                        className="cursor-pointer text-gray-500 absolute left-5 top-6 border-2 border-emerald-600 flex justify-center items-center size-8 rounded-full"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    <div className="icon flex items-center justify-center bg-emerald-600 size-20 sm:size-50 text-white rounded-lg text-xl sm:text-4xl">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="text flex flex-col gap-3 flex-1 min-w-0">
                        <div className="text-box flex gap-2 items-center">
                            <p className="title text-sm sm:text-base text-gray-800 whitespace-nowrap shrink-0">
                                نام و نام خانوادگی:
                            </p>
                            <p className="name text-gray-600 text-xs sm:text-sm truncate">
                                {`${user.name + " " + user.lastname}`}
                            </p>
                        </div>
                        <div className="text-box flex gap-2 items-center">
                            <p className="title text-sm sm:text-base text-gray-800 whitespace-nowrap shrink-0">
                                شماره تماس:
                            </p>
                            <p className="phone text-gray-600 text-xs sm:text-sm truncate">
                                {user.phone}
                            </p>
                        </div>
                        <div className="text-box flex gap-2 items-center">
                            <p className="title text-sm sm:text-base text-gray-800 whitespace-nowrap shrink-0">
                                کد ملی:
                            </p>
                            <p className="national-code text-gray-600 text-xs sm:text-sm truncate">
                                {user.national_code}
                            </p>
                        </div>
                        <div className="text-box flex gap-2 items-center">
                            <p className="title text-sm sm:text-base text-gray-800 whitespace-nowrap shrink-0">
                                کد نظام مهندسی:
                            </p>
                            <p className="eng-code text-gray-600 text-xs sm:text-sm truncate">
                                {user.engineer_code}
                            </p>
                        </div>
                        <div className="text-box flex gap-2 items-center">
                            <p className="title text-sm sm:text-base text-gray-800 whitespace-nowrap shrink-0">
                                نقش کاربری:
                            </p>
                            <p className="eng-code text-gray-600 text-xs sm:text-sm truncate">
                                {user.role}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
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
                        <p className="name text-gray-800 text-xs sm:text-sm truncate">
                            {`${user.name + " " + user.lastname}`}
                        </p>
                        <p className="role text-gray-400 text-[10px] sm:text-xs truncate">
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
                            onClick={() => setShowInfo(true)}
                            className="info-btn cursor-pointer flex justify-center items-center text-blue-500"
                        >
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </button>
                        <Link
                            href={`/dashboard/usersmanagement/edituser/${user.id}`}
                            className="edit-btn cursor-pointer flex justify-center items-center text-yellow-500"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                        <button
                            onClick={handleDelete}
                            disabled={deleteUserMutation.isPending}
                            className="delete-btn cursor-pointer flex justify-center items-center text-red-500 disabled:opacity-50"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
                <div className="btns-container hidden sm:flex items-center gap-2">
                    <button
                        onClick={() => setShowInfo(true)}
                        className="info-btn cursor-pointer flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white size-8 rounded-lg transition-colors"
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                    <Link
                        href={`/dashboard/usersmanagement/edituser/${user.id}`}
                        className="edit-btn cursor-pointer flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 text-white size-8 rounded-lg transition-colors"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    <button
                        onClick={handleDelete}
                        disabled={deleteUserMutation.isPending}
                        className="delete-btn cursor-pointer flex justify-center items-center bg-red-500 hover:bg-red-600 text-white size-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
        </>
    );
}
