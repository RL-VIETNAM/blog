import { Post } from '@/types/blog';
import FeaturedCard from '../cards/FeaturedCard';

interface FeaturedPostProps {
    post: Post;
    layout?: 'vertical' | 'horizontal';
}

export default function FeaturedPost({ post, layout = 'horizontal' }: FeaturedPostProps) {
    return (
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-20">
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Bài viết nổi bật
                </h2>
            </div>

            <FeaturedCard post={post} layout={layout} />
        </section>
    );
}
