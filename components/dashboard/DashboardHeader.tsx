'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser, getUserProfile, signOut, type UserProfile } from '@/lib/auth-client';

export default function DashboardHeader() {
    const router = useRouter();
    const pathname = usePathname();
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
        router.push('/login');
        router.refresh();
    };

    // Generate breadcrumbs từ pathname
    const generateBreadcrumbs = () => {
        const paths = pathname.split('/').filter(Boolean);
        const breadcrumbs = paths.map((path, index) => {
            const href = '/' + paths.slice(0, index + 1).join('/');
            const label = path.charAt(0).toUpperCase() + path.slice(1);
            return { label, href, isLast: index === paths.length - 1 };
        });
        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm">
                    {breadcrumbs.map((crumb, index) => (
                        <div key={crumb.href} className="flex items-center gap-2">
                            {index > 0 && <span className="text-gray-400">/</span>}
                            {crumb.isLast ? (
                                <span className="text-gray-900 font-medium">{crumb.label}</span>
                            ) : (
                                <a
                                    href={crumb.href}
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {crumb.label}
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                    {loading ? (
                        <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
                    ) : profile ? (
                        <>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    {profile.display_name}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                    {profile.role}
                                </p>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        </header>
    );
}
