"use client";

import InputContainer from "@/components/inputContainer/InputContainer";
import UserItem from "@/components/userItem/UserItem";
import UserItemError from "@/components/userItemError/UserItemError";
import UserItemLoading from "@/components/userItemLoading/UserItemLoading";
import { useUsers } from "@/hooks/useUsers";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UsersManagementPage() {
    const [openMenuId, setOpenMenuId] = useState(null);
    const { data: users, isLoading, isError, error } = useUsers();
    const handleInfo = (user) => {
        console.log("Info:", user);
        // منطق نمایش اطلاعات
    };

    const handleEdit = (user) => {
        console.log("Edit:", user);
        // منطق ویرایش
    };

    const handleDelete = (user) => {
        console.log("Delete:", user);
        // منطق حذف
    };
    return (
        <div className="users-management-page bg-white w-full min-h-svh pt-30 pb-5 px-10 lg:pr-90">
            <div className="main-content">
                <div className="title flex items-center gap-2">
                    <div className="icon">
                        <div className="size-5 rounded-lg bg-emerald-600"></div>
                    </div>
                    <h1 className="text-lg text-gray-800 font-bold">
                        ثبت کاربر جدید
                    </h1>
                </div>
                <div className="form-container mt-8">
                    <div className="row flex flex-wrap gap-y-5">
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={
                                    <>
                                        نام
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        fname: v,
                                    }))
                                }
                                dir={"rtl"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={
                                    <>
                                        نام خانوادگی
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        fname: v,
                                    }))
                                }
                                dir={"rtl"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={<>شماره تماس</>}
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        fname: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={<>کد ملی</>}
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        fname: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={<>کد نظام مهندسی</>}
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        fname: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={
                                    <>
                                        نقش کاربری
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        fname: v,
                                    }))
                                }
                                dir={"rtl"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={
                                    <>
                                        نام کاربری
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        fname: v,
                                    }))
                                }
                                dir={"rtl"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={
                                    <>
                                        گذرواژه
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                type={"password"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        fname: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                    </div>
                    <div className="btn-container flex justify-center items-center mt-5 whitespace-nowrap text-sm sm:text-base">
                        <button className="text-white flex justify-center items-center gap-2 cursor-pointer outline-none bg-emerald-600 rounded-lg py-1.75 px-20">
                            ثبت کاربر جدید
                            {0 ? (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="animate-spin"
                                />
                            ) : (
                                ""
                            )}
                        </button>
                    </div>
                </div>
                <div className="title flex items-center gap-2 mt-5">
                    <div className="icon">
                        <div className="size-5 rounded-lg bg-emerald-600"></div>
                    </div>
                    <h1 className="text-lg text-gray-800 font-bold">
                        لیست کاربران ثبت شده
                    </h1>
                </div>
                <div className="users-list-container h-[50svh] overflow-y-auto mt-10">
                    {isLoading && <UserItemLoading />}

                    {isError && <UserItemError />}

                    {!isLoading && !isError && users?.length === 0 && (
                        <div className="p-8 text-center text-gray-600">
                            هیچ کاربری یافت نشد
                        </div>
                    )}

                    {!isLoading && !isError && users && (
                        <div className="row flex flex-wrap py-6">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="col w-full lg:w-1/2 p-2"
                                >
                                    <UserItem
                                        user={user}
                                        onInfo={handleInfo}
                                        openMenuId={openMenuId}
                                        setOpenMenuId={setOpenMenuId}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
