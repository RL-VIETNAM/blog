# Hướng dẫn Setup Authentication

## Tổng quan

Hệ thống authentication đã được setup với các tính năng:
- Đăng nhập/đăng xuất bằng email và password
- Phân quyền admin/user
- Protected routes (chỉ admin mới vào được dashboard)
- Tự động tạo user profile khi đăng ký

## Các bước setup

### 1. Chạy Schema SQL

Vào Supabase Dashboard > SQL Editor và chạy file `supabase/schema.sql`

File này sẽ tạo:
- Bảng `user_profiles` với cột `role` (admin/user)
- Row Level Security policies
- Trigger tự động tạo profile khi user đăng ký
- Policies phân quyền cho admin

### 2. Chạy Seed Data (Optional)

Chạy file `supabase/seed.sql` để tạo dữ liệu mẫu (authors, categories, posts)

### 3. Tạo Admin User

Có 2 cách:

#### Cách 1: Đăng ký qua UI
1. Truy cập `/login`
2. Đăng ký tài khoản mới
3. Vào Supabase Dashboard > SQL Editor
4. Chạy câu lệnh:
```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE id = 'YOUR_USER_ID';
```

#### Cách 2: Tạo trong Supabase Dashboard
1. Vào Authentication > Users > Add User
2. Nhập email và password
3. Sau khi tạo, copy User ID
4. Vào SQL Editor và chạy:
```sql
UPDATE user_profiles 
SET role = 'admin' 
WHERE id = 'USER_ID_VỪA_TẠO';
```

### 4. Enable Email Auth trong Supabase

1. Vào Authentication > Providers
2. Enable Email provider
3. Tắt "Confirm email" nếu muốn test nhanh (không khuyến khích cho production)

## Cấu trúc Files

```
lib/
  └── auth.ts              # Helper functions cho auth

components/
  └── auth/
      ├── LoginForm.tsx    # Form đăng nhập
      └── AuthButton.tsx   # Button đăng nhập/đăng xuất

app/
  ├── login/
  │   └── page.tsx         # Trang đăng nhập
  └── dashboard/
      └── page.tsx         # Trang admin (protected)
```

## Sử dụng

### Đăng nhập
1. Truy cập `/login`
2. Nhập email và password
3. Sau khi đăng nhập thành công, sẽ redirect đến `/dashboard`

### Dashboard
- Chỉ admin mới vào được
- Hiển thị các link quản lý bài viết, categories, authors
- Có thể đăng xuất

### AuthButton Component
Thêm vào Header để hiển thị trạng thái đăng nhập:

```tsx
import AuthButton from '@/components/auth/AuthButton';

// Trong Header component
<AuthButton />
```

## Phân quyền

### Admin có thể:
- Thêm/sửa/xóa bài viết
- Thêm/sửa/xóa categories
- Thêm/sửa/xóa authors
- Truy cập dashboard

### User thường có thể:
- Đọc bài viết
- Xem profile của mình
- Cập nhật profile của mình

## Mở rộng sau này

Khi cần thêm tính năng cho user thường:
1. Tạo bảng `comments`, `bookmarks` trong schema
2. Thêm policies cho phép user thêm/sửa/xóa comments của mình
3. Tạo UI components cho comments và bookmarks
4. Tạo pages `/profile` cho user

## Lưu ý bảo mật

- Row Level Security (RLS) đã được enable cho tất cả bảng
- Chỉ admin mới có quyền thêm/sửa/xóa content
- User chỉ có thể đọc và quản lý profile của mình
- Password được hash tự động bởi Supabase Auth
