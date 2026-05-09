"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function InputContainer({
    title,
    type,
    onChange,
    dir,
    placeHolder,
}) {
    const [eyeStat, setEyeStat] = useState(false);
    return (
        <div className="input-container w-[95%] relative">
            <p className="text-[13px] font-semibold text-gray-900">{title}</p>
            <input
                placeholder={placeHolder}
                onChange={(e) => onChange(e.target.value)}
                type={
                    type === "text"
                        ? "text"
                        : type === "password" && eyeStat
                          ? "text"
                          : "password"
                }
                className={`border w-full text-gray-800 ${dir === "rtl" ? "[direction:rtl]" : "[direction:ltr]"}  border-gray-300 py-1.25 px-2 rounded-lg outline-none mt-1 caret-green-600 focus:border-green-600 transition-all duration-300`}
            />
            {type === "password" && (
                <span
                    onClick={() => setEyeStat(!eyeStat)}
                    className={`absolute top-7.25 right-2 cursor-pointer text-lg text-gray-600`}
                >
                    {eyeStat ? (
                        <FontAwesomeIcon icon={faEye} />
                    ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                </span>
            )}
        </div>
    );
}
