"use client";
import InputContainer from "@/components/inputContainer/InputContainer";
import InsertDropMenu from "@/components/insertDropMenu/InsertDropMenu";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function EditUserPage() {
    const roles = [
        { id: 0, name: "مرکز جهاد کشاورزی" },
        { id: 1, name: "کاربر نظام مهندسی" },
        { id: 2, name: "ناظر کمباین" },
        { id: 3, name: "مدیر مکانیزاسیون استان" },
        { id: 4, name: "مدیر برنامه" },
    ];
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        lastname: "",
        phone: "",
        national_code: "",
        engineer_code: "",
        role_id: 0,
        password: "",
    });
    return (
        <div className="edit-user-page bg-white w-full min-h-svh pt-30 pb-5 px-10 lg:pr-90">
            <div className="main-content">
                <div className="title flex items-center gap-2">
                    <div className="icon">
                        <div className="size-5 rounded-lg bg-emerald-600"></div>
                    </div>
                    <h1 className="text-lg text-gray-800 font-bold">
                        ویرایش اطلاعات کاربر
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
                            <InsertDropMenu
                                title={
                                    <>
                                        نقش کاربری
                                        <span className="text-red-500">*</span>
                                    </>
                                }
                                menuItems={roles}
                                onClick={(value) =>
                                    setFormData((p) => ({
                                        ...p,
                                        role: value,
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
                    <div className="btn-container flex justify-center items-center mt-5 whitespace-nowrap text-sm">
                        <button className="text-white flex justify-center items-center gap-2 cursor-pointer outline-none bg-emerald-600 rounded-lg py-1.75 px-20">
                            ویرایش اطلاعات
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
            </div>
        </div>
    );
}
