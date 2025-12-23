import { Post } from '@/types/blog';
import Link from 'next/link';

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="border-b border-gray-100 last:border-b-0">
            <Link href={`/blog/${post.slug}`} className="block">
                <div className="group flex gap-8 py-8 hover:bg-gray-50 transition-colors">
                    {/* Icon/Image - Landscape Rectangle - No rounded corners */}
                    <div className="flex-shrink-0">
                        <div className="relative w-[240px] h-[135px] overflow-hidden bg-gray-100">
                            <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                        {/* Title */}
                        <h3 className="text-[20px] font-semibold text-gray-900 mb-2 leading-snug group-hover:text-[#FF1A75] transition-colors">
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-[15px] text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                            {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center gap-2 text-[13px] text-gray-500">
                            <span className="font-normal">By {post.author.name}</span>
                            <span>—</span>
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </time>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}
