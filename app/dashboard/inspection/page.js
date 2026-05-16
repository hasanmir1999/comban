"use client";

import InputContainer from "@/components/inputContainer/InputContainer";
import TabelError from "@/components/tabelError/TabelError";
import TableLoading from "@/components/tableLoading/TableLoading";
import TecnicalItem from "@/components/tecnicalItem/TecnicalItem";
import { useCombines } from "@/hooks/useCombines";
import {
    faSpinner,
    faLocationDot,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const COMPONENTS = [
    "موتور",
    "سیستم هیدرولیک",
    "سکوی پرش",
    "واحد کوبش",
    "سیستم تمیز کننده",
    "مخزن غله",
    "سیستم انتقال",
];

const initialComponentsData = () =>
    COMPONENTS.map((name) => ({
        component_name: name,
        status: null,
        notes: "",
        photo: null,
    }));

export default function InspectionPage() {
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [result, setResult] = useState("");
    const [overallNotes, setOverallNotes] = useState("");
    const [componentsData, setComponentsData] = useState(initialComponentsData);

    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [combineId, setCombineId] = useState(null);

    const { data: combines, status: combinesStatus } = useCombines(searchTerm);

    const showAllHandler = () => {
        setSearchInput("");
        setSearchTerm("");
    };

    const searchHandler = () => {
        setSearchTerm(searchInput);
    };

    const getLocation = () => {
        setLocationLoading(true);

        console.log("🔍 شروع درخواست موقعیت...");
        console.log(
            "navigator.geolocation موجود است:",
            !!navigator.geolocation,
        );

        if (!navigator.geolocation) {
            toast.error("مرورگر شما از GPS پشتیبانی نمی‌کند");
            setLocationLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("✅ موقعیت دریافت شد:", position);
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                });
                toast.success("موقعیت مکانی با موفقیت دریافت شد");
                setLocationLoading(false);
            },
            (err) => {
                console.error("❌ خطا در دریافت موقعیت:", {
                    code: err.code,
                    message: err.message,
                    PERMISSION_DENIED: err.PERMISSION_DENIED,
                    POSITION_UNAVAILABLE: err.POSITION_UNAVAILABLE,
                    TIMEOUT: err.TIMEOUT,
                });

                const messages = {
                    1: "لطفاً دسترسی به موقعیت مکانی را مجاز کنید", // PERMISSION_DENIED
                    2: "موقعیت مکانی در دسترس نیست", // POSITION_UNAVAILABLE
                    3: "زمان درخواست تمام شد، دوباره تلاش کنید", // TIMEOUT
                };
                toast.error(
                    messages[err.code] || `خطای ناشناخته (کد: ${err.code})`,
                );
                setLocationLoading(false);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 60000,
            },
        );
    };

    const handleComponentChange = (index, data) => {
        setComponentsData((prev) => {
            const next = [...prev];
            next[index] = {
                ...next[index],
                status: data.status,
                notes: data.notes,
            };
            return next;
        });
    };

    const handlePhotoCapture = (index, file) => {
        setComponentsData((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], photo: file ?? null };
            return next;
        });
    };

    const handleSubmit = async () => {
        if (!combineId)
            return toast.error("لطفاً ابتدا یک کمباین از لیست انتخاب کنید");
        if (!location)
            return toast.error("لطفاً ابتدا موقعیت مکانی خود را ثبت کنید");
        if (!result)
            return toast.error("لطفاً نتیجه بازرسی (قبول/رد) را مشخص کنید");
        if (componentsData.some((c) => c.status === null))
            return toast.error("لطفاً وضعیت همه اجزای فنی را مشخص کنید");

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("combine_id", combineId);
            formData.append("result", result);
            formData.append("overall_notes", overallNotes);
            formData.append("location_gps", `${location.lat},${location.lng}`);

            // ارسال components بدون فیلد photo (فایل‌ها جداگانه ارسال میشن)
            const componentsPayload = componentsData.map(
                ({ photo, ...rest }) => rest,
            );
            formData.append(
                "components_data",
                JSON.stringify(componentsPayload),
            );

            // ارسال عکس‌ها با نام component به عنوان key
            componentsData.forEach((c) => {
                if (c.photo) formData.append("photos", c.photo);
            });

            await axios.post(
                "https://lotexev.ir/api-v1/create-inspection",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } },
            );
            //1
            toast.success("بازرسی فنی با موفقیت ثبت شد");
            setResult("");
            setOverallNotes("");
            setLocation(null);
            setComponentsData(initialComponentsData());
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.detail || "خطا در ثبت بازرسی");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="inspection-page bg-white w-full min-h-svh pb-5 pt-30 px-10 lg:pr-90">
            <div className="main-content">
                <div className="combine-list-container">
                    <div className="title flex items-center gap-2">
                        <div className="icon">
                            <div className="size-5 rounded-lg bg-emerald-600"></div>
                        </div>
                        <h5 className="text-lg text-gray-800 font-bold">
                            لیست کمباین ها
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
                            <div className="table-wrapper min-w-max">
                                <div className="table-header bg-emerald-600">
                                    <ul className="flex items-center">
                                        <li className="w-20 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                شناسه
                                            </p>
                                        </li>
                                        <li className="w-40 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                مالک
                                            </p>
                                        </li>
                                        <li className="w-32 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                تلفن
                                            </p>
                                        </li>
                                        <li className="w-28 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                برند
                                            </p>
                                        </li>
                                        <li className="w-28 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                مدل
                                            </p>
                                        </li>
                                        <li className="w-44 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                سریال (VIN)
                                            </p>
                                        </li>
                                        <li className="w-36 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                شماره موتور
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="table-body bg-white border border-t-0 border-gray-300 rounded-lg rounded-t-none">
                                    {combinesStatus === "pending" ? (
                                        <TableLoading />
                                    ) : combinesStatus === "success" ? (
                                        combines?.map((combine) => (
                                            <div
                                                key={combine.id}
                                                onClick={() =>
                                                    setCombineId(combine.id)
                                                }
                                                className={`row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer ${
                                                    combineId === combine.id
                                                        ? "bg-emerald-50 border-l-4 border-l-emerald-600"
                                                        : ""
                                                }`}
                                            >
                                                <div className="w-20 px-3 shrink-0 text-sm text-gray-800 truncate">
                                                    {combine.id}
                                                </div>
                                                <div
                                                    className="w-40 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={combine.owner_name}
                                                >
                                                    {combine.owner_name}
                                                </div>
                                                <div
                                                    className="w-32 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={combine.owner_phone}
                                                >
                                                    {combine.owner_phone}
                                                </div>
                                                <div
                                                    className="w-28 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={combine.brand}
                                                >
                                                    {combine.brand}
                                                </div>
                                                <div
                                                    className="w-28 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={
                                                        combine.combine_model
                                                    }
                                                >
                                                    {combine.combine_model}
                                                </div>
                                                <div
                                                    className="w-44 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={
                                                        combine.serial_number
                                                    }
                                                >
                                                    {combine.serial_number}
                                                </div>
                                                <div
                                                    className="w-36 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={
                                                        combine.engine_number
                                                    }
                                                >
                                                    {combine.engine_number}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        combinesStatus === "error" && (
                                            <TabelError />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="title flex items-center gap-2 mt-10">
                    <div className="icon">
                        <div className="size-5 rounded-lg bg-emerald-600"></div>
                    </div>
                    <h5 className="text-lg text-gray-800 font-bold">
                        اطلاعات بازرسی فنی
                    </h5>
                </div>

                <div className="form-container mt-8">
                    <div className="row flex flex-wrap gap-y-5">
                        <div className="col w-full p-1">
                            <p className="text-[13px] font-semibold text-gray-900 mb-2">
                                نتیجه بازرسی
                                <span className="text-red-500">*</span>
                            </p>
                            <div className="flex items-center gap-4">
                                {["قبول", "رد"].map((val) => (
                                    <label
                                        key={val}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="result"
                                            value={val}
                                            checked={result === val}
                                            onChange={(e) =>
                                                setResult(e.target.value)
                                            }
                                            className="w-4 h-4"
                                        />
                                        <span className="text-gray-700">
                                            {val}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* موقعیت مکانی */}
                        <div className="col w-full p-1">
                            <p className="text-[13px] font-semibold text-gray-900 mb-2">
                                موقعیت مکانی
                                <span className="text-red-500">*</span>
                            </p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={getLocation}
                                    disabled={locationLoading}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                                        location
                                            ? "bg-green-100 text-green-700 border border-green-300"
                                            : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            location
                                                ? faCheckCircle
                                                : faLocationDot
                                        }
                                        className={`text-red-600
                                            ${
                                                locationLoading
                                                    ? "animate-pulse"
                                                    : ""
                                            }
                                        `}
                                    />
                                    {locationLoading
                                        ? "در حال دریافت..."
                                        : location
                                          ? "موقعیت ثبت شد"
                                          : "دریافت موقعیت مکانی"}
                                </button>
                                {location && (
                                    <div className="text-xs text-gray-600">
                                        دقت: {location.accuracy.toFixed(0)} متر
                                    </div>
                                )}
                            </div>
                        </div>
                        {location && (
                            <div className="mt-3">
                                <img
                                    src={`https://static.neshan.org/api/v1/static?key=YOUR_API_KEY&center=${location.lng},${location.lat}&zoom=15&width=400&height=300&marker=red`}
                                    alt="نقشه موقعیت"
                                    className="rounded-lg border border-gray-300"
                                />
                            </div>
                        )}

                        {/* توضیحات کلی */}
                        <div className="col w-full p-1">
                            <p className="text-[13px] font-semibold text-gray-900">
                                توضیحات کلی
                            </p>
                            <textarea
                                value={overallNotes}
                                className="border w-full text-gray-800 [direction:rtl] border-gray-300 p-2 rounded-lg outline-none mt-2 caret-green-600 focus:border-green-600 transition-all duration-300 resize-none overflow-y-auto"
                                rows={1}
                                style={{
                                    minHeight: "2.5rem",
                                    maxHeight: "15rem",
                                }}
                                onChange={(e) => {
                                    const t = e.target;
                                    t.style.height = "auto";
                                    t.style.height =
                                        Math.min(t.scrollHeight, 240) + "px";
                                    setOverallNotes(e.target.value);
                                }}
                                placeholder="توضیحات کلی بازرسی فنی را وارد کنید..."
                            />
                        </div>
                    </div>

                    {/* لیست اجزای فنی */}
                    <div className="list-container mt-5">
                        <p className="text-[13px] font-semibold text-gray-900">
                            لیست اجزای فنی (وضعیت هر بخش را مشخص کنید){" "}
                            <span className="text-red-500">*</span>
                        </p>
                        <div className="item-container mt-5">
                            {COMPONENTS.map((component, index) => (
                                <TecnicalItem
                                    key={component}
                                    title={`${component}:`}
                                    index={index}
                                    onChange={handleComponentChange}
                                    onPhotoCapture={handlePhotoCapture}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="btn-container flex justify-center items-center mt-5">
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !location || !result}
                            className="text-white flex justify-center items-center gap-2 cursor-pointer outline-none bg-emerald-600 rounded-lg py-1.75 px-20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 transition-all duration-300"
                        >
                            ثبت بازرسی فنی
                            {loading && (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="animate-spin"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
