import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="blog-post">
            <div className="blog-post-header">
                <div className="container">
                    <div className="post-meta">
                        <span className="category">{post.category.name}</span>
                        <span className="separator">•</span>
                        <time dateTime={post.publishedAt}>
                            {formatDate(post.publishedAt)}
                        </time>
                        {post.readingTime && (
                            <>
                                <span className="separator">•</span>
                                <span>{post.readingTime} phút đọc</span>
                            </>
                        )}
                    </div>

                    <h1 className="post-title">{post.title}</h1>

                    <div className="author-info">
                        {post.author.avatar && (
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={48}
                                height={48}
                                className="author-avatar"
                            />
                        )}
                        <div className="author-details">
                            <p className="author-name">{post.author.name}</p>
                        </div>
                    </div>
                </div>
            </div>

            {post.featuredImage && (
                <div className="featured-image-container">
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        width={1200}
                        height={600}
                        className="featured-image"
                        priority
                    />
                </div>
            )}

            <div className="blog-post-content">
                <div className="container">
                    <div className="content-wrapper">
                        <div
                            className="prose"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}
