import { redirect } from 'next/navigation';
import { getCurrentUser, getUserProfile } from '@/lib/auth-server';

export default async function EditPostPage({ params }: { params: { id: string } }) {
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
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Sửa bài viết</h1>
                <p className="text-gray-600 mt-1">Chỉnh sửa nội dung bài viết</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <p className="text-gray-500">Form sửa bài viết ID: {params.id} sẽ được thêm vào đây</p>
            </div>
        </div>
    );
}
