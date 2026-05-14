export default function ResUserInfoBoxLoading() {
    return (
        <div className="user-info-loading p-2 rounded-lg gap-3 border border-gray-200 flex items-center w-full animate-pulse">
            <div className="icon size-10 rounded-lg bg-gray-300"></div>
            <div className="text flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-28"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
        </div>
    );
}
