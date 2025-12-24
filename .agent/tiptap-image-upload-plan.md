# Kế hoạch thêm chức năng upload ảnh vào TiptapEditor

## Mục tiêu
Tích hợp chức năng upload và quản lý ảnh trong TiptapEditor để user có thể chèn ảnh vào nội dung bài viết.

## Phân tích hiện trạng

### Các thành phần đã có
1. API upload ảnh: `/api/upload` (POST)
2. Cloudinary utilities: `lib/cloudinary.ts`
3. ImageUploader component: `components/ui/ImageUploader.tsx`
4. TiptapEditor component: `components/editor/TiptapEditor.tsx`

### TiptapEditor hiện tại
- Sử dụng StarterKit basic
- Chưa có extension Image
- Chưa có UI upload ảnh trong toolbar

## Các bước thực hiện

### 1. Cài đặt dependencies
Cài đặt package Tiptap Image extension:
```bash
npm install @tiptap/extension-image
```

### 2. Tạo custom Image extension
Tạo file `components/editor/extensions/ImageExtension.ts` để customize extension Image với các tính năng:
- Hỗ trợ resize ảnh
- Hỗ trợ align (left, center, right)
- Hỗ trợ caption
- Validation kích thước ảnh

### 3. Tạo ImageUploadButton component
Tạo file `components/editor/ImageUploadButton.tsx` với các chức năng:
- Nút upload trong toolbar
- Input file ẩn
- Tích hợp với API `/api/upload`
- Hiển thị progress khi đang upload
- Insert ảnh vào editor sau khi upload thành công
- Validate file type và size

### 4. Cập nhật TiptapEditor
Chỉnh sửa `components/editor/TiptapEditor.tsx`:
- Import Image extension
- Thêm Image extension vào danh sách extensions
- Thêm ImageUploadButton vào toolbar
- Thêm các nút điều chỉnh ảnh (align, delete) khi focus vào ảnh
- Cập nhật CSS để hiển thị ảnh đẹp trong editor

### 5. Cập nhật styles
Thêm CSS cho ảnh trong editor:
- Style cho ảnh trong content editable
- Style cho ảnh khi được chọn (highlight)
- Style cho align left/center/right
- Responsive cho ảnh

### 6. Xử lý edge cases
- Xử lý khi upload thất bại
- Xử lý khi user xóa ảnh đã upload
- Xử lý paste ảnh từ clipboard
- Xử lý drag & drop ảnh vào editor

## Chi tiết kỹ thuật

### ImageExtension configuration
```typescript
Image.configure({
  inline: false,
  allowBase64: false,
  HTMLAttributes: {
    class: 'editor-image',
  },
})
```

### Upload flow
1. User click nút "Image" trong toolbar
2. Mở file picker
3. User chọn ảnh
4. Validate file
5. Upload lên Cloudinary qua API `/api/upload`
6. Nhận URL ảnh
7. Insert ảnh vào editor tại vị trí cursor
8. Lưu URL trong HTML content

### Data structure
Ảnh sẽ được lưu trong HTML content dưới dạng:
```html
<img src="cloudinary-url" alt="description" data-align="center" />
```

## Các file cần tạo/sửa

### Tạo mới
- `components/editor/extensions/ImageExtension.ts`
- `components/editor/ImageUploadButton.tsx`

### Chỉnh sửa
- `components/editor/TiptapEditor.tsx`
- `package.json` (thêm dependency)

## Testing checklist
- Upload ảnh PNG, JPG, WebP thành công
- Validate file type không đúng
- Validate file size quá lớn
- Hiển thị progress bar khi upload
- Insert ảnh vào đúng vị trí cursor
- Align ảnh left/center/right
- Xóa ảnh khỏi editor
- Ảnh hiển thị đúng khi save và load lại
- Responsive trên mobile
