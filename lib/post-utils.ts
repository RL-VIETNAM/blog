export function calculateReadingTime(content: string): number {
    // Lấy text từ HTML content
    const text = content.replace(/<[^>]*>/g, '');

    // Đếm số từ (tính cả tiếng Việt)
    const words = text.trim().split(/\s+/).length;

    // Tốc độ đọc trung bình: 200 từ/phút
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);

    // Tối thiểu 1 phút
    return Math.max(1, minutes);
}

export function formatTagsForDatabase(tagsString: string): string[] {
    if (!tagsString.trim()) {
        return [];
    }

    return tagsString
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
}

export function formatTagsForDisplay(tagsArray: string[]): string {
    return tagsArray.join(', ');
}
