export default function StatisticItem({ title, count, icon , statisticsStatus }) {


    return (
        <div className="statistic-item bg-white rounded-lg p-4 flex items-center justify-between gap-2 border border-emerald-600">
            <div className="text">
                <div className="title font-semibold text-gray-800 whitespace-nowrap">
                    {title}
                </div>
                {statisticsStatus === "pending" ? (
                    <div className="h-4 mt-1.5 bg-gray-300 rounded w-8 animate-pulse"></div>
                ) : statisticsStatus === "success" ? (
                    <div className="count mt-1.5 text-sm text-gray-600">{count}</div>
                ) : (
                    statisticsStatus === "error" && (
                        <div className="error mt-1.5 text-xs text-red-500">
                            خطا در دریافت اطلاعات
                        </div>
                    )
                )}
            </div>
            <div className="icon text-emerald-600 text-2xl">{icon}</div>
        </div>
    );
}
