'use server';

import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase-server';

export async function login(email: string, password: string) {
    const supabase = await createServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    redirect('/dashboard');
}

export async function logout() {
    const supabase = await createServerClient();
    await supabase.auth.signOut();
    redirect('/');
}
