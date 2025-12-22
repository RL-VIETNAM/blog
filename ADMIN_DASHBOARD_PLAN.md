# Kế Hoạch Xây Dựng Admin Dashboard

## Tổng Quan

Xây dựng một dashboard quản trị hoàn chỉnh cho admin để quản lý nội dung blog, bao gồm quản lý bài viết, danh mục, tác giả và thống kê.

## Cấu Trúc Tổng Thể

```
app/
├── dashboard/
│   ├── page.tsx                    # Trang dashboard chính (đã có)
│   ├── layout.tsx                  # Layout riêng cho dashboard
│   ├── posts/
│   │   ├── page.tsx               # Danh sách bài viết
│   │   ├── new/
│   │   │   └── page.tsx           # Tạo bài viết mới
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx       # Sửa bài viết
│   ├── categories/
│   │   ├── page.tsx               # Quản lý danh mục
│   │   ├── new/
│   │   │   └── page.tsx           # Tạo danh mục mới
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx       # Sửa danh mục
│   └── authors/
│       ├── page.tsx               # Quản lý tác giả
│       ├── new/
│       │   └── page.tsx           # Tạo tác giả mới
│       └── [id]/
│           └── edit/
│               └── page.tsx       # Sửa tác giả

components/
├── dashboard/
│   ├── DashboardLayout.tsx        # Layout wrapper với sidebar
│   ├── Sidebar.tsx                # Sidebar navigation
│   ├── DashboardHeader.tsx        # Header riêng cho dashboard
│   ├── StatsCard.tsx              # Card hiển thị thống kê
│   ├── posts/
│   │   ├── PostList.tsx           # Danh sách bài viết dạng table
│   │   ├── PostForm.tsx           # Form tạo/sửa bài viết
│   │   └── PostRow.tsx            # Row trong table
│   ├── categories/
│   │   ├── CategoryList.tsx       # Danh sách danh mục
│   │   ├── CategoryForm.tsx       # Form tạo/sửa danh mục
│   │   └── CategoryRow.tsx        # Row trong table
│   ├── authors/
│   │   ├── AuthorList.tsx         # Danh sách tác giả
│   │   ├── AuthorForm.tsx         # Form tạo/sửa tác giả
│   │   └── AuthorRow.tsx          # Row trong table
│   └── shared/
│       ├── DataTable.tsx          # Component table tái sử dụng
│       ├── Pagination.tsx         # Phân trang
│       ├── SearchBar.tsx          # Thanh tìm kiếm
│       ├── ConfirmDialog.tsx      # Dialog xác nhận xóa
│       └── ImageUpload.tsx        # Upload ảnh

lib/
├── posts.ts                        # Đã có, cần mở rộng
├── categories.ts                   # CRUD categories
├── authors.ts                      # CRUD authors
└── upload.ts                       # Helper upload ảnh
```

## Phần 1: Layout Dashboard

### 1.1. Dashboard Layout Component

**File**: `components/dashboard/DashboardLayout.tsx`

Tạo layout wrapper cho tất cả trang dashboard với:
- Sidebar navigation bên trái
- Header phía trên
- Content area chính
- Responsive: sidebar collapse trên mobile

**Các route trong sidebar:**
- Dashboard (tổng quan)
- Bài viết
- Danh mục
- Tác giả
- Đăng xuất

### 1.2. Sidebar Component

**File**: `components/dashboard/Sidebar.tsx`

Navigation menu với:
- Logo/Brand
- Menu items
- Active state highlighting
- Icons cho mỗi menu
- Collapse/expand cho mobile

### 1.3. Dashboard Header

**File**: `components/dashboard/DashboardHeader.tsx`

Header riêng cho dashboard với:
- Breadcrumbs
- User info
- Quick actions
- Logout button

### 1.4. Dashboard Layout File

**File**: `app/dashboard/layout.tsx`

Wrap tất cả pages trong dashboard với DashboardLayout

## Phần 2: Trang Dashboard Chính

### 2.1. Cập nhật Dashboard Page

**File**: `app/dashboard/page.tsx`

Hiển thị:
- Thống kê tổng quan:
  - Tổng số bài viết
  - Tổng số danh mục
  - Tổng số tác giả
  - Bài viết gần đây
- Charts (optional):
  - Bài viết theo tháng
  - Bài viết theo danh mục

### 2.2. Stats Card Component

**File**: `components/dashboard/StatsCard.tsx`

Card hiển thị một số liệu với:
- Icon
- Label
- Number
- Màu sắc
- Trend (tăng/giảm - optional)

## Phần 3: Quản Lý Bài Viết

### 3.1. Danh sách bài viết

**File**: `app/dashboard/posts/page.tsx`

