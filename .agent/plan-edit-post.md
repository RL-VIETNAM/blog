# Kế hoạch tạo trang sửa bài viết

## Mục tiêu
Tạo trang sửa bài viết cho admin với đầy đủ chức năng edit, update và preview.

## Cấu trúc database hiện tại
### Bảng posts
- id (UUID)
- slug (TEXT)
- title (TEXT)
- category (TEXT)
- featured_image (TEXT)
- content (TEXT)
- author_id (UUID)
- reading_time (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

## Các bước thực hiện

### Bước 1: Tạo server function để fetch post theo ID
**File**: `lib/posts.ts`
- Thêm function `getPostById(id: string)`
- Fetch post từ database
- Return null nếu không tìm thấy

### Bước 2: Tạo EditPostForm component
**File**: `components/dashboard/EditPostForm.tsx`
- Tương tự PostForm nhưng nhận props `initialData`
- Pre-fill tất cả trường với data hiện tại
- Submit sẽ UPDATE thay vì INSERT
- Có nút "Cập nhật" thay vì "Xuất bản"

### Bước 3: Tạo API route để update post
**File**: `app/api/posts/[id]/route.ts`
- Method: PUT hoặc PATCH
- Validate admin permission
- Update post trong database
- Tự động cập nhật reading_time từ content
- Return success/error response

### Bước 4: Update trang edit
**File**: `app/dashboard/posts/[id]/edit/page.tsx`
- Fetch post data theo ID
- Kiểm tra quyền admin
- Hiển thị EditPostForm với initialData
- Handle not found case

### Bước 5: Validation và Error Handling
- Kiểm tra post tồn tại
- Kiểm tra slug unique (trừ post hiện tại)
- Hiển thị loading state
- Hiển thị error messages
- Redirect sau khi update thành công

## Chi tiết implementation

### EditPostForm Props
```typescript
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
```

### Update API Request
```typescript
PUT /api/posts/[id]
Body: {
    title: string;
    slug: string;
    category: string;
    featured_image: string;
    content: string;
    reading_time: number; // tự động tính
}
```

### Update API Response
```typescript
Success: { success: true, data: Post }
Error: { error: string, details?: any }
```

## Flow hoạt động

1. User vào trang `/dashboard/posts/[id]/edit`
2. Server fetch post data từ database
3. Kiểm tra quyền admin
4. Render EditPostForm với data pre-filled
5. User chỉnh sửa nội dung
6. Click "Cập nhật"
7. Call API PUT `/api/posts/[id]`
8. API validate và update database
9. Redirect về `/dashboard/posts` với success message

## Các trường hợp cần xử lý

### Trường hợp thành công
- Update thành công
- Redirect về danh sách posts
- Hiển thị toast notification

### Trường hợp lỗi
- Post không tồn tại → 404
- Không có quyền → redirect về home
- Slug đã tồn tại → hiển thị error
- Network error → hiển thị error message
- Validation error → highlight field lỗi

## UI/UX

### Layout
- Giống form tạo mới
- 2 collapsible sections: Metadata và Content
- Reading time tự động tính
- Preview button (optional)

### Buttons
- "Hủy" → quay về danh sách
- "Cập nhật" → submit form

### Loading states
- Skeleton khi đang fetch data
- Disabled inputs khi đang submit
- Loading spinner trên button

## Reuse components

### Có thể reuse
- TiptapEditor
- Layout sections (collapsible)
- Validation logic
- Reading time calculator

### Cần tạo mới
- EditPostForm component
- Update API route
- getPostById function

## Testing checklist

- Fetch post đúng ID
- Pre-fill tất cả trường
- Update thành công
- Reading time tự động cập nhật
- Slug validation
- Admin permission check
- Error handling
- Redirect sau update
