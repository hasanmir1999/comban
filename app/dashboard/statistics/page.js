"use client";

import DateFilterOption from "@/components/dateFilterOption/DateFilterOption";
import FilterOption from "@/components/filterOption/FilterOption";
import InputContainer from "@/components/inputContainer/InputContainer";
import StatisticItem from "@/components/statisticItem/StatisticItem";
import {
    faClipboardCheck,
    faSpinner,
    faTractor,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function StatisticsPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        owner_name: "",
        owner_phone: "",
        combine_model: "",
        serial_number: "",
        manufacture_year: null,
        brand: "",
        engine_number: "",
        chassis_number: "",
    });

    const combineBrand = [
        {
            id: 0,
            name: "",
        },
        {
            id: 1,
            name: "هپکو",
        },
        {
            id: 2,
            name: "کاترپیلار",
        },
        {
            id: 3,
            name: "بنز",
        },
        {
            id: 4,
            name: "لامبورگینی",
        },
    ];

    const invResult = [
        {
            id: 0,
            name: "همه",
        },
        {
            id: 1,
            name: "قبول",
        },
        {
            id: 2,
            name: "رد",
        },
    ];
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
        <div className="statistics-page bg-white w-full min-h-svh pt-30 pb-5 px-10 lg:pr-90">
            <div className="main-content">
                <div className="statistics-container">
                    <div className="title flex items-center gap-2">
                        <div className="icon">
                            <div className="size-5 rounded-lg bg-emerald-600"></div>
                        </div>
                        <h5 className="text-lg text-gray-800 font-bold">
                            آمار کلی
                        </h5>
                    </div>
                    <div className="statistics-items-container mt-8">
                        <div className="row flex flex-wrap gap-y-5">
                            <div className="col w-full sm:w-1/2 lg:w-4/12 px-2">
                                <StatisticItem
                                    title={"تعداد کل کمباین ها"}
                                    count={25}
                                    icon={<FontAwesomeIcon icon={faTractor} />}
                                />
                            </div>
                            <div className="col w-full sm:w-1/2 lg:w-4/12 px-2">
                                <StatisticItem
                                    title={"تعداد کل بازرسی ها"}
                                    count={25}
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faClipboardCheck}
                                        />
                                    }
                                />
                            </div>
                            <div className="col w-full sm:w-1/2 lg:w-4/12 px-2">
                                <StatisticItem
                                    title={"تعداد کل کاربران"}
                                    count={25}
                                    icon={<FontAwesomeIcon icon={faUsers} />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="report-container mt-10">
                    <div className="title flex items-center gap-2">
                        <div className="icon">
                            <div className="size-5 rounded-lg bg-emerald-600"></div>
                        </div>
                        <h5 className="text-lg text-gray-800 font-bold">
                            گزارش های تحلیلی
                        </h5>
                    </div>
                    <div className="report-filters-and-list-container mt-8">
                        <div className="filter-container">
                            <div className="row flex flex-wrap gap-y-5">
                                <div className="col w-full sm:w-1/2  px-2">
                                    <FilterOption
                                        title={"برند کمباین:"}
                                        optionItems={combineBrand}
                                    />
                                </div>
                                <div className="col w-full sm:w-1/2 px-2">
                                    <FilterOption
                                        title={"نتیجه بازرسی:"}
                                        optionItems={invResult}
                                    />
                                </div>
                                <div className="col w-full sm:w-1/2 px-2">
                                    <DateFilterOption
                                        title={"از تاریخ:"}
                                        onChange={(date) => setStartDate(date)}
                                    />
                                </div>
                                <div className="col w-full sm:w-1/2 px-2">
                                    <DateFilterOption
                                        title={"تا تاریخ:"}
                                        onChange={(date) => setEndDate(date)}
                                    />
                                </div>
                            </div>
                            <div className="btn-container mt-5 flex justify-center items-center">
                                <button className="bg-emerald-600 py-1 px-10 rounded-lg text-white">
                                    اعمال فیلتر
                                </button>
                            </div>
                        </div>
                        <div className="list-container rounded-lg mt-5 overflow-x-auto">
                            <div className="table-wrapper min-w-200">
                                <div className="table-header bg-emerald-600">
                                    <ul className="flex items-center">
                                        <li className="w-25 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                شناسه
                                            </p>
                                        </li>
                                        <li className="w-37.5 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                مالک
                                            </p>
                                        </li>
                                        <li className="w-30 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                برند
                                            </p>
                                        </li>
                                        <li className="w-30 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                مدل
                                            </p>
                                        </li>
                                        <li className="w-35 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                تاریخ بازرسی
                                            </p>
                                        </li>
                                        <li className="w-25 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                نتیجه
                                            </p>
                                        </li>
                                        <li className="flex-1 py-4 px-3">
                                            <p className="text text-white text-sm">
                                                بازرس
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="table-body bg-white border border-t-0 border-gray-300 rounded-lg rounded-t-none">
                                    <div className="row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                                        <div className="id w-25 px-3 shrink-0 text-sm text-gray-800">
                                            1
                                        </div>
                                        <div className="owner w-37.5 px-3 shrink-0 text-sm text-gray-800">
                                            محمد حسن میر
                                        </div>
                                        <div className="brand w-30 px-3 shrink-0 text-sm text-gray-800">
                                            هپکو
                                        </div>
                                        <div className="model w-30 px-3 shrink-0 text-sm text-gray-800">
                                            23e1
                                        </div>
                                        <div className="inspection-date w-35 px-3 shrink-0 text-sm text-gray-800">
                                            1405/05/05
                                        </div>
                                        <div className="result w-25 px-3 shrink-0 text-sm text-gray-800">
                                            قبول
                                        </div>
                                        <div className="inspector flex-1 px-3 text-sm text-gray-800">
                                            رضا مریدی
                                        </div>
                                    </div>
                                    <div className="row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                                        <div className="id w-25 px-3 shrink-0 text-sm text-gray-800">
                                            2
                                        </div>
                                        <div className="owner w-37.5 px-3 shrink-0 text-sm text-gray-800">
                                            علی احمدی
                                        </div>
                                        <div className="brand w-30 px-3 shrink-0 text-sm text-gray-800">
                                            کاترپیلار
                                        </div>
                                        <div className="model w-30 px-3 shrink-0 text-sm text-gray-800">
                                            45x2
                                        </div>
                                        <div className="inspection-date w-35 px-3 shrink-0 text-sm text-gray-800">
                                            1405/05/10
                                        </div>
                                        <div className="result w-25 px-3 shrink-0 text-sm text-gray-800">
                                            رد
                                        </div>
                                        <div className="inspector flex-1 px-3 text-sm text-gray-800">
                                            حسین کریمی
                                        </div>
                                    </div>
                                    <div className="row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                                        <div className="id w-25 px-3 shrink-0 text-sm text-gray-800">
                                            2
                                        </div>
                                        <div className="owner w-37.5 px-3 shrink-0 text-sm text-gray-800">
                                            علی احمدی
                                        </div>
                                        <div className="brand w-30 px-3 shrink-0 text-sm text-gray-800">
                                            کاترپیلار
                                        </div>
                                        <div className="model w-30 px-3 shrink-0 text-sm text-gray-800">
                                            45x2
                                        </div>
                                        <div className="inspection-date w-35 px-3 shrink-0 text-sm text-gray-800">
                                            1405/05/10
                                        </div>
                                        <div className="result w-25 px-3 shrink-0 text-sm text-gray-800">
                                            رد
                                        </div>
                                        <div className="inspector flex-1 px-3 text-sm text-gray-800">
                                            حسین کریمی
                                        </div>
                                    </div>
                                    <div className="row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                                        <div className="id w-25 px-3 shrink-0 text-sm text-gray-800">
                                            2
                                        </div>
                                        <div className="owner w-37.5 px-3 shrink-0 text-sm text-gray-800">
                                            علی احمدی
                                        </div>
                                        <div className="brand w-30 px-3 shrink-0 text-sm text-gray-800">
                                            کاترپیلار
                                        </div>
                                        <div className="model w-30 px-3 shrink-0 text-sm text-gray-800">
                                            45x2
                                        </div>
                                        <div className="inspection-date w-35 px-3 shrink-0 text-sm text-gray-800">
                                            1405/05/10
                                        </div>
                                        <div className="result w-25 px-3 shrink-0 text-sm text-gray-800">
                                            رد
                                        </div>
                                        <div className="inspector flex-1 px-3 text-sm text-gray-800">
                                            حسین کریمی
                                        </div>
                                    </div>
                                    <div className="row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                                        <div className="id w-25 px-3 shrink-0 text-sm text-gray-800">
                                            2
                                        </div>
                                        <div className="owner w-37.5 px-3 shrink-0 text-sm text-gray-800">
                                            علی احمدی
                                        </div>
                                        <div className="brand w-30 px-3 shrink-0 text-sm text-gray-800">
                                            کاترپیلار
                                        </div>
                                        <div className="model w-30 px-3 shrink-0 text-sm text-gray-800">
                                            45x2
                                        </div>
                                        <div className="inspection-date w-35 px-3 shrink-0 text-sm text-gray-800">
                                            1405/05/10
                                        </div>
                                        <div className="result w-25 px-3 shrink-0 text-sm text-gray-800">
                                            رد
                                        </div>
                                        <div className="inspector flex-1 px-3 text-sm text-gray-800">
                                            حسین کریمی
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="combine-list-container mt-10">
                    <div className="title flex items-center gap-2">
                        <div className="icon">
                            <div className="size-5 rounded-lg bg-emerald-600"></div>
                        </div>
                        <h5 className="text-lg text-gray-800 font-bold">
                            لیست کمباین ها
                        </h5>
                    </div>
                    <div className="search-and-list-container mt-8">
                        <div className="search-container">
                            <div className="row flex items-end gap-y-5">
                                <div className="col w-full px-2">
                                    <InputContainer
                                        title={"جستجو:"}
                                        placeHolder={
                                            "متن جستجو (مثلا نام مالک،سریال،شماره موتور،...)"
                                        }
                                        dir={"rtl"}
                                    />
                                </div>
                                <div className="col pr-2">
                                    <div className="btn-container flex items-center gap-2">
                                        <button className="text-white cursor-pointer bg-emerald-600 whitespace-nowrap py-1 px-3 rounded-lg">
                                            جستجو
                                        </button>
                                        <button className="text-white cursor-pointer bg-amber-500 whitespace-nowrap py-1 px-3 rounded-lg">
                                            نمایش همه
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="list-container rounded-lg mt-5 overflow-x-auto">
                            <div className="table-wrapper min-w-200">
                                <div className="table-header bg-emerald-600">
                                    <ul className="flex items-center">
                                        <li className="w-25 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                شناسه
                                            </p>
                                        </li>
                                        <li className="w-37.5 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                مالک
                                            </p>
                                        </li>
                                        <li className="w-30 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                تلفن
                                            </p>
                                        </li>
                                        <li className="w-30 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                برند
                                            </p>
                                        </li>
                                        <li className="w-35 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                مدل
                                            </p>
                                        </li>
                                        <li className="w-25 py-4 px-3 shrink-0">
                                            <p className="text text-white text-sm">
                                                سریال (VIN)
                                            </p>
                                        </li>
                                        <li className="flex-1 py-4 px-3">
                                            <p className="text text-white text-sm">
                                                شماره موتور
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="table-body bg-white border border-t-0 border-gray-300 rounded-lg rounded-t-none">
                                    <div className="row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                                        <div className="id w-25 px-3 shrink-0 text-sm text-gray-800">
                                            1
                                        </div>
                                        <div className="owner w-37.5 px-3 shrink-0 text-sm text-gray-800">
                                            محمد حسینی
                                        </div>
                                        <div className="brand w-30 px-3 shrink-0 text-sm text-gray-800">
                                            09012345678
                                        </div>
                                        <div className="model w-30 px-3 shrink-0 text-sm text-gray-800">
                                            هپکو
                                        </div>
                                        <div className="inspection-date w-35 px-3 shrink-0 text-sm text-gray-800">
                                            26xz2
                                        </div>
                                        <div className="result w-25 px-3 shrink-0 text-sm text-gray-800">
                                            1234
                                        </div>
                                        <div className="inspector flex-1 px-3 text-sm text-gray-800">
                                            232425
                                        </div>
                                    </div>
                                    <div className="row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                                        <div className="id w-25 px-3 shrink-0 text-sm text-gray-800">
                                            1
                                        </div>
                                        <div className="owner w-37.5 px-3 shrink-0 text-sm text-gray-800">
                                              عبد الله میرزایی
                                        </div>
                                        <div className="brand w-30 px-3 shrink-0 text-sm text-gray-800">
                                            09012345678
                                        </div>
                                        <div className="model w-30 px-3 shrink-0 text-sm text-gray-800">
                                            هپکو
                                        </div>
                                        <div className="inspection-date w-35 px-3 shrink-0 text-sm text-gray-800">
                                            26xz2
                                        </div>
                                        <div className="result w-25 px-3 shrink-0 text-sm text-gray-800">
                                            1234
                                        </div>
                                        <div className="inspector flex-1 px-3 text-sm text-gray-800">
                                            232425
                                        </div>
                                    </div>
                                    <div className="row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                                        <div className="id w-25 px-3 shrink-0 text-sm text-gray-800">
                                            1
                                        </div>
                                        <div className="owner w-37.5 px-3 shrink-0 text-sm text-gray-800">
                                            محمد قادری
                                        </div>
                                        <div className="brand w-30 px-3 shrink-0 text-sm text-gray-800">
                                            09012345678
                                        </div>
                                        <div className="model w-30 px-3 shrink-0 text-sm text-gray-800">
                                            هپکو
                                        </div>
                                        <div className="inspection-date w-35 px-3 shrink-0 text-sm text-gray-800">
                                            26xz2
                                        </div>
                                        <div className="result w-25 px-3 shrink-0 text-sm text-gray-800">
                                            1234
                                        </div>
                                        <div className="inspector flex-1 px-3 text-sm text-gray-800">
                                            232425
                                        </div>
                                    </div>
                                    <div className="row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
                                        <div className="id w-25 px-3 shrink-0 text-sm text-gray-800">
                                            1
                                        </div>
                                        <div className="owner w-37.5 px-3 shrink-0 text-sm text-gray-800">
                                            محمد حسن تقدیری
                                        </div>
                                        <div className="brand w-30 px-3 shrink-0 text-sm text-gray-800">
                                            09012345678
                                        </div>
                                        <div className="model w-30 px-3 shrink-0 text-sm text-gray-800">
                                            هپکو
                                        </div>
                                        <div className="inspection-date w-35 px-3 shrink-0 text-sm text-gray-800">
                                            26xz2
                                        </div>
                                        <div className="result w-25 px-3 shrink-0 text-sm text-gray-800">
                                            1234
                                        </div>
                                        <div className="inspector flex-1 px-3 text-sm text-gray-800">
                                            232425
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