Hiển thị:
- Thanh tìm kiếm
- Button "Tạo bài viết mới"
- Table danh sách bài viết với columns:
  - Ảnh thumbnail
  - Tiêu đề
  - Danh mục
  - Tác giả
  - Ngày xuất bản
  - Trạng thái (featured)
  - Actions (Sửa, Xóa)
- Pagination

### 3.2. Tạo bài viết mới

**File**: `app/dashboard/posts/new/page.tsx`

Form với các fields:
- Tiêu đề
- Slug (auto-generate từ tiêu đề, có thể sửa)
- Excerpt
- Content (rich text editor)
- Featured Image (upload)
- Category (dropdown)
- Author (dropdown)
- Tags (input array)
- Is Featured (checkbox)
- Reading Time (tự động tính hoặc nhập thủ công)

### 3.3. Sửa bài viết

**File**: `app/dashboard/posts/[id]/edit/page.tsx`

Tương tự form tạo mới nhưng pre-fill data từ database

### 3.4. Post Form Component

**File**: `components/dashboard/posts/PostForm.tsx`

Reusable form component cho cả tạo mới và sửa

### 3.5. Post List Component

**File**: `components/dashboard/posts/PostList.tsx`

Table component hiển thị danh sách bài viết

### 3.6. Mở rộng lib/posts.ts

Thêm các functions:
- `createPost()` - Tạo bài viết mới
- `updatePost()` - Cập nhật bài viết
- `deletePost()` - Xóa bài viết
- `searchPosts()` - Tìm kiếm bài viết

## Phần 4: Quản Lý Danh Mục

### 4.1. Danh sách danh mục

**File**: `app/dashboard/categories/page.tsx`

Hiển thị:
- Button "Tạo danh mục mới"
- Table danh sách categories với columns:
  - Tên danh mục
  - Slug
  - Màu sắc
  - Số bài viết
  - Actions (Sửa, Xóa)

### 4.2. Tạo/Sửa danh mục

**Files**: 
- `app/dashboard/categories/new/page.tsx`
- `app/dashboard/categories/[id]/edit/page.tsx`

Form với các fields:
- Tên danh mục
- Slug
- Màu sắc (color picker)

### 4.3. Category Form Component

**File**: `components/dashboard/categories/CategoryForm.tsx`

Reusable form component

### 4.4. Tạo lib/categories.ts

Functions cần có:
- `getCategories()` - Lấy tất cả categories
- `getCategoryById()` - Lấy category theo ID
- `createCategory()` - Tạo category mới
- `updateCategory()` - Cập nhật category
- `deleteCategory()` - Xóa category
- `getCategoryStats()` - Thống kê số bài viết theo category

## Phần 5: Quản Lý Tác Giả

### 5.1. Danh sách tác giả

**File**: `app/dashboard/authors/page.tsx`

Hiển thị:
- Button "Tạo tác giả mới"
- Table danh sách authors với columns:
  - Avatar
  - Tên tác giả
  - Bio
  - Số bài viết
  - Actions (Sửa, Xóa)

### 5.2. Tạo/Sửa tác giả

**Files**:
- `app/dashboard/authors/new/page.tsx`
- `app/dashboard/authors/[id]/edit/page.tsx`

Form với các fields:
- Tên tác giả
- Avatar (upload)
- Bio

### 5.3. Author Form Component

**File**: `components/dashboard/authors/AuthorForm.tsx`

Reusable form component

### 5.4. Tạo lib/authors.ts

Functions cần có:
- `getAuthors()` - Lấy tất cả authors
- `getAuthorById()` - Lấy author theo ID
- `createAuthor()` - Tạo author mới
- `updateAuthor()` - Cập nhật author
- `deleteAuthor()` - Xóa author
- `getAuthorStats()` - Thống kê số bài viết theo author

## Phần 6: Components Dùng Chung

### 6.1. Data Table Component

**File**: `components/dashboard/shared/DataTable.tsx`

Generic table component với:
- Props customize columns
- Sort
- Row actions
- Loading state
- Empty state

### 6.2. Search Bar

**File**: `components/dashboard/shared/SearchBar.tsx`

Thanh tìm kiếm với debounce

### 6.3. Pagination

**File**: `components/dashboard/shared/Pagination.tsx`

Component phân trang cho tables

### 6.4. Confirm Dialog

**File**: `components/dashboard/shared/ConfirmDialog.tsx`

Dialog xác nhận trước khi xóa

### 6.5. Image Upload

**File**: `components/dashboard/shared/ImageUpload.tsx`

Component upload ảnh với:
- Preview
- Drag & drop
- Validation
- Progress bar

### 6.6. Rich Text Editor

Cân nhắc sử dụng thư viện:
- TipTap
- Quill
- Draft.js

Hoặc dùng textarea đơn giản với Markdown support

## Phần 7: Upload Ảnh

### 7.1. Cấu hình Supabase Storage

Tạo bucket trong Supabase Storage:
- Bucket name: `blog-images`
- Public access
- Folders: `posts/`, `authors/`, `categories/`

