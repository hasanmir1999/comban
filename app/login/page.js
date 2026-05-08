"use client";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from 'js-cookie';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import InputContainer from "@/components/inputContainer/InputContainer";

export default function LoginPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const loginHandler = async () => {
        setLoading(true);
        if (
            formData.username.trim() === "" ||
            formData.password.trim() === ""
        ) {
            setLoading(false);
            return toast.error("لطفا همه ی فیلد ها را پر کنید!");
        }
        try {
            const res = await axios.post(
                "api-v1/login",
                {
                    ...formData,
                },
            );
            console.log(res.data);
            Cookies.set("access_token", `${res.data.access_token}`, {
                expires: 7,
                path: "/",
            });
            router.push('/dashboard')
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast.error("خطا");
        }
    };

    return (
        <div className="bg-gray-50 h-svh w-full flex justify-center items-center">
            <div className="form-box w-full h-full flex flex-col justify-center sm:w-110 sm:h-auto bg-white sm:rounded-lg shadow-sm">
                <div className="form-container p-5">
                    <div className="logo flex justify-center">
                        <Image
                            width={100}
                            height={100}
                            className="w-30 sm:w-35 object-cover"
                            src={"/images/comban2.png"}
                            alt="logo"
                        />
                    </div>
                    <div className="title text-center mt-5">
                        <h1 className="text-gray-950 text-2xl sm:text-3xl font-bold">
                            ورود به سامانه کُمبان
                        </h1>
                        <p className="desc text-xs sm:text-sm text-gray-600 mt-2">
                            برای دسترسی به سامانه لطفا وارد شوید.
                        </p>
                    </div>
                    <div className="form mt-8 flex flex-col gap-4 items-center">
                        <InputContainer
                            title={"نام کاربری*"}
                            type={"text"}
                            setFormData={setFormData}
                            onChange={(v) =>
                                setFormData((p) => ({ ...p, username: v }))
                            }
                        />
                        <InputContainer
                            title={"رمز عبور*"}
                            type={"password"}
                            setFormData={setFormData}
                            onChange={(v) =>
                                setFormData((p) => ({ ...p, password: v }))
                            }
                        />
                        <div className="btn-container w-[95%] mt-2">
                            <button
                                onClick={loginHandler}
                                disabled={loading}
                                className={`py-1.75 px-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"} flex items-center gap-1 justify-center text-white bg-green-600 w-full rounded-lg text-sm sm:text-base`}
                            >
                                ورود
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
        </div>
    );
}
