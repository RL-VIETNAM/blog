import { Post, Author, Category } from '@/types/blog';

// Mock Authors
export const authors: Author[] = [
    {
        id: '1',
        name: 'Nguyễn Văn A',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
        bio: 'Chuyên gia về Reinforcement Learning',
    },
    {
        id: '2',
        name: 'Trần Thị B',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
        bio: 'Nghiên cứu viên AI',
    },
    {
        id: '3',
        name: 'Lê Văn C',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
        bio: 'Data Scientist',
    },
];

// Mock Categories
export const categories: Category[] = [
    { id: '1', name: 'Reinforcement Learning', slug: 'rl', color: '#3B82F6' },
    { id: '2', name: 'Deep Learning', slug: 'dl', color: '#8B5CF6' },
    { id: '3', name: 'Machine Learning', slug: 'ml', color: '#10B981' },
    { id: '4', name: 'Tutorial', slug: 'tutorial', color: '#F59E0B' },
    { id: '5', name: 'Research', slug: 'research', color: '#EF4444' },
];

// Mock Posts
export const mockPosts: Post[] = [
    {
        id: '1',
        slug: 'gioi-thieu-reinforcement-learning',
        title: 'Giới thiệu về Reinforcement Learning: Từ cơ bản đến nâng cao',
        excerpt: 'Tìm hiểu về Reinforcement Learning, một trong những lĩnh vực quan trọng nhất của Machine Learning. Bài viết sẽ giúp bạn hiểu rõ các khái niệm cơ bản và ứng dụng thực tế.',
        content: 'Full content here...',
        featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
        category: categories[0],
        author: authors[0],
        publishedAt: '2025-12-15',
        readingTime: 8,
        isFeatured: true,
        tags: ['RL', 'AI', 'Tutorial'],
    },
    {
        id: '2',
        slug: 'q-learning-thuat-toan-co-ban',
        title: 'Q-Learning: Thuật toán cơ bản trong Reinforcement Learning',
        excerpt: 'Khám phá Q-Learning, một trong những thuật toán quan trọng nhất trong RL. Tìm hiểu cách hoạt động và cách triển khai trong Python.',
        content: 'Full content here...',
        featuredImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop',
        category: categories[0],
        author: authors[1],
        publishedAt: '2025-12-14',
        readingTime: 12,
        tags: ['Q-Learning', 'Algorithm'],
    },
    {
        id: '3',
        slug: 'deep-q-network-dqn',
        title: 'Deep Q-Network (DQN): Kết hợp Deep Learning và RL',
        excerpt: 'DQN là bước đột phá trong việc kết hợp Deep Learning với Reinforcement Learning. Cùng tìm hiểu cách DeepMind đã sử dụng DQN để chinh phục Atari games.',
        content: 'Full content here...',
        featuredImage: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&h=450&fit=crop',
        category: categories[1],
        author: authors[0],
        publishedAt: '2025-12-13',
        readingTime: 15,
        tags: ['DQN', 'Deep Learning'],
    },
    {
        id: '4',
        slug: 'policy-gradient-methods',
        title: 'Policy Gradient Methods: Tối ưu hóa chính sách trực tiếp',
        excerpt: 'Tìm hiểu về các phương pháp Policy Gradient, một cách tiếp cận khác trong RL để tối ưu hóa chính sách một cách trực tiếp.',
        content: 'Full content here...',
        featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop',
        category: categories[0],
        author: authors[2],
        publishedAt: '2025-12-12',
        readingTime: 10,
        tags: ['Policy Gradient', 'Optimization'],
    },
    {
        id: '5',
        slug: 'actor-critic-architecture',
        title: 'Actor-Critic Architecture: Kết hợp ưu điểm của Value và Policy',
        excerpt: 'Actor-Critic là kiến trúc kết hợp giữa value-based và policy-based methods. Khám phá cách nó hoạt động và các biến thể phổ biến.',
        content: 'Full content here...',
        featuredImage: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=450&fit=crop',
        category: categories[0],
        author: authors[1],
        publishedAt: '2025-12-11',
        readingTime: 14,
        tags: ['Actor-Critic', 'Architecture'],
    },
    {
        id: '6',
        slug: 'ppo-proximal-policy-optimization',
        title: 'PPO: Thuật toán Reinforcement Learning hiện đại',
        excerpt: 'Proximal Policy Optimization (PPO) là một trong những thuật toán RL phổ biến nhất hiện nay. Tìm hiểu tại sao nó lại được ưa chuộng.',
        content: 'Full content here...',
        featuredImage: 'https://images.unsplash.com/photo-1676277791608-ac3b8c6e1bb6?w=800&h=450&fit=crop',
        category: categories[4],
        author: authors[0],
        publishedAt: '2025-12-10',
        readingTime: 11,
        tags: ['PPO', 'Modern RL'],
    },
    {
        id: '7',
        slug: 'multi-agent-reinforcement-learning',
        title: 'Multi-Agent Reinforcement Learning: Khi nhiều agent học cùng lúc',
        excerpt: 'Khám phá thế giới của Multi-Agent RL, nơi nhiều agent tương tác và học hỏi lẫn nhau trong cùng một môi trường.',
        content: 'Full content here...',
        featuredImage: 'https://images.unsplash.com/photo-1620825937374-87fc7d6bddc2?w=800&h=450&fit=crop',
        category: categories[4],
        author: authors[2],
        publishedAt: '2025-12-09',
        readingTime: 13,
        tags: ['Multi-Agent', 'Advanced'],
    },
];

export const featuredPost = mockPosts[0];
export const latestPosts = mockPosts.slice(1);
