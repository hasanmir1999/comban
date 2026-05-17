"use client";
import { useState } from "react";

export default function SwitchBtn({ title }) {
    const [enabled, setEnabled] = useState(false);
    return (
        <div className="switch-btn-container flex items-end gap-2">
            <div className="title text-[13px] whitespace-nowrap font-semibold text-gray-900">
                {title}
            </div>
            <button
                onClick={() => setEnabled(!enabled)}
                className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${
                    enabled ? "bg-emerald-600" : "bg-gray-400"
                }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        enabled ? "-translate-x-6" : "-translate-x-1"
                    }`}
                />
            </button>
        </div>
    );
}
