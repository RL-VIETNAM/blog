export interface Author {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    color?: string;
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    category: Category;
    author: Author;
    publishedAt: string;
    readingTime: number;
    isFeatured?: boolean;
    tags?: string[];
}

export interface PostCardProps {
    post: Post;
    variant?: 'default' | 'featured';
}
