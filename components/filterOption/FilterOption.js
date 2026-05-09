"use client";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function FilterOption() {
    const [filterStat, setFilterStat] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");

    return (
        <div className="filter-option">
            <div className="title">
                <p className=" text-[13px] font-semibold text-gray-900">
                    برند کمباین:
                </p>
            </div>
            <div
                onClick={() => setFilterStat(!filterStat)}
                className="filter cursor-pointer mt-2"
            >
                <div className="display-selected-item border border-gray-300 p-2 rounded-lg flex justify-between items-center">
                    <div className="selected-item-text text-gray-800">
                        {selectedItem === "" ? "همه" : selectedItem}
                    </div>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`text-gray-800 transition-all duration-300 ${filterStat && "rotate-180"}`}
                    />
                </div>
                <div className="option-list border border-gray-300 rounded-lg mt-2 p-1">
                    <ul>
                        <li className="rounded-lg my-1 p-2 transition-all duration-300 text-gray-800 hover:text-white hover:bg-emerald-600">
                            <p className="text">سامسونگ</p>
                        </li>
                        <li className="rounded-lg my-1 p-2 transition-all duration-300 text-gray-800 hover:text-white hover:bg-emerald-600">
                            <p className="text">سامسونگ</p>
                        </li>
                        <li className="rounded-lg my-1 p-2 transition-all duration-300 text-gray-800 hover:text-white hover:bg-emerald-600">
                            <p className="text">سامسونگ</p>
                        </li>
                        <li className="rounded-lg my-1 p-2 transition-all duration-300 text-gray-800 hover:text-white hover:bg-emerald-600">
                            <p className="text">سامسونگ</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
