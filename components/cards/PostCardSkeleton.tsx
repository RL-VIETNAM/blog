export default function PostCardSkeleton() {
    return (
        <div className="mb-16 pb-16 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0 animate-pulse">
            <div className="flex gap-8 max-md:flex-col max-md:gap-4">
                <div className="w-64 h-48 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 flex flex-col">
                    <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
                    <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2 mb-4 flex-1">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-4 mt-auto">
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
