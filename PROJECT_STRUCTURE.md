# Cấu Trúc Project Blog

## Tổng Quan

Cấu trúc project đã được tạo theo thiết kế layout trong `layout-design.md` với các thành phần sau:

## Cấu Trúc Thư Mục

```
giac-mo-rl-vietnam/
├── components/
│   ├── cards/
│   │   ├── PostCard.tsx           # Card bài viết (16:9, min-height 400px)
│   │   └── FeaturedCard.tsx       # Card nổi bật (2 layouts: vertical/horizontal)
│   │
│   ├── layout/
│   │   ├── Header.tsx             # Header sticky (80px desktop, 64px mobile)
│   │   ├── Footer.tsx             # Footer với 4 columns grid
│   │   └── MobileMenu.tsx         # Hamburger menu slide-in
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx        # Hero với gradient, title, search
│   │   ├── FeaturedPost.tsx       # Section bài viết nổi bật
│   │   └── LatestPosts.tsx        # Grid 3/2/1 columns responsive
│   │
│   └── ui/
│       ├── Button.tsx             # Button component với variants
│       ├── CategoryTag.tsx        # Tag category có màu
│       ├── AuthorInfo.tsx         # Thông tin tác giả + ngày + reading time
│       └── Pagination.tsx         # 2 variants: numbers/loadmore
│
├── lib/
│   ├── constants.ts               # Breakpoints, spacing, z-index
│   └── utils.ts                   # Helper functions
│
├── styles/
│   └── variables.css              # CSS variables cho design system
│
└── types/
    └── blog.ts                    # TypeScript interfaces (Post, Author, Category)
```

## Chi Tiết Components

### Layout Components

**Header.tsx**
- Container max-width: 1400px
- Sticky position với z-index: 1000
- Height: 80px (desktop), 64px (mobile)
- Navigation links + Auth buttons
- Mobile: Hamburger menu toggle

**Footer.tsx**
- Background: Dark (gray-900)
- Grid 4 columns: About, Links, Social, Newsletter
- Newsletter form với email input
- Copyright section

**MobileMenu.tsx**
- Slide-in animation từ bên phải
- Width: 280px
- Overlay backdrop với blur
- Vertical stack nav links + auth buttons

### Section Components

**HeroSection.tsx**
- Height: 400-500px (desktop), 300px (mobile)
- Gradient background: blue-600 to purple-700
- Centered content max-width: 800px
- Title + Tagline + Search bar
- Decorative blur elements

**FeaturedPost.tsx**
- Container max-width: 1400px
- Padding: 80px vertical (desktop), 48px (mobile)
- Wrapper cho FeaturedCard

**LatestPosts.tsx**
- Grid system responsive:
  - Desktop (>1024px): 3 columns
  - Tablet (768-1024px): 2 columns
  - Mobile (<768px): 1 column
- Gap: 32px (desktop), 24px (tablet), 16px (mobile)
- Pagination tích hợp

### Card Components

**PostCard.tsx**
- Image aspect ratio: 16:9
- Min-height: 400-450px
- Hover: translateY(-4px) + shadow
- Structure:
  - Featured image
  - Category tag
  - Title (2 lines max)
  - Excerpt (3 lines max)
  - Author info (border-top)

**FeaturedCard.tsx**
- 2 layout options:
  - **Vertical**: Single large card, image top
  - **Horizontal**: 50/50 split (image left, content right)
- Hover: scale image 1.05
- "Đọc thêm" button với arrow animation

### UI Components

**Button.tsx**
- Variants: primary, secondary, outline, ghost
- Sizes: sm, md, lg
- Disabled states

**CategoryTag.tsx**
- Custom background color từ category
- Uppercase text
- Rounded-full shape

**AuthorInfo.tsx**
- Avatar image (40x40, rounded-full)
- Author name + date + reading time
- Border-top separator

**Pagination.tsx**
- 2 variants:
  - **numbers**: Page numbers với ellipsis
  - **loadmore**: Single button
- Disabled states cho prev/next

## Constants & Variables

### Breakpoints
```typescript
xs: '0px'
sm: '640px'
md: '768px'
lg: '1024px'
xl: '1280px'
2xl: '1536px'
```

### Spacing Scale
```typescript
xs: '4px'    // tight spacing
sm: '8px'    // icon gaps
md: '12px'   // small gaps
base: '16px' // default
lg: '24px'   // section spacing
xl: '32px'   // major spacing
2xl: '48px'  // section padding
3xl: '64px'  // hero padding
4xl: '80px'  // major sections
5xl: '120px' // large sections
```

### Z-index Layers
```typescript
base: 0
dropdown: 100
header: 1000
modalOverlay: 2000
modalContent: 2001
notification: 3000
```

### Container Widths
```typescript
max: '1400px'
lg: '1200px'
md: '960px'
sm: '640px'
```

## TypeScript Types

### Post Interface
```typescript
interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  category: Category
  author: Author
  publishedAt: string
  readingTime: number
  isFeatured?: boolean
  tags?: string[]
}
```

### Author Interface
```typescript
interface Author {
  id: string
  name: string
  avatar?: string
  bio?: string
}
```

### Category Interface
```typescript
interface Category {
  id: string
  name: string
  slug: string
  color?: string
}
```

## Sử Dụng

Tất cả components đã được tạo và sẵn sàng sử dụng. Để tích hợp vào homepage:

1. Import các section components vào `app/page.tsx`
2. Tạo mock data hoặc fetch data từ API/CMS
3. Pass data vào components

Ví dụ:
```tsx
import HeroSection from '@/components/sections/HeroSection'
import FeaturedPost from '@/components/sections/FeaturedPost'
import LatestPosts from '@/components/sections/LatestPosts'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPost post={featuredPost} />
      <LatestPosts posts={latestPosts} />
    </>
  )
}
```

## Dependencies Cần Thiết

Đảm bảo đã cài đặt:
- `clsx` - cho utility function cn()
- `next/image` - đã có sẵn trong Next.js
- `next/link` - đã có sẵn trong Next.js

Chạy lệnh:
```bash
npm install clsx
```
