'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/auth/LoginModal';
import { getCurrentUser, getUserProfile, type UserProfile } from '@/lib/auth-client';
import { logout } from '@/app/actions/auth';

export default function Header() {
    const router = useRouter();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const currentUser = await getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            const userProfile = await getUserProfile(currentUser.id);
            setProfile(userProfile);
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        // Clear state ngay lập tức
        setUser(null);
        setProfile(null);
        // Gọi logout action (sẽ redirect)
        await logout();
    };

    const handleLoginSuccess = () => {
        setIsLoginModalOpen(false);
        // Reload user info sau khi login
        loadUser();
        router.refresh();
    };

    return (
        <>
            <header className="bg-white border-b border-gray-100 z-[1000] w-full">
                <div className="w-full flex justify-center">
                    <div className="w-full max-w-[1400px] px-8">
                        <div className="flex items-center justify-between h-[80px]">
                            {/* LEFT SECTION - Logo + Nav Links */}
                            <div className="flex items-center gap-10">
                                {/* Logo */}
                                <Link href="/">
                                    <h1 className="text-[24px] font-bold text-gray-900">
                                        RL Vietnam Blog
                                    </h1>
                                </Link>

                                {/* Navigation */}
                                <nav className="flex items-center gap-8">
                                    <Link
                                        href="/"
                                        className="text-[15px] text-gray-700 hover:text-gray-900 font-normal transition-colors"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="text-[15px] text-gray-700 hover:text-gray-900 font-normal transition-colors"
                                    >
                                        Giới thiệu
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="text-[15px] text-gray-700 hover:text-gray-900 font-normal transition-colors"
                                    >
                                        Liên hệ
                                    </Link>
                                </nav>
                            </div>

                            {/* RIGHT SECTION - Auth Buttons */}
                            <div className="flex items-center gap-6">
                                {loading ? (
                                    <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
                                ) : user && profile ? (
                                    <>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[15px] text-gray-700">
                                                {profile.display_name}
                                            </span>
                                            {profile.role === 'admin' && (
                                                <Link
                                                    href="/dashboard"
                                                    className="text-[15px] text-blue-600 hover:text-blue-700 font-medium"
                                                >
                                                    Dashboard
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="text-[15px] text-red-600 hover:text-red-700 font-normal"
                                            >
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setIsLoginModalOpen(true)}
                                            className="text-[15px] text-gray-700 hover:text-gray-900 font-normal"
                                        >
                                            Đăng nhập
                                        </button>
                                        <Link
                                            href="/subscribe"
                                            className="px-6 py-2.5 bg-[#5fc5dc] text-white text-[14px] font-semibold rounded-full hover:bg-[#4ab5cc] transition-colors"
                                        >
                                            Subscribe
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onSuccess={handleLoginSuccess}
            />
        </>
    );
}
