"use client";

import InputContainer from "@/components/inputContainer/InputContainer";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewCombinePage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        owner_name: "",
        owner_phone: "",
        combine_model: "",
        serial_number: "",
        manufacture_year: null,
        brand: "",
        engine_number: "",
        chassis_number: "",
    });

    const createCombineHandler = async () => {
        setLoading(true)
        try {
            const res = await axios.post("http://192.168.43.203:8000/api-v1/", { ...formData });
            console.log(res);
            setLoading(false)
            toast.success('اطلاعات کمباین جدید با موفقیت ثبت شد.')
        } catch (err) {
            setLoading(false)
            console.log(err);
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
                        ثبت اطلاعات کمباین جدید
                    </h1>
                </div>
                <div className="form-container mt-8">
                    <div className="row flex flex-wrap gap-y-5">
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={<>نام مالک<span className="text-red-500">*</span></>}
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        owner_name: v,
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
                                        owner_phone: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={<>برند (سازنده)<span className="text-red-500">*</span></>}
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        brand: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={<>مدل کمباین<span className="text-red-500">*</span></>}
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        combine_model: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={<>شماره سریال (VIN)<span className="text-red-500">*</span></>}
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        serial_number: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={"شماره موتور"}
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({ ...p, engine_number: v }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={"شماره شاسی"}
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        chassis_number: v,
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                        <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                            <InputContainer
                                title={"سال ساخت"}
                                type={"text"}
                                onChange={(v) =>
                                    setFormData((p) => ({
                                        ...p,
                                        manufacture_year: Number(v),
                                    }))
                                }
                                dir={"ltr"}
                            />
                        </div>
                    </div>
                    <div className="btn-container flex justify-center items-center mt-5">
                        <button
                            onClick={createCombineHandler}
                            className="text-white flex justify-center items-center gap-2 cursor-pointer outline-none bg-emerald-600 rounded-lg py-1.75 px-20"
                        >
                            ثبت کمباین
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
