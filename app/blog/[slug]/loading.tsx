import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function BlogPostLoading() {
    return (
        <article className="blog-post">
            <div className="blog-post-header">
                <div className="container">
                    <div className="post-meta">
                        <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                    </div>

                    <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded mt-4"></div>

                    <div className="author-info mt-4">
                        <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full"></div>
                        <div className="author-details">
                            <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="featured-image-container">
                <div className="w-full h-96 bg-gray-200 animate-pulse"></div>
            </div>

            <div className="blog-post-content">
                <div className="container">
                    <div className="content-wrapper">
                        <div className="flex justify-center py-12">
                            <LoadingSpinner size="lg" />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
