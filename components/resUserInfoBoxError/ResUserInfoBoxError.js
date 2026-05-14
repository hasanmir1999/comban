import React from "react";

export default function ResUserInfoBoxError() {
    return (
        <div className="user-info-box-error p-2 rounded-lg gap-3 border border-red-500 w-full h-15">
            <div className="error-text bg-red-500 rounded-lg text-white w-full flex justify-center items-center h-full">
                خطا در دریافت اطلاعات.
            </div>
        </div>
    );
}
