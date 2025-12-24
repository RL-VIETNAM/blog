'use client';

import { useState, useRef } from 'react';
import { Editor } from '@tiptap/react';

interface ImageUploadButtonProps {
    editor: Editor;
}

export default function ImageUploadButton({ editor }: ImageUploadButtonProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError('');

        if (!file.type.startsWith('image/')) {
            setError('File phải là ảnh');
            return;
        }

        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            setError('File quá lớn. Tối đa 10MB');
            return;
        }

        try {
            setIsUploading(true);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'blog/content');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Upload thất bại');
            }

            const data = await response.json();

            editor.chain().focus().setImage({ src: data.url }).run();

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                disabled={isUploading}
                className="px-3 py-1.5 rounded text-sm font-medium bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Chèn ảnh"
            >
                {isUploading ? 'Uploading...' : 'Image'}
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isUploading}
            />

            {error && (
                <div className="absolute top-full left-0 mt-2 px-3 py-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded shadow-lg z-10">
                    {error}
                </div>
            )}
        </>
    );
}
