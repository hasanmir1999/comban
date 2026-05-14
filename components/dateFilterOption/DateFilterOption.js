"use client";

import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function DateFilterOption({ title, onChange }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (onChange) {
            onChange(date?.format("YYYY-MM-DD"));
        }
    };

    return (
        <div className="date-filter-option">
            <div className="title">
                <p className="text-[13px] font-semibold text-gray-900">
                    {title}
                </p>
            </div>
            <div className="date-picker mt-2">
                <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    inputClass="w-full border border-gray-300 p-2 rounded-lg text-gray-800 cursor-pointer focus:outline-none focus:border-emerald-600"
                    containerClassName="w-full"
                    placeholder="انتخاب تاریخ"
                    format="YYYY-MM-DD"
                    render={(value, openCalendar) => (
                        <div
                            onClick={openCalendar}
                            className="cursor-pointer border border-gray-300 p-2 rounded-lg flex justify-between items-center"
                        >
                            <div className="text-gray-800">
                                {value || "انتخاب تاریخ"}
                            </div>
                            <FontAwesomeIcon
                                icon={faCalendar}
                                className="text-emerald-600"
                            />
                        </div>
                    )}
                />
            </div>
        </div>
    );
}
