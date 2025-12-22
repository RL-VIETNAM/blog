import { redirect } from 'next/navigation';
import { getCurrentUser, getUserProfile } from '@/lib/auth-server';

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    const profile = await getUserProfile(user.id);

    if (!profile || profile.role !== 'admin') {
        redirect('/');
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Chào mừng trở lại, {profile.display_name}
                </h1>
                <p className="text-gray-600">
                    Quản lý nội dung blog của bạn từ dashboard này
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Bài viết
                        </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                        Tạo, sửa và quản lý bài viết
                    </p>
                    <a
                        href="/dashboard/posts"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        Quản lý bài viết
                    </a>
                </div>
            </div>
        </div>
    );
}
