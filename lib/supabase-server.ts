import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Server-side Supabase client (cho Server Components)
export async function createServerClient() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('supabase-auth-token');

    const client = createClient(supabaseUrl, supabaseAnonKey);

    // Nếu có auth cookie, set session
    if (authCookie?.value) {
        try {
            const { access_token, refresh_token } = JSON.parse(authCookie.value);
            await client.auth.setSession({
                access_token,
                refresh_token,
            });
        } catch (error) {
            console.error('Error setting session:', error);
        }
    }

    return client;
}
