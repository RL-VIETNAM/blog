'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TiptapEditor from '@/components/editor/TiptapEditor';
import { calculateReadingTime } from '@/lib/post-utils';

interface EditPostFormProps {
    postId: string;
    initialData: {
        title: string;
        slug: string;
        category: string;
        featuredImage: string;
        content: string;
    };
}

interface FormData {
    title: string;
    slug: string;
    category: string;
    featuredImage: string;
    content: string;
}

export default function EditPostForm({ postId, initialData }: EditPostFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>(initialData);
    const [isMetadataOpen, setIsMetadataOpen] = useState(true);
    const [isContentOpen, setIsContentOpen] = useState(true);
    const [readingTime, setReadingTime] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (formData.content) {
            const time = calculateReadingTime(formData.content);
            setReadingTime(time);
        }
    }, [formData.content]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleContentChange = (content: string) => {
        setFormData((prev) => ({
            ...prev,
            content,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    reading_time: readingTime,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Cập nhật bài viết thất bại');
            }

            router.push('/dashboard/posts');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push('/dashboard/posts');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="border border-gray-300 rounded-lg overflow-hidden">
                <button
                    type="button"
                    onClick={() => setIsMetadataOpen(!isMetadataOpen)}
                    className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                >
                    <span className="font-semibold text-gray-900">Metadata</span>
                    <svg
                        className={`w-5 h-5 text-gray-600 transition-transform ${isMetadataOpen ? 'rotate-180' : ''
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {isMetadataOpen && (
                    <div className="p-6 bg-white">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tiêu đề bài viết
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Nhập tiêu đề bài viết"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="slug-bai-viet"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Danh mục
                                </label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Nhập danh mục"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div>
                                <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
                                    URL ảnh đại diện
                                </label>
                                <input
                                    type="url"
                                    id="featuredImage"
                                    name="featuredImage"
                                    value={formData.featuredImage}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://example.com/image.jpg"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden">
                <button
                    type="button"
                    onClick={() => setIsContentOpen(!isContentOpen)}
                    className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">Nội dung bài viết</span>
                        {readingTime > 0 && (
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                                {readingTime} phút đọc
                            </span>
                        )}
                    </div>
                    <svg
                        className={`w-5 h-5 text-gray-600 transition-transform ${isContentOpen ? 'rotate-180' : ''
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {isContentOpen && (
                    <div className="p-6 bg-white">
                        <TiptapEditor content={formData.content} onChange={handleContentChange} />
                    </div>
                )}
            </div>

            <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
            </div>
        </form>
    );
}
