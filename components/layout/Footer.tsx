import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 mt-20 w-full">
            <div className="w-full flex justify-center">
                <div className="w-full max-w-[900px] px-8 py-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        {/* Logo & Copyright */}
                        <div>
                            <Link href="/" className="text-[20px] font-bold text-gray-900 hover:text-[#FF1A75] transition-colors">
                                RL Vietnam Blog
                            </Link>
                            <p className="text-[13px] text-gray-500 mt-3">
                                © {currentYear} RL Vietnam Blog
                            </p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-8">
                            <Link href="/about" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                                Giới thiệu
                            </Link>
                            <Link href="/contact" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                                Liên hệ
                            </Link>
                            <Link href="/privacy" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                                Chính sách
                            </Link>
                            <Link href="https://facebook.com" className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors">
                                Facebook
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
