'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';

interface DeletePostButtonProps {
    postId: string;
    postTitle: string;
}

export default function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Xóa bài viết thất bại');
            }

            setShowConfirm(false);
            setToast({ message: 'Xóa bài viết thành công', type: 'success' });

            setTimeout(() => {
                router.refresh();
            }, 500);
        } catch (error) {
            console.error('Error deleting post:', error);
            setToast({ message: 'Có lỗi xảy ra khi xóa bài viết', type: 'error' });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
                Xóa
            </button>

            {showConfirm && (
                <ConfirmModal
                    title="Xác nhận xóa"
                    message={`Bạn có chắc muốn xóa bài viết "${postTitle}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                    isDeleting={isDeleting}
                />
            )}

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
}
