import { createServerClient } from './supabase-server';
import { Post, Author } from '@/types/blog';

// Transform database record to Post type
async function transformPost(dbPost: any): Promise<Post> {
    const supabase = await createServerClient();

    // Lấy thông tin author từ user_profiles
    const { data: profile } = await supabase
        .from('user_profiles')
        .select('id, display_name, avatar_url')
        .eq('id', dbPost.author_id)
        .single();

    // Lấy email từ auth.users (nếu cần)
    const author: Author = {
        id: dbPost.author_id,
        name: profile?.display_name || 'Unknown',
        avatar: profile?.avatar_url,
    };

    return {
        id: dbPost.id,
        slug: dbPost.slug,
        title: dbPost.title,
        excerpt: '', // Không có trong DB mới, để trống hoặc tạo từ content
        content: dbPost.content,
        featuredImage: dbPost.featured_image,
        category: {
            id: dbPost.category, // Category giờ là TEXT
            name: dbPost.category,
            slug: dbPost.category.toLowerCase().replace(/\s+/g, '-'),
        },
        author: author,
        publishedAt: dbPost.created_at, // Dùng created_at thay vì published_at
        readingTime: dbPost.reading_time,
        isFeatured: false, // Không có trong DB mới
        tags: [], // Không có trong DB mới
    };
}

// Get all posts  
export async function getPosts(): Promise<Post[]> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }

    if (!data) return [];

    // Transform posts with author info
    const posts = await Promise.all(data.map(transformPost));
    return posts;
}

// Get featured post (lấy bài mới nhất)
export async function getFeaturedPost(): Promise<Post | null> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching featured post:', error);
        return null;
    }

    return data ? await transformPost(data) : null;
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching post:', error);
        return null;
    }

    return data ? await transformPost(data) : null;
}

// Get posts by category
export async function getPostsByCategory(categoryName: string): Promise<Post[]> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', categoryName)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts by category:', error);
        return [];
    }

    if (!data) return [];

    const posts = await Promise.all(data.map(transformPost));
    return posts;
}

// Get posts by author
export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('author_id', authorId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching posts by author:', error);
        return [];
    }

    if (!data) return [];

    const posts = await Promise.all(data.map(transformPost));
    return posts;
}

// Get post by ID (for editing)
export async function getPostById(id: string): Promise<Post | null> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching post by ID:', error);
        return null;
    }

    return data ? await transformPost(data) : null;
}

