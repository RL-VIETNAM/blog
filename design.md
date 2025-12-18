# Kế hoạch thiết kế trang blog Ghost Template

## Phân tích giao diện tham khảo

Dựa trên trang https://blog.sydexa.com/, giao diện Ghost template có các đặc điểm sau:

### Cấu trúc chính
- Header với logo và navigation menu
- Hero section với tiêu đề blog
- Danh sách bài viết dạng grid/card layout
- Mỗi card bài viết hiển thị: tiêu đề, mô tả ngắn, tác giả, ngày đăng
- Footer với thông tin bổ sung

### Đặc điểm thiết kế
- Giao diện clean, tối giản
- Sử dụng typography rõ ràng, dễ đọc
- Card-based layout cho bài viết
- Responsive design
- Có chức năng Sign in/Subscribe

## Cấu trúc trang chủ blog

### 1. Header Component
**Chức năng:**
- Logo/Tên blog (bên trái)
- Navigation menu (giữa/bên phải)
- Các link: Home, About, Contact, v.v.
- Nút Sign in/Subscribe (bên phải)

**Kỹ thuật:**
- Sticky header khi scroll
- Responsive menu (hamburger menu cho mobile)
- Animation khi scroll

### 2. Hero Section
**Chức năng:**
- Tiêu đề blog
- Tagline/Mô tả ngắn
- Background image hoặc gradient

**Kỹ thuật:**
- Full-width section
- Typography nổi bật
- Có thể thêm search bar

### 3. Featured Post Section
**Chức năng:**
- Hiển thị 1-2 bài viết nổi bật
- Large card với hình ảnh lớn
- Tiêu đề, mô tả, metadata (tác giả, ngày)

**Kỹ thuật:**
- Large featured card layout
- Hover effects
- Lazy loading cho hình ảnh

### 4. Latest Posts Section
**Chức năng:**
- Tiêu đề section "Latest" hoặc "Bài viết mới nhất"
- Grid layout hiển thị danh sách bài viết
- Mỗi card bài viết bao gồm:
  - Hình ảnh thumbnail
  - Tiêu đề bài viết
  - Mô tả ngắn (excerpt)
  - Thông tin tác giả
  - Ngày đăng
  - Tags/Categories
  - Thời gian đọc

**Kỹ thuật:**
- CSS Grid hoặc Flexbox
- 2-3 cột trên desktop, 1 cột trên mobile
- Card hover effects
- Pagination hoặc Load more button

### 5. Sidebar (Optional)
**Chức năng:**
- Search box
- Categories/Tags cloud
- Recent posts
- Newsletter subscription

**Kỹ thuật:**
- Sticky sidebar khi scroll
- Responsive (chuyển xuống dưới trên mobile)

### 6. Footer Component
**Chức năng:**
- Logo và mô tả ngắn
- Links (About, Contact, Privacy Policy, v.v.)
- Social media links
- Copyright information
- Newsletter subscription form

**Kỹ thuật:**
- Multi-column layout
- Responsive footer
- Social icons

## Stack công nghệ đề xuất

### Frontend
- **HTML5**: Cấu trúc semantic
- **CSS3**: Styling với variables, flexbox, grid
- **JavaScript**: Xử lý interaction, pagination, search

### Styling
- **Vanilla CSS** với CSS Variables cho theme
- CSS Grid/Flexbox cho layout
- Media queries cho responsive
- Font từ Google Fonts (Inter, Roboto, hoặc tương tự)

### Optional enhancements
- Thư viện animation (AOS, GSAP) cho smooth transitions
- Lazy loading cho images
- Dark mode toggle

## Lưu trữ dữ liệu

### Phương án 1: Frontend-only (Đơn giản)

