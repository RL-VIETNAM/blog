import { Author } from '@/types/blog';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

interface AuthorInfoProps {
    author: Author;
    date: string;
    readingTime: number;
}

export default function AuthorInfo({ author, date, readingTime }: AuthorInfoProps) {
    return (
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            {author.avatar && (
                <Image
                    src={author.avatar}
                    alt={author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
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
