import { NextRequest, NextResponse } from 'next/server';
import { deleteImage } from '@/lib/cloudinary';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { publicId: string } }
) {
    try {
        const { publicId } = params;

        if (!publicId) {
            return NextResponse.json(
                { error: 'Public ID không hợp lệ' },
                { status: 400 }
            );
        }

        // Decode public ID vì nó được encode trong URL
        const decodedPublicId = decodeURIComponent(publicId);

        // Xóa ảnh từ Cloudinary
        const result = await deleteImage(decodedPublicId);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || 'Xóa ảnh thất bại' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Xóa ảnh thành công',
        });
    } catch (error) {
        console.error('Delete API error:', error);
        return NextResponse.json(
            { error: 'Có lỗi xảy ra khi xóa ảnh' },
            { status: 500 }
        );
    }
}
