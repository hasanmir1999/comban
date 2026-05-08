'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';

export default function TecnicalItem({ title }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const streamRef = useRef(null);

    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' } // دوربین پشتی
            });
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setIsCameraOpen(true);
            }
        } catch (error) {
            console.error('خطا در دسترسی به دوربین:', error);
            alert('دسترسی به دوربین رد شد یا دوربین در دسترس نیست');
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0);
            
            // تبدیل به blob برای آپلود
            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
                    
                    // اینجا می‌تونی فایل رو آپلود کنی
                    console.log('عکس گرفته شد:', file);
                    uploadPhoto(file);
                    
                    // نمایش پیش‌نمایش
                    const imageUrl = URL.createObjectURL(blob);
                    setCapturedImage(imageUrl);
                }
            }, 'image/jpeg', 0.9);
            
            closeCamera();
        }
    };

    const closeCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraOpen(false);
    };

    const uploadPhoto = async (file) => {
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('title', title);
        
        try {
            const response = await fetch('/api/upload-photo', {
                method: 'POST',
                body: formData,
            });
            
            if (response.ok) {
                console.log('عکس با موفقیت آپلود شد');
            } else {
                console.error('خطا در آپلود عکس');
            }
        } catch (error) {
            console.error('خطا در آپلود:', error);
        }
    };

    return (
        <div className="tecnical-item-container my-3 flex flex-col lg:flex-row items-start lg:items-center gap-3 border border-emerald-600 rounded-lg py-3 px-5">
            <div className="status-title flex flex-wrap gap-2 items-center shrink-0">
                <div className="title text-gray-800 text-lg font-semibold whitespace-nowrap">{title}</div>
                <div className="status flex items-center gap-2 text-sm">
                    <input type="radio" name={`status-${title}`} id={`salem-${title}`} />
                    <label htmlFor={`salem-${title}`} className="cursor-pointer">سالم</label>
                    <input type="radio" name={`status-${title}`} id={`mayob-${title}`} />
                    <label htmlFor={`mayob-${title}`} className="cursor-pointer">معیوب</label>
                </div>
            </div>
            
            <div className="description flex-1 w-full lg:w-auto flex gap-2">
                <textarea
                    className="border flex-1 text-gray-800 [direction:rtl] border-gray-300 p-2 rounded-lg outline-none caret-green-600 focus:border-green-600 transition-all duration-300 resize-none overflow-y-auto"
                    rows={1}
                    style={{
                        minHeight: "2.5rem",
                        maxHeight: "15rem",
                    }}
                    onChange={(e) => {
                        const target = e.target;
                        target.style.height = "auto";
                        target.style.height =
                            Math.min(target.scrollHeight, 240) + "px";
                    }}
                    placeholder="توضیحات..."
                ></textarea>
                
                <button
                    type="button"
                    onClick={openCamera}
                    className="shrink-0 w-10 h-10 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-300"
                    title="گرفتن عکس"
                >
                    <FontAwesomeIcon icon={faCamera} className="text-lg" />
                </button>
            </div>

            {/* مودال دوربین */}
            {isCameraOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-2xl">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
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

            {/* Canvas مخفی برای capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* نمایش عکس گرفته شده */}
            {capturedImage && (
                <div className="w-full mt-2">
                    <img src={capturedImage} alt="عکس گرفته شده" className="w-32 h-32 object-cover rounded-lg" />
                </div>
            )}
        </div>
    );
}
