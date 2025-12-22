# Supabase Setup Guide

## Các bước setup database

### 1. Tạo tables
- Vào Supabase Dashboard
- Chọn SQL Editor
- Copy toàn bộ nội dung file `supabase/schema.sql`
- Paste vào SQL Editor và chạy

### 2. Insert dữ liệu mẫu
- Sau khi tạo xong tables
- Copy toàn bộ nội dung file `supabase/seed.sql`
- Paste vào SQL Editor và chạy

### 3. Environment Variables
File `.env.local` đã được tạo với credentials của bạn.

### 4. SDK đã được cài đặt
- Package `@supabase/supabase-js` đã được cài đặt
- Supabase client đã được tạo tại `lib/supabase.ts`
- Các hàm query posts đã được tạo tại `lib/posts.ts`

## Cấu trúc Database

### Authors Table
- id: UUID
- name: TEXT
- avatar: TEXT
- bio: TEXT
- created_at, updated_at: TIMESTAMP

### Categories Table
- id: UUID
- name: TEXT
- slug: TEXT (unique)
- color: TEXT
- created_at, updated_at: TIMESTAMP

### Posts Table
- id: UUID
- slug: TEXT (unique)
- title: TEXT
- excerpt: TEXT
- content: TEXT
- featured_image: TEXT
- category_id: UUID (FK)
- author_id: UUID (FK)
- published_at: TIMESTAMP
- reading_time: INTEGER
- is_featured: BOOLEAN
- tags: TEXT[]
- created_at, updated_at: TIMESTAMP

## Security
- Row Level Security (RLS) đã được enable
- Public read access đã được cấu hình
- Environment variables được gitignore tự động
