import { createServerClient } from './supabase-server';
import { Post } from '@/types/blog';

// Transform database record to Post type
function transformPost(dbPost: any): Post {
    return {
        id: dbPost.id,
        slug: dbPost.slug,
        title: dbPost.title,
        excerpt: dbPost.excerpt,
        content: dbPost.content,
        featuredImage: dbPost.featured_image,
        category: {
            id: dbPost.category.id,
            name: dbPost.category.name,
            slug: dbPost.category.slug,
            color: dbPost.category.color,
        },
        author: {
            id: dbPost.author.id,
            name: dbPost.author.name,
            avatar: dbPost.author.avatar,
            bio: dbPost.author.bio,
        },
        publishedAt: dbPost.published_at,
        readingTime: dbPost.reading_time,
        isFeatured: dbPost.is_featured,
        tags: dbPost.tags || [],
    };
}

// Get all posts  
export async function getPosts(): Promise<Post[]> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            category:categories(*),
            author:authors(*)
        `)
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }

    return data?.map(transformPost) || [];
}

// Get featured post
export async function getFeaturedPost(): Promise<Post | null> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            category:categories(*),
            author:authors(*)
        `)
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching featured post:', error);
        return null;
    }

    return data ? transformPost(data) : null;
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            category:categories(*),
            author:authors(*)
        `)
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching post:', error);
        return null;
    }

    return data ? transformPost(data) : null;
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            category:categories(*),
            author:authors(*)
        `)
        .eq('category.slug', categorySlug)
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts by category:', error);
        return [];
    }

    return data?.map(transformPost) || [];
}

// Get posts by author
export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            category:categories(*),
            author:authors(*)
        `)
        .eq('author_id', authorId)
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts by author:', error);
        return [];
    }

    return data?.map(transformPost) || [];
}
