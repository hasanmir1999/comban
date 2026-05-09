"use client";

import TecnicalItem from "@/components/tecnicalItem/TecnicalItem";
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

export default function InspectionPage({ combineId = 1 }) {
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [result, setResult] = useState("");
    const [overallNotes, setOverallNotes] = useState("");
    const [componentsData, setComponentsData] = useState(initialComponentsData);

    const getLocation = () => {
        setLocationLoading(true);
        if (!navigator.geolocation) {
            toast.error("مرورگر شما از GPS پشتیبانی نمی‌کند");
            setLocationLoading(false);
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                });
                toast.success("موقعیت مکانی با موفقیت دریافت شد");
                setLocationLoading(false);
            },
            (err) => {
                const messages = {
                    [err.PERMISSION_DENIED]:
                        "لطفاً دسترسی به موقعیت مکانی را مجاز کنید",
                    [err.POSITION_UNAVAILABLE]: "موقعیت مکانی در دسترس نیست",
                    [err.TIMEOUT]: "زمان درخواست تمام شد، دوباره تلاش کنید",
                };
                toast.error(messages[err.code] || "خطای ناشناخته");
                setLocationLoading(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
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

            toast.success("بازرسی فنی با موفقیت ثبت شد");
            setResult("");
            setOverallNotes("");
            setLocation(null);
            setComponentsData(initialComponentsData());
        } catch (error) {
            toast.error(error.response?.data?.detail || "خطا در ثبت بازرسی");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="inspection-page bg-white w-full min-h-svh pb-5 pt-30 px-10 lg:pr-90">
            <div className="main-content">
                <div className="title flex items-center gap-2">
                    <div className="icon">
                        <div className="size-5 rounded-lg bg-emerald-600"></div>
                    </div>
                    <h1 className="text-lg text-gray-800 font-bold">
                        اطلاعات بازرسی فنی
                    </h1>
                </div>

                <div className="form-container mt-8">
                    <div className="row flex flex-wrap gap-y-5">
                        {/* نتیجه بازرسی */}
                        <div className="col w-full p-1">
                            <p className="text-[13px] font-semibold text-gray-900 mb-2">
                                نتیجه بازرسی{" "}
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
                                موقعیت مکانی{" "}
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
                                            ${locationLoading
                                                ? "animate-pulse"
                                                : ""}
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