**Lưu trữ bài viết:**
- Sử dụng file JSON tĩnh (`data/posts.json`) để lưu danh sách bài viết
- Mỗi bài viết có cấu trúc:
```json
{
  "id": "unique-slug",
  "title": "Tiêu đề bài viết",
  "excerpt": "Mô tả ngắn",
  "content": "Nội dung đầy đủ (HTML hoặc Markdown)",
  "author": {
    "name": "Tên tác giả",
    "avatar": "url-avatar"
  },
  "publishedDate": "2025-12-18",
  "tags": ["tag1", "tag2"],
  "category": "Category name",
  "featuredImage": "url-image",
  "readingTime": 5
}
```

**Lưu trữ tài khoản:**
- Không cần database cho chức năng Sign in/Subscribe
- Tích hợp với dịch vụ bên thứ 3:
  - **Newsletter:** Mailchimp, ConvertKit, EmailOctopus
  - **Authentication:** Auth0, Firebase Authentication
  - **Comments:** Disqus, Facebook Comments

**Ưu điểm:**
- Đơn giản, dễ triển khai
- Không cần backend
- Hosting miễn phí (GitHub Pages, Netlify, Vercel)
- Performance tốt (static files)

**Nhược điểm:**
- Khó quản lý khi có nhiều bài viết
- Không có chức năng quản lý nội dung
- Phải edit JSON thủ công

### Phương án 2: Full-stack với Backend

**Backend Stack:**
- **Node.js + Express** hoặc **Next.js API Routes**
- **Database:** MongoDB, PostgreSQL, hoặc MySQL
- **ORM/ODM:** Mongoose (MongoDB), Prisma, Sequelize

**Lưu trữ bài viết:**

**Database Schema - Posts Table:**
```javascript
{
  id: UUID/ObjectId,
  slug: String (unique, indexed),
  title: String,
  excerpt: String,
  content: String (HTML/Markdown),
  authorId: Reference to Users,
  publishedDate: DateTime,
  updatedDate: DateTime,
  tags: Array of Strings,
  category: String,
  featuredImage: String (URL hoặc file path),
  readingTime: Number,
  status: Enum ['draft', 'published', 'archived'],
  viewCount: Number,
  isFeatured: Boolean
}
```

**Lưu trữ tài khoản:**

**Database Schema - Users Table:**
```javascript
{
  id: UUID/ObjectId,
  email: String (unique, indexed),
  password: String (hashed with bcrypt),
  name: String,
  avatar: String (URL),
  bio: String,
  role: Enum ['admin', 'author', 'subscriber'],
  createdDate: DateTime,
  lastLogin: DateTime,
  isVerified: Boolean,
  subscriptionStatus: Boolean
}
```

**Authentication System:**
- **JWT (JSON Web Token)** cho session management
- **bcrypt** cho password hashing
- **Email verification** khi đăng ký
- **Password reset** functionality
- **Rate limiting** để tránh brute force attacks

**API Endpoints cần thiết:**

**Posts:**
- `GET /api/posts` - Lấy danh sách bài viết (pagination, filter)
- `GET /api/posts/:slug` - Lấy chi tiết bài viết
- `GET /api/posts/featured` - Lấy bài viết nổi bật
- `GET /api/posts/search?q=keyword` - Tìm kiếm bài viết

**Authentication:**
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `POST /api/auth/forgot-password` - Quên mật khẩu
- `POST /api/auth/reset-password` - Reset mật khẩu
- `GET /api/auth/verify-email/:token` - Xác thực email

**Subscription:**
- `POST /api/subscribe` - Đăng ký newsletter
- `POST /api/unsubscribe` - Hủy đăng ký newsletter

**Users:**
- `GET /api/users/:id` - Lấy thông tin user
- `PUT /api/users/:id` - Cập nhật thông tin user

**File Storage cho Images:**
- **Local storage:** Lưu trong thư mục `/uploads`
- **Cloud storage:** AWS S3, Cloudinary, Firebase Storage
- **CDN:** CloudFlare, AWS CloudFront để serve images nhanh hơn

**Ưu điểm:**
- Quản lý nội dung dễ dàng
- Có thể tích hợp CMS
- Chức năng đầy đủ (authentication, authorization)
- Scalable

