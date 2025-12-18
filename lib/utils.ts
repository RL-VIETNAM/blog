export function cn(...inputs: string[]) {
    return inputs.filter(Boolean).join(' ');
}

export function formatDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function getReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}
