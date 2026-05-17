"use client";

import FilterOption from "@/components/filterOption/FilterOption";
import InputContainer from "@/components/inputContainer/InputContainer";
import InsertDropMenu from "@/components/insertDropMenu/InsertDropMenu";
import UserItem from "@/components/userItem/UserItem";
import UserItemError from "@/components/userItemError/UserItemError";
import UserItemLoading from "@/components/userItemLoading/UserItemLoading";
import useUsers from "@/hooks/useUsers";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "@/lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TabelNotFound from "@/components/tabelNotFound/TabelNotFound";

export default function UsersManagementPage() {
    const [openMenuId, setOpenMenuId] = useState(null);
    const queryClient = useQueryClient();
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // برای ذخیره کوئری جستجو

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        lastname: "",
        phone: "",
        national_code: "",
        engineer_code: "",
        role_id: 1,
        password: "",
    });

    const roles = [
        { id: 1, name: "مرکز جهاد کشاورزی" },
        { id: 2, name: "کاربر نظام مهندسی" },
        { id: 3, name: "ناظر کمباین" },
        { id: 4, name: "مدیر مکانیزاسیون استان" },
        { id: 5, name: "مدیر برنامه" },
    ];

    const { data, status } = useUsers(searchQuery);

    const createUserMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post("/api-v1/create-user", userData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("کاربر با موفقیت ثبت شد");

            setFormData({
                username: "",
                name: "",
                lastname: "",
                phone: "",
                national_code: "",
                engineer_code: "",
                role_id: 1,
                password: "",
            });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "خطا در ثبت کاربر");
        },
    });

    const handleSubmit = () => {
        if (
            !formData.name ||
            !formData.lastname ||
            !formData.username ||
            !formData.password
        ) {
            toast.error("لطفا فیلدهای اجباری را پر کنید");
            return;
        }

        createUserMutation.mutate(formData);
    };

    // تابع جستجو
    const searchHandler = () => {
        if (!searchInput.trim()) {
            toast.error("لطفا کد ملی را وارد کنید");
            return;
        }
        setSearchQuery(searchInput.trim());
    };

    // تابع نمایش همه
    const showAllHandler = () => {
        setSearchInput("");
        setSearchQuery("");
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
                                value={formData.name}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        name: v,
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
                                value={formData.lastname}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        lastname: v,
                                    }))
                                }
                                dir={"rtl"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={<>شماره تماس</>}
                                type={"text"}
                                value={formData.phone}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        phone: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={<>کد ملی</>}
                                type={"text"}
                                value={formData.national_code}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        national_code: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={<>کد نظام مهندسی</>}
                                type={"text"}
                                value={formData.engineer_code}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        engineer_code: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InsertDropMenu
                                title={
                                    <>
                                        نقش کاربری
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                menuItems={roles}
                                selectedValue={formData.role_id}
                                onClick={(value) =>
                                    setFormData((p) => ({
                                        ...p,
                                        role_id: value,
                                    }))
                                }
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
                                value={formData.username}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        username: v,
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
                                value={formData.password}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        password: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                    </div>
                    <div className="btn-container flex justify-center items-center mt-5 whitespace-nowrap text-sm">
                        <button
                            onClick={handleSubmit}
                            disabled={createUserMutation.isPending}
                            className="text-white flex justify-center items-center gap-2 cursor-pointer outline-none bg-emerald-600 rounded-lg py-1.75 px-20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ثبت کاربر جدید
                            {createUserMutation.isPending && (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="animate-spin"
                                />
                            )}
                        </button>
                    </div>
                </div>
                <div className="title flex items-center gap-2 mt-10">
                    <div className="icon">
                        <div className="size-5 rounded-lg bg-emerald-600"></div>
                    </div>
                    <h1 className="text-lg text-gray-800 font-bold">
                        لیست کاربران ثبت شده
                    </h1>
                </div>
                <div className="search-and-users-list mt-5">
                    <div className="search-container px-1">
                        <div className="row flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
                            <div className="col flex-1">
                                <InputContainer
                                    type={"text"}
                                    title={"جستجو:"}
                                    placeHolder={"متن جستجو (کد ملی)"}
                                    value={searchInput}
                                    onChange={(v) => {
                                        setSearchInput(v);
                                    }}
                                    dir={"rtl"}
                                />
                            </div>
                            <div className="col">
                                <div className="btn-container flex items-center gap-2">
                                    <button
                                        onClick={searchHandler}
                                        className="text-white cursor-pointer bg-emerald-600 whitespace-nowrap py-1 px-4 rounded-lg text-xs sm:text-sm"
                                    >
                                        جستجو
                                    </button>
                                    <button
                                        onClick={showAllHandler}
                                        className="text-white cursor-pointer bg-amber-500 whitespace-nowrap py-1 px-4 rounded-lg text-xs sm:text-sm"
                                    >
                                        نمایش همه
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="users-list-container h-[50svh] overflow-y-auto">
                        <div className="row flex flex-wrap py-6">
                            {status === "pending" ? (
                                <>
                                    <div className="col w-full lg:w-1/2 p-2">
                                        <UserItemLoading />
                                    </div>
                                    <div className="col w-full lg:w-1/2 p-2">
                                        <UserItemLoading />
                                    </div>
                                    <div className="col w-full lg:w-1/2 p-2">
                                        <UserItemLoading />
                                    </div>
                                    <div className="col w-full lg:w-1/2 p-2">
                                        <UserItemLoading />
                                    </div>
                                    <div className="col w-full lg:w-1/2 p-2">
                                        <UserItemLoading />
                                    </div>
                                    <div className="col w-full lg:w-1/2 p-2">
                                        <UserItemLoading />
                                    </div>
                                    <div className="col w-full lg:w-1/2 p-2">
                                        <UserItemLoading />
                                    </div>
                                </>
                            ) : status === "success" ? (
                                data?.users?.length > 0 ? (
                                    data.users.map((user) => (
                                        <div
                                            key={user.id}
                                            className="col w-full lg:w-1/2 p-1"
                                        >
                                            <UserItem
                                                user={user}
                                                openMenuId={openMenuId}
                                                setOpenMenuId={setOpenMenuId}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="col w-full p-2">
                                        <TabelNotFound />
                                    </div>
                                )
                            ) : (
                                status === "error" && (
                                    <div className="col w-full p-2">
                                        <UserItemError />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
