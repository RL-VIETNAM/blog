import { redirect } from 'next/navigation';
import { getCurrentUser, getUserProfile } from '@/lib/auth-server';
import PostForm from '@/components/dashboard/PostForm';
import { getCategories } from '@/lib/categories';

export default async function NewPostPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    const profile = await getUserProfile(user.id);

    if (!profile || profile.role !== 'admin') {
        redirect('/');
    }

    const categories = await getCategories();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Tạo bài viết mới</h1>
                <p className="text-gray-600 mt-1">Thêm bài viết mới vào blog</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <PostForm categories={categories} />
            </div>
        </div>
    );
}
