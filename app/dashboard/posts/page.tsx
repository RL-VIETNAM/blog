import { redirect } from 'next/navigation';
import { getCurrentUser, getUserProfile } from '@/lib/auth-server';
import { getPosts } from '@/lib/posts';
import Link from 'next/link';

export default async function PostsPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    const profile = await getUserProfile(user.id);

    if (!profile || profile.role !== 'admin') {
        redirect('/');
    }

    const posts = await getPosts();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Quản lý bài viết</h1>
                    <p className="text-gray-600 mt-1">Tạo và quản lý tất cả bài viết</p>
                </div>
                <Link
                    href="/dashboard/posts/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Tạo bài viết mới
                </Link>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Chưa có bài viết nào</p>
                        <Link
                            href="/dashboard/posts/new"
                            className="inline-block mt-4 text-blue-600 hover:text-blue-700"
                        >
                            Tạo bài viết đầu tiên
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
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
                                {posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {post.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {post.excerpt.substring(0, 60)}...
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className="px-2 py-1 text-xs font-medium rounded-full"
                                                style={{
                                                    backgroundColor: post.category.color + '20',
                                                    color: post.category.color,
                                                }}
                                            >
                                                {post.category.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{post.author.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/dashboard/posts/${post.id}/edit`}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                Sửa
                                            </Link>
                                            <button className="text-red-600 hover:text-red-900">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
