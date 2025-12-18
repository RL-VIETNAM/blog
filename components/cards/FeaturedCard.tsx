import { Post } from '@/types/blog';
import Image from 'next/image';
import Link from 'next/link';
import CategoryTag from '../ui/CategoryTag';
import AuthorInfo from '../ui/AuthorInfo';

interface FeaturedCardProps {
    post: Post;
    layout?: 'vertical' | 'horizontal';
}

export default function FeaturedCard({ post, layout = 'horizontal' }: FeaturedCardProps) {
    if (layout === 'vertical') {
        return (
            <Link href={`/blog/${post.slug}`}>
                <article className="group bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    {/* Image */}
                    <div className="relative w-full aspect-video overflow-hidden">
                        <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        <div className="mb-4">
                            <CategoryTag category={post.category} />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                            {post.title}
                        </h2>

                        <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                            {post.excerpt}
                        </p>

                        <AuthorInfo
                            author={post.author}
                            date={post.publishedAt}
                            readingTime={post.readingTime}
                        />
                    </div>
                </article>
            </Link>
        );
    }

    return (
        <Link href={`/blog/${post.slug}`}>
            <article className="group bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                        <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="mb-4">
                            <CategoryTag category={post.category} />
                        </div>

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                            {post.title}
                        </h2>

                        <p className="text-gray-600 text-base md:text-lg mb-6 line-clamp-4">
                            {post.excerpt}
                        </p>

                        <AuthorInfo
                            author={post.author}
                            date={post.publishedAt}
                            readingTime={post.readingTime}
                        />

                        <div className="mt-6">
                            <span className="text-blue-600 font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                                Đọc thêm
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
