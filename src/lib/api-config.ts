import { ApiConfig } from './api-types'

// API Configuration
export const API_CONFIG: ApiConfig = {
  // Use mock API for development, real API for production
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/mock',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
}

// Real API Configuration (for production)
export const REAL_API_CONFIG: ApiConfig = {
  baseURL: import.meta.env.VITE_REAL_API_BASE_URL || 'https://api.yourdomain.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
}

// Switch between mock and real API
export const getApiConfig = (): ApiConfig => {
  const useMockApi = import.meta.env.VITE_USE_MOCK_API !== 'false'
  return useMockApi ? API_CONFIG : REAL_API_CONFIG
}

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    SIGNOUT: '/auth/signout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
  },
  
  // Profile
  PROFILE: {
    ME: '/profile',
    UPDATE: '/profile',
    CHANGE_PASSWORD: '/profile/change-password',
    UPLOAD_AVATAR: '/profile/avatar',
    STATS: '/profile/stats',
    PREFERENCES: '/profile/preferences',
  },
  
  // Contracts
  CONTRACTS: {
    LIST: '/contracts',
    DETAIL: (id: string) => `/contracts/${id}`,
    CREATE: '/contracts',
    UPDATE: (id: string) => `/contracts/${id}`,
    DELETE: (id: string) => `/contracts/${id}`,
    UPLOAD_IMAGE: (id: string) => `/contracts/${id}/image`,
  },
  
  // Coupons
  COUPONS: {
    LIST: '/coupons',
    DETAIL: (id: string) => `/coupons/${id}`,
    CLAIM: (id: string) => `/coupons/${id}/claim`,
    USE: (id: string) => `/coupons/${id}/use`,
    AVAILABLE: '/coupons/available',
    CLAIMED: '/coupons/claimed',
    USED: '/coupons/used',
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    DETAIL: (id: string) => `/notifications/${id}`,
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    UNREAD_COUNT: '/notifications/unread-count',
    DELETE: (id: string) => `/notifications/${id}`,
  },
  
  // Installments
  INSTALLMENTS: {
    LIST: '/installments',
    DETAIL: (id: string) => `/installments/${id}`,
    PAYMENTS: (id: string) => `/installments/${id}/payments`,
    RECEIPTS: (id: string) => `/installments/${id}/receipts`,
  },
  
  // Invoices
  INVOICES: {
    LIST: '/invoices',
    DETAIL: (id: string) => `/invoices/${id}`,
    DOWNLOAD: (id: string) => `/invoices/${id}/download`,
  },
  
  // Receipts
  RECEIPTS: {
    LIST: '/receipts',
    DETAIL: (id: string) => `/receipts/${id}`,
    DOWNLOAD: (id: string) => `/receipts/${id}/download`,
  },
  
  // Promotions
  PROMOTIONS: {
    LIST: '/promotions',
    DETAIL: (id: string) => `/promotions/${id}`,
  },
  
  // Blog
  BLOG: {
    LIST: '/blog',
    DETAIL: (id: string) => `/blog/${id}`,
  },
  
  // Guide
  GUIDE: {
    LIST: '/guide',
    DETAIL: (id: string) => `/guide/${id}`,
  },
  
  // Contact
  CONTACT: {
    SEND: '/contact/send',
  },
  
  // Tickets
  TICKETS: {
    LIST: '/tickets',
    DETAIL: (id: string) => `/tickets/${id}`,
    CREATE: '/tickets',
    UPDATE: (id: string) => `/tickets/${id}`,
  },
} as const
