"use client";
import InputContainer from "@/components/inputContainer/InputContainer";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

export default function page() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        fname: "",
        lname: "",
        phone: "",
        national_code: "",
        engineer_code: "",
    });
    const [loading, setLoading] = useState(false);
    const createInspectorHandler = async () => {
        try {
            const res = await axios.post(
                "http://192.168.43.203:8000/api-v1/inspectors/",
                { ...formData },
            );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="new-combine-page bg-white w-full min-h-svh pt-30 px-10 lg:pr-90">
            <div className="main-content">
                <div className="title flex items-center gap-2">
                    <div className="icon">
                        <div className="size-5 rounded-lg bg-emerald-600"></div>
                    </div>
                    <h1 className="text-lg text-gray-800 font-bold">
                        ثبت اطلاعات ناظر جدید
                    </h1>
                </div>
                <div className="form-container mt-8">
                    <div className="row flex flex-wrap gap-y-5">
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={<>نام<span className="text-red-500">*</span></>}
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
                                title={<>نام خانوادگی<span className="text-red-500">*</span></>}
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        lname: v,
                                    }))
                                }
                                dir={"rtl"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={"شماره تماس"}
                                type={"text"}
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
                                title={"کد ملی"}
                                type={"text"}
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
                                title={<>کد نظام مهندسی<span className="text-red-500">*</span></>}
                                type={"text"}
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
                            <InputContainer
                                title={<>نام کاربری<span className="text-red-500">*</span></>}
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        username: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={<>گذرواژه<span className="text-red-500">*</span></>}
                                type={"password"}
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
                    <div className="btn-container flex justify-center items-center mt-5">
                        <button
                            onClick={createInspectorHandler}
                            className="text-white flex justify-center items-center gap-2 cursor-pointer outline-none bg-emerald-600 rounded-lg py-1.75 px-20"
                        >
                            ثبت ناظر
                            {loading ? (
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