**Nhược điểm:**
- Phức tạp hơn
- Cần server/hosting có phí
- Cần bảo trì backend

### Phương án 3: Headless CMS (Khuyến nghị)

Sử dụng Headless CMS để quản lý nội dung, kết hợp với frontend tĩnh:

**Headless CMS Options:**
- **Strapi** (open-source, self-hosted)
- **Ghost** (built-in blog platform, có API)
- **Contentful** (commercial, free tier)
- **Sanity** (commercial, free tier)
- **Directus** (open-source)

**Workflow:**
1. Admin quản lý bài viết qua CMS dashboard
2. CMS expose REST API hoặc GraphQL
3. Frontend fetch data từ API
4. Deploy frontend lên static hosting

**Lưu trữ tài khoản:**
- CMS tự quản lý authentication cho admin/authors
- Subscribers sử dụng dịch vụ bên thứ 3 (Mailchimp, etc.)
- Hoặc tích hợp authentication service (Firebase Auth, Auth0)

**Ưu điểm:**
- UI quản lý nội dung có sẵn
- API có sẵn
- Không cần code backend
- Dễ scale

**Nhược điểm:**
- Phụ thuộc vào bên thứ 3 (nếu dùng cloud CMS)
- Có chi phí (nếu vượt free tier)

### Kế hoạch triển khai dự án (Supabase + Cloudinary)

## Stack công nghệ chính thức

### Frontend
- **HTML5, CSS3, JavaScript** (Vanilla hoặc framework tùy chọn)
- **Google Fonts** cho typography

### Backend & Database
- **Supabase** - PostgreSQL database + Authentication + Storage
  - Database cho posts, users, categories, tags
  - Row Level Security (RLS) cho bảo mật
  - Real-time subscriptions (optional)
  - Built-in authentication

### Media Storage
- **Cloudinary** - Lưu trữ và tối ưu hóa hình ảnh
  - Upload và quản lý featured images
  - Automatic image optimization
  - Responsive images với transformations
  - CDN delivery

### Third-party Services
- **Mailchimp/ConvertKit** - Newsletter subscription (optional)

## Database Schema (Supabase)

### Table: posts
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id),
  category_id UUID REFERENCES categories(id),
  featured_image_url TEXT,
  featured_image_public_id TEXT, -- Cloudinary public_id
  is_featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  reading_time INTEGER,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);
```

### Table: users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'subscriber' CHECK (role IN ('admin', 'author', 'subscriber')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table: categories
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table: tags
```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Table: post_tags (Many-to-Many)
```sql
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);
```

### Table: subscribers (Optional - nếu không dùng Mailchimp)
```sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);
```

## Kế hoạch triển khai 2 Phase

### Phase 1: Frontend với Mock Data

**Mục tiêu:** Hoàn thiện 100% giao diện và UX

**1. Setup dự án**
- Tạo cấu trúc thư mục
- Setup HTML, CSS, JavaScript files
- Tạo file mock data

**2. Tạo Mock Data**

File: `data/mock-posts.js`
```javascript
const mockPosts = [
  {
    id: '1',
    slug: 'bai-viet-mau-1',
    title: 'Tiêu đề bài viết mẫu 1',
    excerpt: 'Đây là mô tả ngắn của bài viết để hiển thị trong danh sách',
    content: '<p>Nội dung đầy đủ của bài viết...</p>',
    author: {
      id: 'author-1',
      name: 'Nguyễn Văn A',
      avatar: 'https://via.placeholder.com/150',
      bio: 'Senior Frontend Developer'
    },
    category: {
      id: 'cat-1',
      name: 'Frontend',
      slug: 'frontend'
    },
    tags: [
      { id: 'tag-1', name: 'JavaScript', slug: 'javascript' },
      { id: 'tag-2', name: 'React', slug: 'react' }
    ],
    featuredImage: 'https://via.placeholder.com/800x400',
    isFeatured: true,
    status: 'published',
    readingTime: 5,
    viewCount: 120,
    publishedAt: '2025-12-15T10:00:00Z',
    createdAt: '2025-12-14T10:00:00Z',
    updatedAt: '2025-12-15T10:00:00Z'
  },
  // Thêm 10-15 bài viết mẫu nữa...
];

const mockCategories = [
  { id: 'cat-1', name: 'Frontend', slug: 'frontend', description: 'Lập trình Frontend' },
  { id: 'cat-2', name: 'Backend', slug: 'backend', description: 'Lập trình Backend' },
  { id: 'cat-3', name: 'Database', slug: 'database', description: 'Cơ sở dữ liệu' }
];

const mockTags = [
  { id: 'tag-1', name: 'JavaScript', slug: 'javascript' },
  { id: 'tag-2', name: 'React', slug: 'react' },
  { id: 'tag-3', name: 'Node.js', slug: 'nodejs' }
];
```

