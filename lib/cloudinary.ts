import { v2 as cloudinary } from 'cloudinary';

// Cấu hình Cloudinary với credentials từ env
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadImageOptions {
    folder?: string;
    transformation?: {
        width?: number;
        height?: number;
        crop?: 'fill' | 'fit' | 'scale' | 'limit';
        quality?: 'auto' | number;
        format?: 'webp' | 'jpg' | 'png';
    };
}

export interface UploadResult {
    success: boolean;
    url?: string;
    publicId?: string;
    width?: number;
    height?: number;
    format?: string;
    error?: string;
}

export interface DeleteResult {
    success: boolean;
    error?: string;
}

/**
 * Upload ảnh lên Cloudinary
 * @param fileBuffer - Buffer của file ảnh
 * @param options - Tùy chọn upload (folder, transformation)
 * @returns UploadResult với URL và thông tin ảnh
 */
export async function uploadImage(
    fileBuffer: Buffer,
    options: UploadImageOptions = {}
): Promise<UploadResult> {
    try {
        const { folder = 'blog', transformation } = options;

        // Chuyển buffer thành base64 data URI
        const base64Image = `data:image/png;base64,${fileBuffer.toString('base64')}`;

        // Upload lên Cloudinary
        const result = await cloudinary.uploader.upload(base64Image, {
            folder,
            resource_type: 'image',
            // Tự động optimize
            quality: transformation?.quality || 'auto',
            format: transformation?.format || 'webp',
            // Transformation nếu có
            ...(transformation?.width && { width: transformation.width }),
            ...(transformation?.height && { height: transformation.height }),
            ...(transformation?.crop && { crop: transformation.crop }),
        });

        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Upload thất bại',
        };
    }
}

/**
 * Xóa ảnh từ Cloudinary
 * @param publicId - Public ID của ảnh cần xóa
 * @returns DeleteResult
 */
export async function deleteImage(publicId: string): Promise<DeleteResult> {
    try {
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            return { success: true };
        } else {
            return {
                success: false,
                error: `Không thể xóa ảnh: ${result.result}`,
            };
        }
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Xóa ảnh thất bại',
        };
    }
}

/**
 * Lấy URL ảnh với transformation
 * @param publicId - Public ID của ảnh
 * @param options - Transformation options
 * @returns URL đã được transform
 */
export function getTransformedImageUrl(
    publicId: string,
    options: {
        width?: number;
        height?: number;
        crop?: 'fill' | 'fit' | 'scale' | 'limit';
        quality?: 'auto' | number;
        format?: 'webp' | 'jpg' | 'png';
    } = {}
): string {
    return cloudinary.url(publicId, {
        secure: true,
        transformation: [
            {
                width: options.width,
                height: options.height,
                crop: options.crop || 'fill',
                quality: options.quality || 'auto',
                format: options.format || 'webp',
            },
        ],
    });
}

/**
 * Extract public ID từ Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID hoặc null
 */
export function extractPublicId(url: string): string | null {
    try {
        // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
        const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
        return match ? match[1] : null;
    } catch {
        return null;
    }
}

export default cloudinary;
