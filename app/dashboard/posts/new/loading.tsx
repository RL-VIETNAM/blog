import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function NewPostLoading() {
    return (
        <div className="space-y-6">
            <div>
                <div className="h-9 w-48 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-5 w-64 bg-gray-200 animate-pulse rounded mt-2"></div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="space-y-6">
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50">
                            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                        <div className="p-6 bg-white space-y-6">
                            {[...Array(4)].map((_, index) => (
                                <div key={index}>
                                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded mb-2"></div>
                                    <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <div className="px-4 py-3 bg-gray-50">
                            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                        <div className="p-6 bg-white">
                            <div className="h-96 w-full bg-gray-200 animate-pulse rounded"></div>
                        </div>
                    </div>

                    <div className="flex justify-center py-8">
                        <LoadingSpinner size="md" />
                    </div>
                </div>
            </div>
        </div>
    );
}
