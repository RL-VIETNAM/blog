import LoadingSpinner from './LoadingSpinner';

export default function PageLoader({ message = 'Đang tải...' }: { message?: string }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600">{message}</p>
        </div>
    );
}
