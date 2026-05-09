"use client";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function FilterOption({ title, optionItems }) {
    const [filterStat, setFilterStat] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    return (
        <div className="filter-option">
            <div className="title">
                <p className=" text-[13px] font-semibold text-gray-900">
                    {title}
                </p>
            </div>
            <div className="filter relative mt-2">
                <div
                    onClick={() => setFilterStat(!filterStat)}
                    className="display-selected-item cursor-pointer border border-gray-300 p-2 rounded-lg flex justify-between items-center"
                >
                    <div className="selected-item-text text-gray-800">
                        {selectedItem === "" ? "همه" : selectedItem}
                    </div>
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`text-gray-800 transition-all duration-300 ${filterStat && "rotate-180"}`}
                    />
                </div>
                <div
                    className={`option-list absolute bg-white w-full transition-all duration-300 ${filterStat ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} border border-gray-300 rounded-lg mt-2 p-1`}
                >
                    <ul>
                        {optionItems.map((item) => {
                            return (
                                <li
                                    key={item.id}
                                    onClick={() => {
                                        setSelectedItem(item.name);
                                        setFilterStat(false);
                                    }}
                                    className="rounded-lg cursor-pointer my-1 p-2 transition-all duration-300 text-gray-800 hover:text-white hover:bg-emerald-600"
                                >
                                    <p className="text">
                                        {item.name === "" ? "همه" : item.name}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
