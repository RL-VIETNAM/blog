import Image from 'next/image';

export default function SubscribePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <div className="max-w-4xl w-full">
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        Đăng ký nhận tin
                    </h1>

                    <div className="mb-8">
                        <Image
                            src="/snvv.png"
                            alt="Subscribe"
                            width={600}
                            height={400}
                            className="mx-auto rounded-lg"
                        />
                    </div>

                    <p className="text-xl text-gray-600 mb-6">
                        Trang này đang được xây dựng
                    </p>

                    <p className="text-gray-500">
                        Nội dung sẽ sớm được cập nhật
                    </p>
                </div>
            </div>
        </div>
    );
}
