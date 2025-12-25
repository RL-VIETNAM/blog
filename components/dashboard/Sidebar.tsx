'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavItem {
    label: string;
    href: string;
}

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

const navItems: NavItem[] = [
    { label: 'Bài viết', href: '/dashboard/posts' },
];

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gray-900 text-white min-h-screen flex flex-col transition-all duration-300 relative`}>
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors z-10"
            >
                {isCollapsed ? '→' : '←'}
            </button>

            <div className="p-6 border-b border-gray-800">
                <Link href="/dashboard" className="text-xl font-bold">
                    {isCollapsed ? 'AP' : 'Admin Panel'}
                </Link>
            </div>

            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/dashboard' && pathname.startsWith(item.href));

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`
                                        flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} py-3 rounded-lg transition-colors
                                        ${isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                        }
                                    `}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <span className="font-medium">{isCollapsed ? item.label.charAt(0) : item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-800">
                <Link
                    href="/"
                    className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors`}
                    title={isCollapsed ? 'Về trang chủ' : undefined}
                >
                    <span className="font-medium">{isCollapsed ? 'T' : 'Về trang chủ'}</span>
                </Link>
            </div>
        </aside>
    );
}
