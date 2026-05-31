"use client";

import DateFilterOption from "@/components/dateFilterOption/DateFilterOption";
import FilterOption from "@/components/filterOption/FilterOption";
import StatisticItem from "@/components/statisticItem/StatisticItem";
import {
    faClipboardCheck,
    faTractor,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useStatistics } from "@/hooks/useStatistics";
import { useInspections } from "@/hooks/useInspections";
import TableLoading from "@/components/tableLoading/TableLoading";
import TabelError from "@/components/tabelError/TabelError";
import InputContainer from "@/components/inputContainer/InputContainer";
import { useCombines } from "@/hooks/useCombines";
import TabelNotFound from "@/components/tabelNotFound/TabelNotFound";

export default function StatisticsPage() {
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    // const { data: statistics, status: statisticsStatus } = useStatistics();
    const { data: inspections, isLoading, isError, error } = useInspections();
    const { data: combines, status: combinesStatus } = useCombines(searchTerm);

    const [filters, setFilters] = useState({
        brand: "",
        result: "",
        fromDate: "",
        toDate: "",
    });

    const combineBrand = [
        { id: 0, name: "همه" },
        { id: 1, name: "جان دیر" },
        { id: 2, name: "نیوهلند" },
        { id: 3, name: "کلاس" },
        { id: 4, name: "کیس" },
    ];

    const invResult = [
        { id: 0, name: "همه" },
        { id: 1, name: "قبول" },
        { id: 2, name: "رد" },
    ];
    const showAllHandler = () => {
        setSearchInput("");
        setSearchTerm("");
    };
    const searchHandler = () => {
        setSearchTerm(searchInput);
    };

    return (
        <div className="statistics-page bg-white w-full min-h-svh pt-30 pb-5 px-10 lg:pr-90">
            <div className="main-content">
                {/* <div className="statistics-container">
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
                            <div
                                className="col w-full sm:w-1/2 lg:w-4/12 px-2"
                                key="stat-combines"
                            >
                                <StatisticItem
                                    title={"تعداد کل کمباین ها"}
                                    statisticsStatus={statisticsStatus}
                                    count={statistics?.combines}
                                    icon={<FontAwesomeIcon icon={faTractor} />}
                                />
                            </div>
                            <div
                                className="col w-full sm:w-1/2 lg:w-4/12 px-2"
                                key="stat-inspections"
                            >
                                <StatisticItem
                                    title={"تعداد کل بازرسی ها"}
                                    statisticsStatus={statisticsStatus}
                                    count={statistics?.inspections}
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faClipboardCheck}
                                        />
                                    }
                                />
                            </div>
                            <div
                                className="col w-full sm:w-1/2 lg:w-4/12 px-2"
                                key="stat-users"
                            >
                                <StatisticItem
                                    title={"تعداد کل کاربران"}
                                    statisticsStatus={statisticsStatus}
                                    count={statistics?.users}
                                    icon={<FontAwesomeIcon icon={faUsers} />}
                                />
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="report-container">
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
                                <div
                                    className="col w-full sm:w-1/2 px-2"
                                    key="filter-brand"
                                >
                                    <FilterOption
                                        title={"برند کمباین:"}
                                        optionItems={combineBrand}
                                        onClick={(value) =>
                                            setFilters({
                                                ...filters,
                                                brand: value,
                                            })
                                        }
                                    />
                                </div>
                                <div
                                    className="col w-full sm:w-1/2 px-2"
                                    key="filter-result"
                                >
                                    <FilterOption
                                        title={"نتیجه بازرسی:"}
                                        optionItems={invResult}
                                        onChange={(value) =>
                                            setFilters({
                                                ...filters,
                                                result: value,
                                            })
                                        }
                                    />
                                </div>
                                <div
                                    className="col w-full sm:w-1/2 px-2"
                                    key="filter-from-date"
                                >
                                    <DateFilterOption
                                        title={"از تاریخ:"}
                                        onChange={(date) =>
                                            setFilters({
                                                ...filters,
                                                fromDate: date,
                                            })
                                        }
                                    />
                                </div>
                                <div
                                    className="col w-full sm:w-1/2 px-2"
                                    key="filter-to-date"
                                >
                                    <DateFilterOption
                                        title={"تا تاریخ:"}
                                        onChange={(date) =>
                                            setFilters({
                                                ...filters,
                                                toDate: date,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="btn-container mt-5 flex justify-center items-center">
                                <button className="bg-emerald-600 cursor-pointer py-1 px-10 rounded-lg text-white hover:bg-emerald-700 transition-colors">
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
                                    {isLoading && <TableLoading />}

                                    {isError && <TabelError />}

                                    {!isLoading &&
                                        !isError &&
                                        inspections?.length === 0 && (
                                            <div className="p-8 text-center text-gray-600">
                                                هیچ بازرسی یافت نشد
                                            </div>
                                        )}

                                    {!isLoading &&
                                        !isError &&
                                        inspections?.map((inspection) => (
                                            <div
                                                key={inspection.id}
                                                className="row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="w-25 px-3 shrink-0 text-sm text-gray-800">
                                                    {inspection.id}
                                                </div>
                                                <div
                                                    className="w-37.5 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={inspection.fullname}
                                                >
                                                    {inspection.fullname}
                                                </div>
                                                <div
                                                    className="w-30 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={inspection.brand}
                                                >
                                                    {inspection.brand}
                                                </div>
                                                <div
                                                    className="w-30 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                    title={inspection.model}
                                                >
                                                    {inspection.model}
                                                </div>
                                                <div className="w-35 px-3 shrink-0 text-sm text-gray-800">
                                                    {inspection.inspection_date}
                                                </div>
                                                <div className="w-25 px-3 shrink-0 text-sm text-gray-800">
                                                    {inspection.result ===
                                                    "good"
                                                        ? "قبول"
                                                        : "رد"}
                                                </div>
                                                <div
                                                    className="flex-1 px-3 text-sm text-gray-800 truncate"
                                                    title={
                                                        inspection.inspector_name
                                                    }
                                                >
                                                    {inspection.inspector_name}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="combine-list-container mt-15">
                    <div className="title flex items-center gap-2">
                        <div className="icon">
                            <div className="size-5 rounded-lg bg-emerald-600"></div>
                        </div>
                        <h5 className="text-lg text-gray-800 font-bold">
                            لیست کمباین ها
                        </h5>
                    </div>
                    <div className="search-and-list-container mt-8">
                        <div className="search-container px-1">
                            <div className="row flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
                                <div className="col flex-1">
                                    <InputContainer
                                        type={"text"}
                                        title={"جستجو کمباین مورد نظر:"}
                                        placeHolder={
                                            "متن جستجو (مثلا نام مالک،سریال،شماره موتور،...)"
                                        }
                                        onChange={(v) => {
                                            setSearchInput(v);
                                        }}
                                        dir={"rtl"}
                                    />
                                </div>
                                <div className="col">
                                    <div className="btn-container flex items-center gap-2">
                                        <button
                                            onClick={searchHandler}
                                            className="text-white cursor-pointer bg-emerald-600 whitespace-nowrap py-1 px-4 rounded-lg text-xs sm:text-sm"
                                        >
                                            جستجو
                                        </button>
                                        <button
                                            onClick={showAllHandler}
                                            className="text-white cursor-pointer bg-amber-500 whitespace-nowrap py-1 px-4 rounded-lg text-xs sm:text-sm"
                                        >
                                            نمایش همه
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="list-container rounded-lg mt-5 overflow-x-auto">
                            <div className="table-wrapper min-w-max">
                                <div className="table-header bg-emerald-600">
                                    <ul className="flex items-center">
                                        <li className="w-20 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                شناسه
                                            </p>
                                        </li>
                                        <li className="w-40 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                مالک
                                            </p>
                                        </li>
                                        <li className="w-32 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                تلفن
                                            </p>
                                        </li>
                                        <li className="w-28 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                برند
                                            </p>
                                        </li>
                                        <li className="w-28 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                مدل
                                            </p>
                                        </li>
                                        <li className="w-44 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                سریال (VIN)
                                            </p>
                                        </li>
                                        <li className="w-36 px-3 py-3 shrink-0">
                                            <p className="text-white text-sm font-medium">
                                                شماره موتور
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="table-body bg-white border border-t-0 border-gray-300 rounded-lg rounded-t-none">
                                    {combinesStatus === "pending" ? (
                                        <TableLoading />
                                    ) : combinesStatus === "success" ? (
                                        combines?.length === 0 ? (
                                            <TabelNotFound />
                                        ) : (
                                            combines?.map((combine) => (
                                                <div
                                                    key={combine.id}
                                                    className={`row p-3 flex items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer`}
                                                >
                                                    <div className="w-20 px-3 shrink-0 text-sm text-gray-800 truncate">
                                                        {combine.id}
                                                    </div>
                                                    <div
                                                        className="w-40 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                        title={
                                                            combine.owner_name
                                                        }
                                                    >
                                                        {combine.owner_name}
                                                    </div>
                                                    <div
                                                        className="w-32 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                        title={
                                                            combine.owner_phone
                                                        }
                                                    >
                                                        {combine.owner_phone}
                                                    </div>
                                                    <div
                                                        className="w-28 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                        title={combine.brand}
                                                    >
                                                        {combine.brand}
                                                    </div>
                                                    <div
                                                        className="w-28 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                        title={
                                                            combine.combine_model
                                                        }
                                                    >
                                                        {combine.combine_model}
                                                    </div>
                                                    <div
                                                        className="w-44 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                        title={
                                                            combine.serial_number
                                                        }
                                                    >
                                                        {combine.serial_number}
                                                    </div>
                                                    <div
                                                        className="w-36 px-3 shrink-0 text-sm text-gray-800 truncate"
                                                        title={
                                                            combine.engine_number
                                                        }
                                                    >
                                                        {combine.engine_number}
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    ) : (
                                        combinesStatus === "error" && (
                                            <TabelError />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
