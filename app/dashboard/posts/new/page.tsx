import { redirect } from 'next/navigation';
import { getCurrentUser, getUserProfile } from '@/lib/auth-server';
import PostForm from '@/components/dashboard/PostForm';

export default async function NewPostPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    const profile = await getUserProfile(user.id);

    if (!profile || profile.role !== 'admin') {
        redirect('/');
    }

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-900" style={{ letterSpacing: '0.02em' }}>Tạo bài viết mới</h1>
                <p className="text-gray-600">Thêm bài viết mới vào blog</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <PostForm />
            </div>
        </div>
    );
}
