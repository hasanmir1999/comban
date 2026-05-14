export default function UserInfoBoxLoading() {
    return (
        <div className="user-info-box-loading hidden p-2 rounded-lg gap-3 border border-gray-200 sm:flex items-center w-70 animate-pulse">
            <div className="icon size-10 rounded-lg bg-gray-300"></div>
            <div className="text flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
        </div>
    );
}
