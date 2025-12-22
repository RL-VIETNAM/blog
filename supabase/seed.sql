-- =====================================================
-- HƯỚNG DẪN TẠO ADMIN USER
-- =====================================================
-- Để tạo admin user, bạn cần:
-- 1. Đăng ký tài khoản qua UI tại /login hoặc dùng Supabase Dashboard
-- 2. Sau khi đăng ký, chạy câu lệnh SQL sau để set role = 'admin':
--
--    UPDATE user_profiles 
--    SET role = 'admin' 
--    WHERE id = 'YOUR_USER_ID';
--
-- Hoặc tạo trực tiếp trong Supabase Dashboard:
-- Authentication > Users > Add User
-- Sau đó update role trong bảng user_profiles
-- =====================================================

-- Insert sample authors
INSERT INTO authors (id, name, avatar, bio) VALUES
    ('a1111111-1111-1111-1111-111111111111', 'Nguyễn Văn A', 'https://api.dicebear.com/7.x/avataaars/svg?seed=1', 'Chuyên gia về Reinforcement Learning'),
    ('a2222222-2222-2222-2222-222222222222', 'Trần Thị B', 'https://api.dicebear.com/7.x/avataaars/svg?seed=2', 'Nghiên cứu viên AI'),
    ('a3333333-3333-3333-3333-333333333333', 'Lê Văn C', 'https://api.dicebear.com/7.x/avataaars/svg?seed=3', 'Data Scientist');

-- Insert sample categories
INSERT INTO categories (id, name, slug, color) VALUES
    ('c1111111-1111-1111-1111-111111111111', 'Reinforcement Learning', 'rl', '#3B82F6'),
    ('c2222222-2222-2222-2222-222222222222', 'Deep Learning', 'dl', '#8B5CF6'),
    ('c3333333-3333-3333-3333-333333333333', 'Machine Learning', 'ml', '#10B981'),
    ('c4444444-4444-4444-4444-444444444444', 'Tutorial', 'tutorial', '#F59E0B'),
    ('c5555555-5555-5555-5555-555555555555', 'Research', 'research', '#EF4444');

-- Insert sample posts
INSERT INTO posts (slug, title, excerpt, content, featured_image, category_id, author_id, published_at, reading_time, is_featured, tags) VALUES
    (
        'gioi-thieu-reinforcement-learning',
        'Giới thiệu về Reinforcement Learning: Từ cơ bản đến nâng cao',
        'Tìm hiểu về Reinforcement Learning, một trong những lĩnh vực quan trọng nhất của Machine Learning. Bài viết sẽ giúp bạn hiểu rõ các khái niệm cơ bản và ứng dụng thực tế.',
        'Full content here...',
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
        'c1111111-1111-1111-1111-111111111111',
        'a1111111-1111-1111-1111-111111111111',
        '2025-12-15 00:00:00+00',
        8,
        true,
        ARRAY['RL', 'AI', 'Tutorial']
    ),
    (
        'q-learning-thuat-toan-co-ban',
        'Q-Learning: Thuật toán cơ bản trong Reinforcement Learning',
        'Khám phá Q-Learning, một trong những thuật toán quan trọng nhất trong RL. Tìm hiểu cách hoạt động và cách triển khai trong Python.',
        'Full content here...',
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop',
        'c1111111-1111-1111-1111-111111111111',
        'a2222222-2222-2222-2222-222222222222',
        '2025-12-14 00:00:00+00',
        12,
        false,
        ARRAY['Q-Learning', 'Algorithm']
    ),
    (
        'deep-q-network-dqn',
        'Deep Q-Network (DQN): Kết hợp Deep Learning và RL',
        'DQN là bước đột phá trong việc kết hợp Deep Learning với Reinforcement Learning. Cùng tìm hiểu cách DeepMind đã sử dụng DQN để chinh phục Atari games.',
        'Full content here...',
        'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&h=450&fit=crop',
        'c2222222-2222-2222-2222-222222222222',
        'a1111111-1111-1111-1111-111111111111',
        '2025-12-13 00:00:00+00',
        15,
        false,
        ARRAY['DQN', 'Deep Learning']
    ),
    (
        'policy-gradient-methods',
        'Policy Gradient Methods: Tối ưu hóa chính sách trực tiếp',
        'Tìm hiểu về các phương pháp Policy Gradient, một cách tiếp cận khác trong RL để tối ưu hóa chính sách một cách trực tiếp.',
        'Full content here...',
        'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop',
        'c1111111-1111-1111-1111-111111111111',
        'a3333333-3333-3333-3333-333333333333',
        '2025-12-12 00:00:00+00',
        10,
        false,
        ARRAY['Policy Gradient', 'Optimization']
    ),
    (
        'actor-critic-architecture',
        'Actor-Critic Architecture: Kết hợp ưu điểm của Value và Policy',
        'Actor-Critic là kiến trúc kết hợp giữa value-based và policy-based methods. Khám phá cách nó hoạt động và các biến thể phổ biến.',
        'Full content here...',
        'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=450&fit=crop',
        'c1111111-1111-1111-1111-111111111111',
        'a2222222-2222-2222-2222-222222222222',
        '2025-12-11 00:00:00+00',
        14,
        false,
        ARRAY['Actor-Critic', 'Architecture']
    ),
    (
        'ppo-proximal-policy-optimization',
        'PPO: Thuật toán Reinforcement Learning hiện đại',
        'Proximal Policy Optimization (PPO) là một trong những thuật toán RL phổ biến nhất hiện nay. Tìm hiểu tại sao nó lại được ưa chuộng.',
        'Full content here...',
        'https://images.unsplash.com/photo-1676277791608-ac3b8c6e1bb6?w=800&h=450&fit=crop',
        'c5555555-5555-5555-5555-555555555555',
        'a1111111-1111-1111-1111-111111111111',
        '2025-12-10 00:00:00+00',
        11,
        false,
        ARRAY['PPO', 'Modern RL']
    ),
    (
        'multi-agent-reinforcement-learning',
        'Multi-Agent Reinforcement Learning: Khi nhiều agent học cùng lúc',
        'Khám phá thế giới của Multi-Agent RL, nơi nhiều agent tương tác và học hỏi lẫn nhau trong cùng một môi trường.',
        'Full content here...',
        'https://images.unsplash.com/photo-1620825937374-87fc7d6bddc2?w=800&h=450&fit=crop',
        'c5555555-5555-5555-5555-555555555555',
        'a3333333-3333-3333-3333-333333333333',
        '2025-12-09 00:00:00+00',
        13,
        false,
        ARRAY['Multi-Agent', 'Advanced']
    );
