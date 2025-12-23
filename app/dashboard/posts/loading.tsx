import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function PostsLoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-end">
                <div className="h-10 w-40 bg-gray-200 animate-pulse rounded-md"></div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tiêu đề
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Danh mục
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tác giả
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày xuất bản
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {[...Array(3)].map((_, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-3 w-64 bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-4 w-28 bg-gray-200 animate-pulse rounded"></div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-4">
                                        <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 w-12 bg-gray-200 animate-pulse rounded"></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center py-4">
                <LoadingSpinner size="md" />
            </div>
        </div>
    );
}
