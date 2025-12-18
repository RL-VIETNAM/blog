import { Category } from '@/types/blog';

interface CategoryTagProps {
    category: Category;
}

export default function CategoryTag({ category }: CategoryTagProps) {
    return (
        <span
            className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full"
            style={{
                backgroundColor: category.color || '#3B82F6',
                color: 'white'
            }}
        >
            {category.name}
        </span>
    );
}
