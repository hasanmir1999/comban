export default function UserItemLoading() {
    return (
        <div className="user-item-loading border border-gray-300 p-3 rounded-lg flex justify-between items-center animate-pulse">
            <div className="flex items-center gap-2">
                <div className="bg-gray-300 size-10 rounded-lg" />
                <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-28" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="bg-gray-300 size-9 rounded-lg" />
                <div className="bg-gray-300 size-9 rounded-lg" />
                <div className="bg-gray-300 size-9 rounded-lg" />
            </div>
        </div>
    );
}
