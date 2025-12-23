-- =====================================================
-- RESET DATABASE - XÓA TOÀN BỘ DATA VÀ TẠO LẠI
-- =====================================================
-- File này có thể chạy lại nhiều lần để reset database
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- DROP ALL DATA AND TABLES
-- =====================================================

-- Drop functions first
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- Drop tables
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Xóa user cũ nếu tồn tại (chỉ xóa user test, không xóa tất cả)
DELETE FROM auth.users WHERE email = 'vudinhdang2004tb@gmail.com';

-- =====================================================
-- CREATE DEFAULT ADMIN USER
-- =====================================================

-- Tạo user mặc định trong auth.users
DO $$
DECLARE
    new_user_id uuid;
    user_exists boolean;
BEGIN
    -- Kiểm tra user đã tồn tại chưa
    SELECT EXISTS(
        SELECT 1 FROM auth.users WHERE email = 'vudinhdang2004tb@gmail.com'
    ) INTO user_exists;
    
    IF NOT user_exists THEN
        -- Tạo user trong auth.users
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'vudinhdang2004tb@gmail.com',
            crypt('giacmorlvn', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            '{"provider":"email","providers":["email"]}',
            '{"display_name":"Admin"}',
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        )
        RETURNING id INTO new_user_id;
        
        RAISE NOTICE 'Created admin user with ID: %', new_user_id;
    ELSE
        RAISE NOTICE 'Admin user already exists, skipping creation';
    END IF;
END $$;

-- =====================================================
-- CREATE TABLES
-- =====================================================

-- Create User Profiles table (phải tạo trước vì posts reference đến nó)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    featured_image TEXT NOT NULL,
    content TEXT NOT NULL,
    author_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    reading_time INTEGER NOT NULL DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Public read access to posts
CREATE POLICY "Allow public read access to posts" ON posts
    FOR SELECT USING (true);

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

-- Admin policies for posts
CREATE POLICY "Admins can insert posts" ON posts
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update posts" ON posts
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete posts" ON posts
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-create user profile when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, role, display_name, avatar_url)
    VALUES (
        NEW.id,
        'user',
        COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger to auto-create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- CREATE ADMIN PROFILE
-- =====================================================

-- Tạo profile admin cho user vừa tạo
INSERT INTO user_profiles (id, role, display_name)
SELECT id, 'admin', 'Admin'
FROM auth.users
WHERE email = 'vudinhdang2004tb@gmail.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin', display_name = 'Admin';

-- =====================================================
-- HOÀN THÀNH
-- =====================================================
-- Database đã được reset và tạo lại thành công
-- Admin user: vudinhdang2004tb@gmail.com
-- Password: giacmorlvn
-- =====================================================

