# Thiết kế khung trang Blog

## Cấu trúc tổng thể

```
┌─────────────────────────────────────────────────────────┐
│                       HEADER                             │
│  Logo    Navigation Menu         Sign In | Subscribe    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                     HERO SECTION                         │
│              Blog Title + Tagline                        │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                  FEATURED POST                           │
│         Large Card with Featured Image                   │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                   LATEST POSTS                           │
│                                                          │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│   │  Card 1  │  │  Card 2  │  │  Card 3  │             │
│   └──────────┘  └──────────┘  └──────────┘             │
│                                                          │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│   │  Card 4  │  │  Card 5  │  │  Card 6  │             │
│   └──────────┘  └──────────┘  └──────────┘             │
│                                                          │
│              [Load More / Pagination]                    │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                       FOOTER                             │
│     About  |  Contact  |  Social Links  |  Newsletter   │
└─────────────────────────────────────────────────────────┘
```

## Chi tiết từng phần

### 1. Header

**Kích thước:**
- Height: 80px (desktop), 64px (mobile)
- Position: Sticky/Fixed
- Z-index: 1000

**Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│  [Logo]    [Home] [About] [Contact]    [Sign In] [Subscribe]  │
│  100px              center                        right        │
└────────────────────────────────────────────────────────────────┘
```

**Cấu trúc:**
- Container: max-width 1400px, centered
- Padding: 0 32px (desktop), 0 16px (mobile)
- Display: Flex, justify-content: space-between
- Align-items: center

**Elements:**
- Logo: Width 120px-150px
- Navigation: Gap 32px giữa các links
- Auth buttons: Gap 16px

**Mobile (< 768px):**
```
┌────────────────────────────────────┐
│  [Logo]              [☰ Menu]      │
└────────────────────────────────────┘

Hamburger menu slide-in từ bên phải
```

### 2. Hero Section

**Kích thước:**
- Height: 400px-500px (desktop), 300px (mobile)
- Background: Gradient hoặc solid color

**Layout:**
```
┌─────────────────────────────────────────┐
│                                          │
│                 (centered)               │
│          ┌──────────────────┐            │
│          │   Blog Title      │           │
│          │   Tagline text    │           │
│          │   [Search bar]    │           │
│          └──────────────────┘            │
│                                          │
└─────────────────────────────────────────┘
```

**Cấu trúc:**
- Container: max-width 800px, centered
- Text-align: center
- Padding: 80px 32px

**Elements:**
- Title: Font-size 48px-64px (desktop), 32px-40px (mobile)
- Tagline: Font-size 18px-20px, opacity 0.8
- Search bar (optional): Max-width 500px

### 3. Featured Post Section

**Kích thước:**
- Container: max-width 1400px
- Padding: 80px 32px (desktop), 48px 16px (mobile)

**Layout - Option 1: Single Large Card**
```
┌──────────────────────────────────────────────────────────┐
│                                                           │
│                   Featured Image                         │
│                    (16:9 ratio)                          │
│                                                           │
├──────────────────────────────────────────────────────────┤
│  Category Tag                                            │
│  Post Title (Large)                                      │
│  Excerpt text (2-3 lines)                                │
│  Author info | Date | Reading time                       │
└──────────────────────────────────────────────────────────┘
```

**Layout - Option 2: Horizontal Split**
```
┌─────────────────────────┬─────────────────────────┐
│                          │  Category Tag            │
│    Featured Image        │  Post Title              │
│      (1:1 ratio)         │  Excerpt (3-4 lines)     │
│                          │  Author | Date           │
│                          │  [Read More →]           │
└─────────────────────────┴─────────────────────────┘
        50%                         50%
```

**Cấu trúc:**
- Background: Card với shadow hoặc border
- Border-radius: 12px-16px
- Padding: 24px-32px
- Hover: Slight lift effect

### 4. Latest Posts Section

**Kích thước:**
- Container: max-width 1400px
- Padding: 80px 32px (desktop), 48px 16px (mobile)

**Layout - Desktop (3 columns)**
```
┌──────────────────────────────────────────────────────────┐
│  Latest Posts                                            │
├─────────────┬──────────────┬─────────────┐              │
│  ┌────────┐ │  ┌────────┐  │  ┌────────┐ │              │
│  │ Image  │ │  │ Image  │  │  │ Image  │ │              │
│  └────────┘ │  └────────┘  │  └────────┘ │              │
│  Category   │  Category    │  Category   │              │
│  Title      │  Title       │  Title      │              │
│  Excerpt    │  Excerpt     │  Excerpt    │              │
│  Author|Date│  Author|Date │  Author|Date│              │
└─────────────┴──────────────┴─────────────┘              │
     33.33%        33.33%         33.33%                   │
