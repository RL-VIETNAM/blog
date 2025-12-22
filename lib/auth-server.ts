import { createServerClient } from './supabase-server';

export interface UserProfile {
    id: string;
    role: 'admin' | 'user';
    display_name: string | null;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}

// Lấy user hiện tại (Server-side)
export async function getCurrentUser() {
    const supabase = await createServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return null;
    }

    return user;
}

// Lấy user profile (Server-side)
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const supabase = await createServerClient();
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

// Kiểm tra xem user có phải admin không (Server-side)
export async function isAdmin(userId: string): Promise<boolean> {
    const profile = await getUserProfile(userId);
    return profile?.role === 'admin';
}
