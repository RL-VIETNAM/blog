import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client sử dụng cookie storage
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
        get(name: string) {
            const cookies = document.cookie.split(';');
            const cookie = cookies.find(c => c.trim().startsWith(`${name}=`));
            return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
        },
        set(name: string, value: string, options: any) {
            let cookie = `${name}=${encodeURIComponent(value)}`;
            if (options?.maxAge) cookie += `; max-age=${options.maxAge}`;
            if (options?.path) cookie += `; path=${options.path}`;
            if (options?.domain) cookie += `; domain=${options.domain}`;
            if (options?.secure) cookie += '; secure';
            if (options?.sameSite) cookie += `; samesite=${options.sameSite}`;
            document.cookie = cookie;
        },
        remove(name: string, options: any) {
            document.cookie = `${name}=; path=${options?.path || '/'}; max-age=0`;
        },
    },
});
