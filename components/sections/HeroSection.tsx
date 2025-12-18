'use client';

import { useState } from 'react';

export default function HeroSection() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search:', searchQuery);
    };

    return (
        <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white">
            <div className="max-w-[800px] mx-auto px-4 md:px-8 py-20 md:py-28 text-center">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Khám phá thế giới
                    <br />
                    <span className="text-blue-200">Reinforcement Learning</span>
                </h1>

                {/* Tagline */}
                <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Chia sẻ kiến thức, kinh nghiệm và nghiên cứu về học tăng cường
                    và các ứng dụng thực tế
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-[500px] mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Tìm kiếm bài viết..."
                            className="w-full px-6 py-4 pr-12 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                            aria-label="Search"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full filter blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl" />
            </div>
        </section>
    );
}