**3. Xây dựng Components**
- Header component với navigation
- Hero section
- Featured posts section
- Posts grid với mock data
- Post card component
- Pagination component
- Footer component
- Dark mode toggle

**4. Implement Features**
- Filter posts theo category/tag
- Search functionality
- Pagination
- Responsive design
- Animations và transitions
- Loading states
- Error states

**5. Testing & Polish**
- Test trên các màn hình khác nhau
- Test trên các trình duyệt khác nhau
- Optimize performance
- Accessibility testing
- SEO optimization

**Deliverables Phase 1:**
- Giao diện hoàn chỉnh 100%
- Tất cả tính năng frontend hoạt động với mock data
- Responsive trên mọi thiết bị
- Code được organize tốt, dễ chuyển sang real data

### Phase 2: Tích hợp Supabase + Cloudinary

**Mục tiêu:** Thay thế mock data bằng real data từ Supabase và Cloudinary

**1. Setup Supabase**

```javascript
// config/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)
```

**Các bước:**
- Tạo project trên Supabase
- Tạo các tables theo schema đã định nghĩa
- Setup Row Level Security (RLS) policies
- Tạo sample data trong database
- Test connection từ frontend

**2. Setup Cloudinary**

```javascript
// config/cloudinary.js
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME'
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET' // unsigned preset

export const uploadToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData
    }
  )
  
  return await response.json()
}

// URL transformation helper
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 'auto',
    quality = 'auto',
    format = 'auto'
  } = options
  
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},q_${quality},f_${format}/${publicId}`
}
```

**Các bước:**
- Tạo account Cloudinary (free tier)
- Setup upload preset (unsigned)
- Upload sample images
- Test upload function
- Implement responsive image URLs

**3. Tạo API Service Layer**

```javascript
// services/posts.service.js
import { supabase } from '../config/supabase.js'

export const postsService = {
  // Lấy danh sách bài viết
  async getPosts({ page = 1, limit = 10, category = null, tag = null, search = null }) {
    let query = supabase
      .from('posts')
      .select(`
        *,
        author:users(*),
        category:categories(*),
        tags:post_tags(tag:tags(*))
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)
    
    if (category) {
      query = query.eq('category.slug', category)
    }
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`)
    }
    
    const { data, error, count } = await query
    
    if (error) throw error
    
    return { posts: data, count }
  },
  
  // Lấy bài viết featured
  async getFeaturedPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(*),
        category:categories(*),
        tags:post_tags(tag:tags(*))
      `)
      .eq('status', 'published')
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(3)
    
    if (error) throw error
    return data
  },
  
  // Lấy chi tiết bài viết
  async getPostBySlug(slug) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(*),
        category:categories(*),
        tags:post_tags(tag:tags(*))
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    
    if (error) throw error
    
    // Tăng view count
    await this.incrementViewCount(data.id)
    
    return data
  },
  
  // Tăng view count
  async incrementViewCount(postId) {
    const { error } = await supabase.rpc('increment_view_count', {
      post_id: postId
    })
    
    if (error) console.error('Error incrementing view count:', error)
  },
  
  // Search posts
  async searchPosts(query) {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        author:users(*),
        category:categories(*)
      `)
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
      .order('published_at', { ascending: false })
      .limit(20)
    
    if (error) throw error
    return data
  }
}
```

```javascript
// services/categories.service.js
export const categoriesService = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },
  
  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  }
}
```

**4. Migration từ Mock Data sang Real Data**

**Bước 1:** Tạo data adapter layer
```javascript
// utils/dataAdapter.js
import { mockPosts, mockCategories, mockTags } from '../data/mock-posts.js'
import { postsService } from '../services/posts.service.js'

