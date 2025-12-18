export const BREAKPOINTS = {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;

export const SPACING = {
    xs: '4px',
    sm: '8px',
    md: '12px',
    base: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '80px',
    '5xl': '120px',
} as const;

export const Z_INDEX = {
    base: 0,
    dropdown: 100,
    header: 1000,
    modalOverlay: 2000,
    modalContent: 2001,
    notification: 3000,
} as const;

export const CONTAINER = {
    max: '1400px',
    lg: '1200px',
    md: '960px',
    sm: '640px',
} as const;

export const HEADER_HEIGHT = {
    desktop: '80px',
    mobile: '64px',
} as const;

export const ASPECT_RATIOS = {
    featured: '16/9',
    postCard: '16/9',
    avatar: '1/1',
} as const;
