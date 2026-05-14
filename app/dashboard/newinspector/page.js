"use client";
import InputContainer from "@/components/inputContainer/InputContainer";
import TabelError from "@/components/tabelError/TabelError";
import TableLoading from "@/components/tableLoading/TableLoading";
import { useInspectors } from "@/hooks/useInspector";
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
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const {
        data: inspectors,
        isLoading,
        isError,
        error,
    } = useInspectors(searchTerm);
    const showAllHandler = () => {
        setSearchInput("");
        setSearchTerm("");
    };

    const searchHandler = () => {
        setSearchTerm(searchInput);
    };

    const createInspectorHandler = async () => {
        try {
            const res = await axios.post(
                "https://lotexev.ir/api-v1/inspectors/",
                { ...formData },
            );
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="new-combine-page bg-white w-full min-h-svh pt-30 pb-5 px-10 lg:pr-90">
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
                                title={
                                    <>
                                        کد نظام مهندسی
                                        <span className="text-red-500">*</span>
                                    </>
                                }
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
                                        username: v,
                                    }))
                                }
                                dir={"ltr"}
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
                <div className="combine-list-container mt-10">
                    <div className="title flex items-center gap-2">
                        <div className="icon">
                            <div className="size-5 rounded-lg bg-emerald-600"></div>
                        </div>
                        <h5 className="text-lg text-gray-800 font-bold">
                            لیست ناظران ثبت شده
                        </h5>
                    </div>
                    <div className="search-and-list-container mt-8">
                        <div className="search-container">
                            <div className="row flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
                                <div className="col flex-1">
                                    <InputContainer
                                        type={"text"}
                                        title={"جستجو:"}
                                        placeHolder={
                                            "متن جستجو (مثلا نام مالک،سریال،شماره موتور،...)"
                                        }
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
                                            className="text-white cursor-pointer bg-emerald-600 whitespace-nowrap py-1 px-4 rounded-lg text-sm sm:text-base"
                                        >
                                            جستجو
                                        </button>
                                        <button
                                            onClick={showAllHandler}
                                            className="text-white cursor-pointer bg-amber-500 whitespace-nowrap py-1 px-4 rounded-lg text-sm sm:text-base"
                                        >
                                            نمایش همه
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="list-container rounded-lg mt-5 overflow-x-auto">
                            <div className="table-wrapper min-w-200">
                                <div className="table-header bg-emerald-600">
                                    <ul className="flex items-center">
                                        <li className="w-25 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                شناسه
                                            </p>
                                        </li>
                                        <li className="w-37.5 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                نام کامل
                                            </p>
                                        </li>
                                        <li className="w-30 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                تلفن
                                            </p>
                                        </li>
                                        <li className="w-30 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                کد ملی
                                            </p>
                                        </li>
                                        <li className="w-35 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                کد نظام مهندسی
                                            </p>
                                        </li>
                                        <li className="w-25 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                نام کاربری
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="table-body bg-white border border-t-0 border-gray-300 rounded-lg rounded-t-none">
                                    {isLoading && <TableLoading />}

                                    {isError && <TabelError />}

                                    {!isLoading &&
                                        !isError &&
                                        inspectors?.length === 0 && (
                                            <div className="p-8 text-center text-gray-600">
                                                هیچ بازرسی یافت نشد
                                            </div>
                                        )}

                                    {!isLoading &&
                                        !isError &&
                                        inspectors?.map((inspector) => (
                                            <div
                                                key={inspector.id}
                                                className={`row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer`}
                                            >
                                                <div className="w-25 px-3 shrink-0 text-sm text-gray-800 truncate">
                                                    {inspector.id}
                                                </div>
                                                <div
                                                    className="w-37.5 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={inspector.fullname}
                                                >
                                                    {inspector.fullname}
                                                </div>
                                                <div
                                                    className="w-30 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={inspector.phone}
                                                >
                                                    {inspector.phone}
                                                </div>
                                                <div
                                                    className="w-30 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={
                                                        inspector.national_code
                                                    }
                                                >
                                                    {inspector.national_code}
                                                </div>
                                                <div
                                                    className="w-35 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={
                                                        inspector.engineer_code
                                                    }
                                                >
                                                    {inspector.engineer_code}
                                                </div>
                                                <div
                                                    className="w-25 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={inspector.username}
                                                >
                                                    {inspector.username}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
