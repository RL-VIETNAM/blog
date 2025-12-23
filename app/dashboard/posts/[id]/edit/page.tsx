import { redirect } from 'next/navigation';
import { getCurrentUser, getUserProfile } from '@/lib/auth-server';
import { getPostById } from '@/lib/posts';
import PostForm from '@/components/dashboard/PostForm';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login');
    }

    const profile = await getUserProfile(user.id);

    if (!profile || profile.role !== 'admin') {
        redirect('/');
    }

    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        redirect('/dashboard/posts');
    }

    const initialData = {
        title: post.title,
        slug: post.slug,
        category: post.category.name,
        featuredImage: post.featuredImage || '',
        content: post.content,
    };

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-900" style={{ letterSpacing: '0.02em' }}>Sửa bài viết</h1>
                <p className="text-gray-600">Chỉnh sửa nội dung bài viết</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <PostForm postId={id} initialData={initialData} />
            </div>
        </div>
    );
}
