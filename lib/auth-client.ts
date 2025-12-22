import { supabase } from './supabase';

export interface UserProfile {
    id: string;
    role: 'admin' | 'user';
    display_name: string | null;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}

// Đăng nhập bằng email và password (Client-side)
export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { user: null, error: error.message };
    }

    return { user: data.user, error: null };
}

// Đăng ký tài khoản mới (Client-side)
export async function signUp(email: string, password: string, displayName?: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: displayName || email,
            },
        },
    });

    if (error) {
        return { user: null, error: error.message };
    }

    return { user: data.user, error: null };
}

// Đăng xuất (Client-side)
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        return { error: error.message };
    }
    return { error: null };
}

// Lấy user hiện tại (Client-side)
export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return null;
    }

    return user;
}

// Lấy user profile (Client-side)
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }

    return data;
}

// Cập nhật profile (Client-side)
export async function updateProfile(userId: string, updates: Partial<Pick<UserProfile, 'display_name' | 'avatar_url'>>) {
    const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) {
        return { profile: null, error: error.message };
    }

    return { profile: data, error: null };
}