### 7.2. Upload Helper

**File**: `lib/upload.ts`

Functions:
- `uploadImage()` - Upload ảnh lên Supabase Storage
- `deleteImage()` - Xóa ảnh
- `getImageUrl()` - Lấy public URL

## Phần 8: Validation & Error Handling

### 8.1. Form Validation

Sử dụng:
- React Hook Form hoặc
- Formik hoặc
- Custom validation

Validate:
- Required fields
- Slug uniqueness
- Email format (nếu có)
- Image file size/type

### 8.2. Error Handling

Hiển thị lỗi:
- Toast notifications
- Inline field errors
- Error boundaries

## Phần 9: UI/UX Enhancements

### 9.1. Loading States

- Skeleton loaders cho tables
- Spinner cho buttons
- Loading overlay cho forms

### 9.2. Success Feedback

- Toast messages sau actions thành công
- Redirect sau tạo/sửa

### 9.3. Empty States

- Friendly messages khi chưa có data
- Call-to-action buttons

### 9.4. Responsive Design

- Mobile-first approach
- Sidebar collapse
- Table scroll horizontal
- Touch-friendly actions

## Thứ Tự Thực Hiện

### Giai đoạn 1: Foundation
1. Tạo DashboardLayout component
2. Tạo Sidebar component
3. Tạo DashboardHeader component
4. Cập nhật app/dashboard/layout.tsx

### Giai đoạn 2: Shared Components
1. Tạo DataTable component
2. Tạo SearchBar component
3. Tạo Pagination component
4. Tạo ConfirmDialog component
5. Tạo StatsCard component

### Giai đoạn 3: Dashboard Home
1. Cập nhật dashboard/page.tsx
2. Tạo stats queries
3. Hiển thị thống kê

### Giai đoạn 4: Quản Lý Danh Mục
1. Tạo lib/categories.ts
2. Tạo CategoryList component
3. Tạo CategoryForm component
4. Tạo pages: list, new, edit
5. Test CRUD operations

### Giai đoạn 5: Quản Lý Tác Giả
1. Tạo lib/authors.ts
2. Tạo AuthorList component
3. Tạo AuthorForm component
4. Tạo ImageUpload component
5. Setup Supabase Storage
6. Tạo lib/upload.ts
7. Tạo pages: list, new, edit
8. Test CRUD operations

### Giai đoạn 6: Quản Lý Bài Viết
1. Mở rộng lib/posts.ts
2. Setup Rich Text Editor
3. Tạo PostList component
4. Tạo PostForm component
5. Tạo pages: list, new, edit
6. Test CRUD operations

### Giai đoạn 7: Polish
1. Thêm loading states
2. Thêm error handling
3. Thêm toast notifications
4. Responsive testing
5. UX improvements

## Dependencies Cần Thêm

```json
{
  "dependencies": {
    "@tiptap/react": "^2.x.x",           // Rich text editor
    "@tiptap/starter-kit": "^2.x.x",
    "react-hot-toast": "^2.x.x",          // Toast notifications
    "react-hook-form": "^7.x.x",          // Form management
    "date-fns": "^3.x.x"                  // Date formatting
  }
}
```

## Lưu Ý Kỹ Thuật

### Security
- Tất cả routes dashboard phải check authentication
- Mọi mutations phải check role = admin
- Validate input ở cả client và server (RLS policies)

### Performance
- Pagination cho tất cả lists
- Lazy load images
- Debounce search
- Optimize queries với indexes

### Data Consistency
- Khi xóa category, cần handle posts thuộc category đó
- Khi xóa author, cần handle posts của author đó
- Có thể dùng CASCADE hoặc set NULL hoặc prevent delete

### URL Structure
```
/dashboard                          # Trang chính
/dashboard/posts                    # Danh sách
/dashboard/posts/new                # Tạo mới
/dashboard/posts/[id]/edit          # Sửa

/dashboard/categories
/dashboard/categories/new
/dashboard/categories/[id]/edit

/dashboard/authors
/dashboard/authors/new
/dashboard/authors/[id]/edit
```

## Mở Rộng Tương Lai

Sau khi hoàn thành dashboard cơ bản, có thể thêm:

1. Rich Analytics
   - Views tracking
   - Popular posts
   - User engagement metrics

2. SEO Management
   - Meta tags editor
   - SEO preview
   - Sitemap generation

3. Media Library
   - Quản lý tất cả ảnh
   - Organize by folders
   - Bulk upload

4. Comments Moderation
   - Approve/Reject comments
   - Spam detection

5. User Management
   - Quản lý users
   - Roles & permissions

6. Draft & Scheduling
   - Save draft
   - Schedule publish
   - Revision history

7. Bulk Actions
   - Bulk delete
   - Bulk category change
   - Bulk publish/unpublish
