import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { getCurrentUser, getUserProfile } from '@/lib/auth-server';

// POST - Create new post
export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const profile = await getUserProfile(user.id);

        if (!profile || profile.role !== 'admin') {
            return NextResponse.json(
                { error: 'Forbidden - Admin only' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { title, slug, category, featuredImage, content, reading_time } = body;

        // Validate required fields
        if (!title || !slug || !category || !featuredImage || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const supabase = await createServerClient();

        // Kiểm tra slug unique
        const { data: existingPost } = await supabase
            .from('posts')
            .select('id')
            .eq('slug', slug)
            .single();

        if (existingPost) {
            return NextResponse.json(
                { error: 'Slug đã tồn tại, vui lòng chọn slug khác' },
                { status: 400 }
            );
        }

        // Insert post
        const { data, error } = await supabase
            .from('posts')
            .insert({
                title,
                slug,
                category,
                featured_image: featuredImage,
                content,
                author_id: user.id,
                reading_time: reading_time || 5,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating post:', error);
            return NextResponse.json(
                { error: 'Failed to create post', details: error },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data }, { status: 201 });

    } catch (error) {
        console.error('Error in POST /api/posts:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
