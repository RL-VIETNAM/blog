'use client';

import { useState } from 'react';

export default function SubscribePage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4 py-16">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-2xl shadow-xl p-12">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Đăng ký nhận tin
                        </h1>
                        <p className="text-lg text-gray-600">
                            Nhận các bài viết mới nhất về Reinforcement Learning và AI trực tiếp qua email của bạn
                        </p>
                    </div>

                    {submitted ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                                Đăng ký thành công
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Cảm ơn bạn đã đăng ký. Chúng tôi sẽ gửi email xác nhận sớm nhất.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-cyan-600 hover:text-cyan-700 font-medium"
                            >
                                Đăng ký email khác
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Địa chỉ Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors text-base"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Đăng ký ngay
                            </button>

                            <p className="text-sm text-gray-500 text-center">
                                Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.
                            </p>
                        </form>
                    )}
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
                        <div className="text-3xl font-bold text-cyan-600 mb-2">50+</div>
                        <div className="text-gray-600">Bài viết chất lượng</div>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
                        <div className="text-3xl font-bold text-cyan-600 mb-2">1000+</div>
                        <div className="text-gray-600">Độc giả hàng tháng</div>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
                        <div className="text-3xl font-bold text-cyan-600 mb-2">100%</div>
                        <div className="text-gray-600">Miễn phí</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
