import { createServerClient as createSSRServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function createServerClient() {
    const cookieStore = await cookies();

    return createSSRServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            get(name: string) {
                return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: any) {
                try {
                    cookieStore.set(name, value, options);
                } catch (error) {
                    // Cookie setting might fail in middleware
                }
            },
            remove(name: string, options: any) {
                try {
                    cookieStore.delete(name);
                } catch (error) {
                    // Cookie deletion might fail in middleware
                }
            },
        },
    });
}
