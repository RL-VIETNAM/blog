'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
    value: string;
    onChange: (url: string, publicId?: string) => void;
    folder?: string;
    aspectRatio?: '16:9' | '1:1' | '4:3';
    maxWidth?: number;
    maxHeight?: number;
    disabled?: boolean;
}

export default function ImageUploader({
    value,
    onChange,
    folder = 'blog/featured',
    aspectRatio,
    maxWidth,
    maxHeight,
    disabled = false,
}: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState(value);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError('');

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('File phải là ảnh');
            return;
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            setError('File quá lớn. Tối đa 10MB');
            return;
        }

        // Show preview immediately
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to server
        try {
            setIsUploading(true);
            setUploadProgress(0);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);
            if (maxWidth) formData.append('width', maxWidth.toString());
            if (maxHeight) formData.append('height', maxHeight.toString());

            // Simulate progress (since fetch doesn't support progress)
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => Math.min(prev + 10, 90));
            }, 200);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            clearInterval(progressInterval);
            setUploadProgress(100);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Upload thất bại');
            }

            const data = await response.json();

            // Update parent component with new URL
            onChange(data.url, data.publicId);
            setPreviewUrl(data.url);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
            setPreviewUrl(value); // Revert to original
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const handleRemove = () => {
        setPreviewUrl('');
        onChange('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-3">
            {/* Preview Area */}
            {previewUrl ? (
                <div className="relative group">
                    <div
                        className={`relative overflow-hidden border border-gray-300 bg-gray-100 ${aspectRatio === '16:9'
                                ? 'aspect-video'
                                : aspectRatio === '1:1'
                                    ? 'aspect-square'
                                    : aspectRatio === '4:3'
                                        ? 'aspect-[4/3]'
                                        : 'min-h-[200px]'
                            }`}
                    >
                        <Image
                            src={previewUrl}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                        {isUploading && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-48 h-2 bg-gray-300 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                    <p className="text-white text-sm mt-2">
                                        Đang upload... {uploadProgress}%
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Overlay buttons */}
                    {!isUploading && !disabled && (
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                            <button
                                type="button"
                                onClick={handleClick}
                                className="px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-100 transition-colors text-sm font-medium"
                            >
                                Thay đổi
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
                            >
                                Xóa
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                /* Upload Area */
                <button
                    type="button"
                    onClick={handleClick}
                    disabled={disabled || isUploading}
                    className={`w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${aspectRatio === '16:9'
                            ? 'aspect-video'
                            : aspectRatio === '1:1'
                                ? 'aspect-square'
                                : aspectRatio === '4:3'
                                    ? 'aspect-[4/3]'
                                    : 'min-h-[200px]'
                        } flex flex-col items-center justify-center`}
                >
                    <svg
                        className="w-12 h-12 text-gray-400 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="text-gray-600 font-medium mb-1">
                        Click để chọn ảnh
                    </p>
                    <p className="text-gray-500 text-sm">
                        PNG, JPG, WebP. Tối đa 10MB
                    </p>
                </button>
            )}

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={disabled || isUploading}
            />

            {/* Error message */}
            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}
        </div>
    );
}
