'use client';

import { Post } from '@/types/blog';
import PostCard from '@/components/cards/PostCard';

interface LatestPostsProps {
    posts: Post[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
    return (
        <section className="w-full flex justify-center bg-white">
            <div className="w-full max-w-[900px] py-20 px-8">
                {/* Posts List - Vertical Stack */}
                <div className="flex flex-col">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}