```

**Grid System:**
- Display: Grid
- Grid-template-columns: repeat(3, 1fr) (desktop)
- Gap: 32px (desktop), 24px (tablet), 16px (mobile)

**Responsive Breakpoints:**
- Desktop (> 1024px): 3 columns
- Tablet (768px - 1024px): 2 columns
- Mobile (< 768px): 1 column

### 5. Post Card Component

**Kích thước:**
- Min-height: 400px-450px
- Aspect ratio image: 16:9

**Cấu trúc:**
```
┌─────────────────────────┐
│                          │
│    Featured Image        │
│     (16:9 ratio)         │
│                          │
├─────────────────────────┤
│ [Category Tag]           │
│                          │
│ Post Title               │
│ (2 lines max)            │
│                          │
│ Excerpt text             │
│ (3 lines max)            │
│                          │
├─────────────────────────┤
│ Avatar | Author Name     │
│ Date   | Reading Time    │
└─────────────────────────┘
```

**Spacing:**
- Image: margin-bottom 16px
- Category tag: margin-bottom 12px
- Title: margin-bottom 12px
- Excerpt: margin-bottom 16px
- Meta info: padding-top 16px, border-top

**States:**
- Default: border 1px solid, subtle shadow
- Hover: Transform translateY(-4px), shadow increase

### 6. Pagination

**Kích thước:**
- Container: centered
- Padding: 48px 0

**Layout - Option 1: Load More Button**
```
┌─────────────────────────────────┐
│      [Load More Posts]           │
└─────────────────────────────────┘
        Button: padding 16px 48px
```

**Layout - Option 2: Page Numbers**
```
┌─────────────────────────────────────┐
│  [←]  [1] [2] [3] ... [10]  [→]    │
└─────────────────────────────────────┘
        Gap: 8px between items
```

### 7. Footer

**Kích thước:**
- Min-height: 300px-400px
- Background: Dark color hoặc subtle gradient
- Padding: 64px 32px 32px

**Layout:**
```
┌──────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │  About   │  │  Links   │  │  Social  │  │Newsletter│ │
│  │          │  │          │  │          │  │          │ │
│  │  Logo    │  │  Home    │  │  [FB]    │  │ [Email]  │ │
│  │  Text    │  │  About   │  │  [TW]    │  │ [Submit] │ │
│  │          │  │  Contact │  │  [IG]    │  │          │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘ │
│                                                           │
├───────────────────────────────────────────────────────────┤
│              © 2025 Blog Name. All rights reserved        │
└──────────────────────────────────────────────────────────┘
```

**Grid System:**
- Display: Grid
- Grid-template-columns: repeat(4, 1fr) (desktop)
- Gap: 48px (desktop), 32px (mobile)

**Mobile:**
- Stack vertically
- 1 column layout

## Container & Spacing System

### Container widths
```
Max-width: 1400px
Breakpoints:
- xl: 1400px
- lg: 1200px
- md: 960px
- sm: 640px
```

### Padding System
```
Desktop (> 1024px):
- Section vertical: 80px-120px
- Section horizontal: 32px-48px
- Card inner: 24px-32px

Tablet (768px - 1024px):
- Section vertical: 60px-80px
- Section horizontal: 24px-32px
- Card inner: 20px-24px

Mobile (< 768px):
- Section vertical: 48px-60px
- Section horizontal: 16px-20px
- Card inner: 16px-20px
```

### Gap/Spacing Scale
```
4px   - xs   (tight spacing)
8px   - sm   (icon gaps)
12px  - md   (small gaps)
16px  - base (default)
24px  - lg   (section spacing)
32px  - xl   (major spacing)
48px  - 2xl  (section padding)
64px  - 3xl  (hero padding)
80px  - 4xl  (major sections)
```

## Grid System Chi Tiết

### Posts Grid
```css
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

@media (max-width: 1024px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
```

### Featured Post
```css
.featured-post {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}

@media (max-width: 768px) {
  .featured-post {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

## Responsive Breakpoints

```
Mobile First Approach:

xs: 0px - 639px      (Mobile)
sm: 640px - 767px    (Large Mobile)
md: 768px - 1023px   (Tablet)
lg: 1024px - 1279px  (Small Desktop)
xl: 1280px - 1535px  (Desktop)
2xl: 1536px+         (Large Desktop)
```

## Z-index Layers

```
Base layer:       0
Dropdown:         100
Sticky header:    1000
Modal overlay:    2000
Modal content:    2001
Notification:     3000
```

## Aspect Ratios

```
Featured image (large): 16:9
Post card image:        16:9
Avatar:                 1:1
Logo:                   Custom (maintain ratio)
```

## Whitespace Rules

### Vertical Rhythm
- Sections: 80px-120px apart
- Components: 48px-64px apart
- Elements: 16px-32px apart
- Text lines: 1.5-1.8 line-height

### Horizontal Spacing
- Container edges: 32px minimum
- Grid gaps: 24px-32px
- Card padding: 24px-32px
- Button padding: 12px-24px horizontal

## Mobile Adaptations

### Header
- Reduce height: 64px
- Convert nav to hamburger menu
- Stack auth buttons vertically in menu

### Hero
- Reduce height: 300px
- Reduce font sizes by 30-40%
- Remove search bar hoặc simplify

### Featured Post
- Stack vertically (image top, content bottom)
- Image aspect ratio remains 16:9

### Posts Grid
- Single column
- Reduce gaps: 16px
- Maintain card structure

### Footer
- Single column
- Stack sections vertically
- Reduce padding: 48px vertical