const USE_MOCK_DATA = false // Toggle này để switch giữa mock và real data

export const dataAdapter = {
  async getPosts(options) {
    if (USE_MOCK_DATA) {
      // Mock implementation
      return {
        posts: mockPosts.slice(0, options.limit),
        count: mockPosts.length
      }
    } else {
      // Real implementation
      return await postsService.getPosts(options)
    }
  },
  
  async getFeaturedPosts() {
    if (USE_MOCK_DATA) {
      return mockPosts.filter(p => p.isFeatured)
    } else {
      return await postsService.getFeaturedPosts()
    }
  },
  
  // ... các methods khác tương tự
}
```

**Bước 2:** Update UI code để sử dụng dataAdapter
```javascript
// main.js
import { dataAdapter } from './utils/dataAdapter.js'

async function loadPosts() {
  try {
    showLoading()
    const { posts, count } = await dataAdapter.getPosts({ 
      page: currentPage, 
      limit: 10 
    })
    renderPosts(posts)
    renderPagination(count)
  } catch (error) {
    showError(error.message)
  } finally {
    hideLoading()
  }
}
```

**Bước 3:** Populate Supabase với data thật
- Upload hình ảnh lên Cloudinary
- Copy Cloudinary URLs
- Insert data vào Supabase tables
- Test từng API endpoint

**Bước 4:** Switch sang real data
- Đổi `USE_MOCK_DATA = false`
- Test tất cả tính năng
- Fix bugs nếu có

**5. Implement Authentication (Optional)**

```javascript
// services/auth.service.js
export const authService = {
  async signUp(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })
    
    if (error) throw error
    return data
  },
  
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },
  
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },
  
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
}
```

**6. Implement Newsletter Subscription**

Option 1: Lưu trong Supabase
```javascript
// services/subscribers.service.js
export const subscribersService = {
  async subscribe(email) {
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email }])
      .select()
    
    if (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('Email đã được đăng ký')
      }
      throw error
    }
    
    return data
  }
}
```

Option 2: Tích hợp Mailchimp
```javascript
// services/mailchimp.service.js
export const mailchimpService = {
  async subscribe(email) {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    
    if (!response.ok) throw new Error('Subscription failed')
    return await response.json()
  }
}
```

**7. Optimization & Production Ready**
- Setup environment variables
- Implement error handling
- Add loading states
- Optimize images với Cloudinary transformations
- Setup caching
- Add analytics
- SEO optimization
- Security audit

**Deliverables Phase 2:**
- Tích hợp hoàn chỉnh với Supabase
- Tất cả images lưu trên Cloudinary
- Authentication hoạt động (nếu implement)
- Newsletter subscription hoạt động
- Production ready

## Timeline ước tính

**Phase 1 - Frontend với Mock Data:**
- Week 1: Setup + HTML structure + CSS foundation
- Week 2: Components + Styling
- Week 3: JavaScript functionality + Interactions
- Week 4: Polish + Testing + Optimization

**Phase 2 - Backend Integration:**
- Week 5: Supabase setup + Cloudinary setup + API layer
- Week 6: Migration + Testing + Bug fixes
- Week 7: Authentication + Newsletter + Extra features
- Week 8: Final testing + Optimization + Deployment

**Total: 8 weeks**

## Thiết kế hệ thống

### Color Palette
**Light Mode:**
- Background: #FFFFFF, #F8F9FA
- Text: #1A1A1A, #666666
- Accent: #4A90E2 hoặc brand color
- Border: #E5E5E5

**Dark Mode:**
- Background: #1A1A1A, #2D2D2D
- Text: #FFFFFF, #B3B3B3
- Accent: #5BA3F5
- Border: #3D3D3D

### Typography
- **Heading**: Font-family serif hoặc sans-serif hiện đại
- **Body**: Sans-serif dễ đọc
- **Font sizes**: Sử dụng clamp() cho responsive typography

### Spacing
- Sử dụng spacing scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- Container max-width: 1200px-1400px
- Padding cho sections: 60px-100px

## Cấu trúc thư mục đề xuất

```
blog/
├── index.html
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── header.css
│   ├── hero.css
│   ├── posts.css
│   ├── footer.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── posts.js
│   └── theme.js
├── images/
│   ├── logo.svg
│   ├── posts/
│   └── icons/
└── data/
    └── posts.json
