import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-0 bg-white border-b border-gray-100 z-[1000] w-full">
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
                            <Link
                                href="/login"
                                className="text-[15px] text-gray-700 hover:text-gray-900 font-normal"
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                href="/subscribe"
                                className="px-6 py-2.5 bg-[#5fc5dc] text-white text-[14px] font-semibold rounded-full hover:bg-[#4ab5cc] transition-colors"
                            >
                                Subscribe
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
