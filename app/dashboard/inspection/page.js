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

export default function InspectionPage() {
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [formData, setFormData] = useState({
        description: "",
    });

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
                let errorMessage = "خطای ناشناخته";
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        errorMessage =
                            "لطفاً دسترسی به موقعیت مکانی را مجاز کنید";
                        break;
                    case err.POSITION_UNAVAILABLE:
                        errorMessage = "موقعیت مکانی در دسترس نیست";
                        break;
                    case err.TIMEOUT:
                        errorMessage = "زمان درخواست تمام شد، دوباره تلاش کنید";
                        break;
                }
                toast.error(errorMessage);
                setLocationLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            },
        );
    };

    const handleSubmit = async () => {
        // چک کردن موقعیت مکانی
        if (!location) {
            toast.error("لطفاً ابتدا موقعیت مکانی خود را ثبت کنید");
            return;
        }

        // چک کردن توضیحات (اختیاری)
        if (!formData.description.trim()) {
            toast.error("لطفاً توضیحات را وارد کنید");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("/api/inspection", {
                description: formData.description,
                latitude: location.lat,
                longitude: location.lng,
                accuracy: location.accuracy,
            });

            toast.success("بازرسی فنی با موفقیت ثبت شد");

            // ریست کردن فرم
            setFormData({ description: "" });
            setLocation(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "خطا در ثبت بازرسی");
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
                        {/* فیلد موقعیت مکانی */}
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
                                        className={
                                            locationLoading
                                                ? "animate-pulse"
                                                : ""
                                        }
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

                        {/* فیلد توضیحات */}
                        <div className="col w-full p-1">
                            <div className="text-area-container">
                                <p className="text-[13px] font-semibold text-gray-900">
                                    توضیحات کلی
                                </p>
                                <textarea
                                    value={formData.description}
                                    className="border w-full text-gray-800 [direction:rtl] border-gray-300 p-2 rounded-lg outline-none mt-2 caret-green-600 focus:border-green-600 transition-all duration-300 resize-none overflow-y-auto"
                                    rows={1}
                                    style={{
                                        minHeight: "2.5rem",
                                        maxHeight: "15rem",
                                    }}
                                    onChange={(e) => {
                                        const target = e.target;
                                        target.style.height = "auto";
                                        target.style.height =
                                            Math.min(target.scrollHeight, 240) +
                                            "px";

                                        setFormData((p) => ({
                                            ...p,
                                            description: e.target.value,
                                        }));
                                    }}
                                    placeholder="توضیحات بازرسی فنی را وارد کنید..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="list-container mt-5">
                        <p className="text-[13px] font-semibold text-gray-900">
                             لیست اجزای فنی (وضعیت هر بخش را مشخص کنید)
                        </p>
                        <div className="item-container mt-5">
                            <TecnicalItem title={'موتور:'} />
                            <TecnicalItem title={'سیستم هیدرولیک:'} />
                            <TecnicalItem title={'سکوی پرش:'} />
                            <TecnicalItem title={'واحد کوبش:'} />
                            <TecnicalItem title={'سیستم تمیز کننده:'} />
                            <TecnicalItem title={'مخزن غله:'} />
                            <TecnicalItem title={'سیستم انتقال:'} />

                        </div>
                    </div>

                    <div className="btn-container flex justify-center items-center mt-5">
                        <button
                            onClick={handleSubmit}
                            disabled={loading || !location}
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
