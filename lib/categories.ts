import { createServerClient } from '@/lib/supabase-server';
import { Category } from '@/types/blog';

export async function getCategories(): Promise<Category[]> {
    const supabase = await createServerClient();

    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data || [];
}

export async function getCategoryById(id: string): Promise<Category | null> {
    const supabase = await createServerClient();

    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching category:', error);
        return null;
    }

    return data;
}
