"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";

export default function TecnicalItem({
    title,
    index,
    onChange,
    onPhotoCapture,
}) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);
    const streamRef = useRef(null);
    const [componentData, setComponentData] = useState({
        status: null,
        notes: "",
    });

    // بعد از رندر شدن مودال، stream رو به video وصل می‌کنه
    useEffect(() => {
        if (isCameraOpen && videoRef.current && streamRef.current) {
            videoRef.current.srcObject = streamRef.current;
        }
    }, [isCameraOpen]);

    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
            });

            streamRef.current = stream; // اول stream رو ذخیره کن
            setIsCameraOpen(true); // بعد مودال رو باز کن → useEffect وصل می‌کنه
        } catch (error) {
            console.error("خطا در دسترسی به دوربین:", error);
            alert("دسترسی به دوربین رد شد یا دوربین در دسترس نیست");
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0);

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const file = new File(
                            [blob],
                            `${title}-${Date.now()}.jpg`,
                            { type: "image/jpeg" },
                        );
                        const imageUrl = URL.createObjectURL(blob);

                        setCapturedImage(imageUrl);
                        setPhotoFile(file);
                        onPhotoCapture(index, file);
                    }
                },
                "image/jpeg",
                0.9,
            );

            closeCamera();
        }
    };

    const closeCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setIsCameraOpen(false);
    };

    const removePhoto = () => {
        setCapturedImage(null);
        setPhotoFile(null);
        onPhotoCapture(index, null);
    };

    const handleStatusChange = (status) => {
        const newData = { ...componentData, status };
        setComponentData(newData);
        onChange(index, newData, photoFile);
    };

    const handleNotesChange = (notes) => {
        const newData = { ...componentData, notes };
        setComponentData(newData);
        onChange(index, newData, photoFile);
    };

    return (
        <div className="tecnical-item-container my-3 flex flex-col border border-emerald-600 rounded-lg py-3 px-5">
            {/* ردیف اصلی: عنوان + وضعیت + توضیحات + دکمه دوربین */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
                <div className="status-title flex flex-wrap gap-2 items-center shrink-0">
                    <div className="title text-gray-800 text-lg font-semibold whitespace-nowrap">
                        {title}
                    </div>
                    <div className="status flex items-center gap-2 text-sm">
                        <input
                            type="radio"
                            name={`status-${index}`}
                            id={`salem-${index}`}
                            onChange={() => handleStatusChange(1)}
                        />
                        <label
                            htmlFor={`salem-${index}`}
                            className="cursor-pointer"
                        >
                            سالم
                        </label>
                        <input
                            type="radio"
                            name={`status-${index}`}
                            id={`mayob-${index}`}
                            onChange={() => handleStatusChange(0)}
                        />
                        <label
                            htmlFor={`mayob-${index}`}
                            className="cursor-pointer"
                        >
                            معیوب
                        </label>
                    </div>
                </div>

                <div className="description flex-1 w-full lg:w-auto flex gap-2">
                    <textarea
                        value={componentData.notes}
                        className="border flex-1 text-gray-800 [direction:rtl] border-gray-300 p-2 rounded-lg outline-none caret-green-600 focus:border-green-600 transition-all duration-300 resize-none overflow-y-auto"
                        rows={1}
                        style={{ minHeight: "2.5rem", maxHeight: "15rem" }}
                        onChange={(e) => {
                            const target = e.target;
                            target.style.height = "auto";
                            target.style.height =
                                Math.min(target.scrollHeight, 240) + "px";
                            handleNotesChange(e.target.value);
                        }}
                        placeholder="توضیحات..."
                    />

                    <button
                        type="button"
                        onClick={openCamera}
                        className="shrink-0 cursor-pointer w-10 h-10 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-300"
                        title="گرفتن عکس"
                    >
                        <FontAwesomeIcon icon={faCamera} className="text-lg" />
                    </button>
                </div>
            </div>

            {/* عکس گرفته شده — همیشه زیر همه چیز */}
            {capturedImage && (
                <div className="mt-3 relative inline-block">
                    <img
                        src={capturedImage}
                        alt="عکس گرفته شده"
                        className="w-32 h-32 object-cover rounded-lg"
                    />
                    <button
                        onClick={removePhoto}
                        className="absolute cursor-pointer -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        title="حذف عکس"
                    >
                        <FontAwesomeIcon icon={faTrash} className="text-xs" />
                    </button>
                </div>
            )}

            {/* مودال دوربین */}
            {isCameraOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-2xl">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full rounded-lg"
                        />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                            <button
                                onClick={capturePhoto}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold"
                            >
                                عکس بگیر
                            </button>
                            <button
                                onClick={closeCamera}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
                            >
                                لغو
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}
