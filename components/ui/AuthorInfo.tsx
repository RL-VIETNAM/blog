import { Author } from '@/types/blog';
import { formatDate } from '@/lib/utils';

interface AuthorInfoProps {
    author: Author;
    date: string;
    readingTime: number;
}

export default function AuthorInfo({ author, date, readingTime }: AuthorInfoProps) {
    return (
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            {author.avatar && (
                <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-10 h-10 rounded-full object-cover"
                />
            )}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{author.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                    <time dateTime={date}>{formatDate(date)}</time>
                    <span>•</span>
                    <span>{readingTime} phút đọc</span>
                </div>
            </div>
        </div>
    );
}
