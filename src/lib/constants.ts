export const APP_CONFIG = {
  name: 'SKM Easy App',
  version: '1.0.0',
  description: 'แอปพลิเคชันสำหรับการผ่อนชำระรถยนต์',
  primaryColor: '#EC1B2E',
  secondaryColor: '#C20010',
} as const

export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  BLOG: '/blog',
  TICKET: '/ticket',
  CONTACT: '/contact',
  PROMOTION: '/promotion',
  GUIDE: '/guide',
  COUPON: '/coupon',
  CONTRACT: '/contract',
  INVOICE: '/invoice',
  RECEIPT: '/receipt',
  INSTALLMENT: '/installment',
  NOTIFICATION: '/notification',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
} as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  CONTRACTS: '/contracts',
  INVOICES: '/invoices',
  RECEIPTS: '/receipts',
  INSTALLMENTS: '/installments',
  NOTIFICATIONS: '/notification',
  BLOGS: '/blogs',
  TICKETS: '/tickets',
  COUPONS: '/coupons',
  PROMOTIONS: '/promotions',
  GUIDES: '/guides',
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const

export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
  },
  PHONE: {
    PATTERN: /^[0-9]{10}$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
} as const

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const

export const THEME_COLORS = {
  PRIMARY: '#EC1B2E',
  SECONDARY: '#C20010',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
  GRAY: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const

export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
} as const
