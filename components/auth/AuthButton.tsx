'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getUserProfile, signOut, type UserProfile } from '@/lib/auth-client';

export default function AuthButton() {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const user = await getCurrentUser();
        if (user) {
            const userProfile = await getUserProfile(user.id);
            setProfile(userProfile);
        }
        setLoading(false);
    };

    const handleSignOut = async () => {
        await signOut();
        setProfile(null);
        router.push('/');
        router.refresh();
    };

    if (loading) {
        return (
            <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md"></div>
        );
    }

    if (!profile) {
        return (
            <a
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
                Đăng nhập
            </a>
        );
    }

    return (
        <div className="flex items-center gap-4">
            {profile.role === 'admin' && (
                <a
                    href="/dashboard"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                    Dashboard
                </a>
            )}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">{profile.display_name}</span>
                <button
                    onClick={handleSignOut}
                    className="text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
}
