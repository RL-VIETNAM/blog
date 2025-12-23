import LoadingSpinner from './LoadingSpinner';

interface LoadingButtonProps {
    isLoading: boolean;
    loadingText: string;
    normalText: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export default function LoadingButton({
    isLoading,
    loadingText,
    normalText,
    type = 'button',
    onClick,
    className = '',
    disabled = false,
}: LoadingButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {isLoading && <LoadingSpinner size="sm" />}
            {isLoading ? loadingText : normalText}
        </button>
    );
}
