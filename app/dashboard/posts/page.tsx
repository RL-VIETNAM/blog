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
            <div className="flex items-center justify-end">
                <Link
                    href="/dashboard/posts/new"
                    className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                    Tạo bài viết mới
                </Link>
            </div>

            {posts.length === 0 ? (
                <p className="text-gray-500 text-center mt-8">Chưa có bài viết</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase" style={{ letterSpacing: '0.1em' }}>
                                    Tiêu đề
                                </th>
                                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase" style={{ letterSpacing: '0.1em' }}>
                                    Danh mục
                                </th>
                                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase" style={{ letterSpacing: '0.1em' }}>
                                    Tác giả
                                </th>
                                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase" style={{ letterSpacing: '0.1em' }}>
                                    Ngày xuất bản
                                </th>
                                <th className="px-8 py-4 text-right text-xs font-semibold text-gray-600 uppercase" style={{ letterSpacing: '0.1em' }}>
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="px-8 py-5">
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
                                    <td className="px-8 py-5 whitespace-nowrap">
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
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{post.author.name}</div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {new Date(post.publishedAt).toLocaleDateString('vi-VN')}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
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
    );
}
