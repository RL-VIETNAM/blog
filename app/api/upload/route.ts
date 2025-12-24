import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string | null;
        const width = formData.get('width') as string | null;
        const height = formData.get('height') as string | null;

        if (!file) {
            return NextResponse.json(
                { error: 'Không có file được gửi lên' },
                { status: 400 }
            );
        }

        // Kiểm tra type file
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'File phải là ảnh' },
                { status: 400 }
            );
        }

        // Kiểm tra kích thước file (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File quá lớn. Tối đa 10MB' },
                { status: 400 }
            );
        }

        // Chuyển file thành buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload lên Cloudinary
        const result = await uploadImage(buffer, {
            folder: folder || 'blog',
            transformation: {
                ...(width && { width: parseInt(width) }),
                ...(height && { height: parseInt(height) }),
                quality: 'auto',
                format: 'webp',
            },
        });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || 'Upload thất bại' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            url: result.url,
            publicId: result.publicId,
            width: result.width,
            height: result.height,
            format: result.format,
        });
    } catch (error) {
        console.error('Upload API error:', error);
        return NextResponse.json(
            { error: 'Có lỗi xảy ra khi upload ảnh' },
            { status: 500 }
        );
    }
}
