'use client';

import { useEffect } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-4 right-4 z-50 animate-slideIn">
            <div className={`px-6 py-4 rounded-lg shadow-lg ${type === 'success'
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                    <p className={`text-sm font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'
                        }`}>
                        {message}
                    </p>
                    <button
                        onClick={onClose}
                        className={`ml-4 ${type === 'success' ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'
                            }`}
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}