```

## Luồng triển khai

### Bước 1: Thiết lập cấu trúc HTML
- Tạo file index.html với semantic HTML5
- Định nghĩa các sections chính
- Thêm meta tags SEO

### Bước 2: CSS Foundation
- Tạo CSS variables cho colors, fonts, spacing
- Reset CSS/Normalize
- Typography base styles
- Container và layout utilities

### Bước 3: Header Component
- Layout header với logo và navigation
- Sticky header functionality
- Responsive hamburger menu
- Sign in/Subscribe buttons

### Bước 4: Hero Section
- Full-width hero với background
- Typography styling
- Responsive layout

### Bước 5: Featured Posts
- Large card layout
- Image với aspect ratio
- Metadata styling
- Hover effects

### Bước 6: Latest Posts Grid
- CSS Grid layout
- Card component
- Responsive columns
- Hover animations

### Bước 7: Footer
- Multi-column layout
- Social icons
- Newsletter form
- Responsive footer

### Bước 8: JavaScript Functionality
- Posts data loading (JSON hoặc array)
- Filter/Search functionality
- Pagination hoặc infinite scroll
- Dark mode toggle
- Smooth scroll animations

### Bước 9: Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly interactions
- Performance optimization

### Bước 10: Polish và Optimization
- Micro-animations
- Loading states
- Error handling
- Image optimization
- Performance testing
- Cross-browser testing

## Tính năng nâng cao (Optional)

### Search
- Real-time search trong posts
- Highlight search results
- Search suggestions

### Filter
- Filter theo categories
- Filter theo tags
- Filter theo tác giả
- Filter theo ngày

### Pagination
- Numbered pagination
- Load more button
- Infinite scroll

### Social Features
- Share buttons
- View count
- Reading time estimation
- Comments preview

### Performance
- Lazy loading images
- Code splitting
- Minification
- Caching strategy

## Checklist triển khai

### HTML
- [ ] Semantic HTML structure
- [ ] Meta tags (SEO, Open Graph, Twitter Cards)
- [ ] Favicon
- [ ] Accessibility (ARIA labels, alt texts)

### CSS
- [ ] CSS Variables thiết lập
- [ ] Reset/Normalize CSS
- [ ] Typography system
- [ ] Color palette
- [ ] Spacing system
- [ ] Component styles
- [ ] Responsive breakpoints
- [ ] Animations/Transitions
- [ ] Dark mode styles

### JavaScript
- [ ] Posts data structure
- [ ] Dynamic rendering
- [ ] Search functionality
- [ ] Filter functionality
- [ ] Pagination
- [ ] Theme switcher
- [ ] Smooth scroll
- [ ] Interactive animations

### Testing
- [ ] Cross-browser testing
- [ ] Mobile responsive testing
- [ ] Performance testing
- [ ] Accessibility testing
- [ ] SEO validation

### Deployment
- [ ] Image optimization
- [ ] Code minification
- [ ] Build process
- [ ] Hosting setup
