

export default function StatisticItem({title , count , icon}) {
  return (
    <div className="statistic-item bg-white rounded-lg p-4 flex items-center justify-between gap-2 border border-emerald-600">
      <div className="text">
        <div className="title font-semibold text-gray-800 whitespace-nowrap">{title}</div>
        <div className="count text-sm text-gray-600">{count}</div>
      </div>
      <div className="icon text-emerald-600 text-2xl">
        {icon}
      </div>
    </div>
  )
}
