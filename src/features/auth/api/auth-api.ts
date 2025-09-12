import { MockApiService } from '@/lib/mock-api'

// Mock user data
const mockUser = {
  id: '1',
  name: 'สมชาย ใจดี',
  email: 'somchai@example.com',
  phone: '0812345678',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'user',
  isActive: true,
  lastLoginAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export class AuthApiService {
  // Sign in
  static async signIn(data: { nationalId: string; phoneNumber: string; captchaToken: string }) {
    // Simulate validation
    if (!data.nationalId || !data.phoneNumber) {
      throw new Error('กรุณากรอกข้อมูลให้ครบถ้วน')
    }

    // Simulate captcha validation
    if (!data.captchaToken) {
      throw new Error('กรุณายืนยันตัวตนด้วย reCAPTCHA')
    }

    // Simulate authentication
    const tokens = {
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      expiresIn: 3600
    }

    return MockApiService.post('/auth/signin', {
      user: mockUser,
      tokens
    })
  }

  // Sign up
  static async signUp(data: {
    name: string
    email: string
    phone: string
    password: string
    confirmPassword: string
    captchaToken: string
  }) {
    // Simulate validation
    if (!data.name || !data.email || !data.phone || !data.password) {
      throw new Error('กรุณากรอกข้อมูลให้ครบถ้วน')
    }

    if (data.password !== data.confirmPassword) {
      throw new Error('รหัสผ่านไม่ตรงกัน')
    }

    if (!data.captchaToken) {
      throw new Error('กรุณายืนยันตัวตนด้วย reCAPTCHA')
    }

    // Simulate user creation
    const newUser = {
      ...mockUser,
      id: 'new-user-' + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone
    }

    const tokens = {
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      expiresIn: 3600
    }

    return MockApiService.post('/auth/signup', {
      user: newUser,
      tokens
    })
  }

  // Sign out
  static async signOut() {
    return MockApiService.post('/auth/signout', {})
  }

  // Refresh token
  static async refreshToken(_refreshToken: string) {
    // Simulate token refresh
    const newTokens = {
      accessToken: 'mock-access-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      expiresIn: 3600
    }

    return MockApiService.post('/auth/refresh', newTokens)
  }

  // Forgot password
  static async forgotPassword(email: string) {
    if (!email) {
      throw new Error('กรุณากรอกอีเมล')
    }

    return MockApiService.post('/auth/forgot-password', {
      message: 'ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว'
    })
  }

  // Reset password
  static async resetPassword(data: {
    token: string
    password: string
    confirmPassword: string
  }) {
    if (!data.token || !data.password || !data.confirmPassword) {
      throw new Error('กรุณากรอกข้อมูลให้ครบถ้วน')
    }

    if (data.password !== data.confirmPassword) {
      throw new Error('รหัสผ่านไม่ตรงกัน')
    }

    return MockApiService.post('/auth/reset-password', {
      message: 'รีเซ็ตรหัสผ่านสำเร็จ'
    })
  }

  // Verify email
  static async verifyEmail(token: string) {
    if (!token) {
      throw new Error('Token ไม่ถูกต้อง')
    }

    return MockApiService.post('/auth/verify-email', {
      message: 'ยืนยันอีเมลสำเร็จ'
    })
  }

  // Resend verification email
  static async resendVerificationEmail(email: string) {
    if (!email) {
      throw new Error('กรุณากรอกอีเมล')
    }

    return MockApiService.post('/auth/resend-verification', {
      message: 'ส่งอีเมลยืนยันใหม่แล้ว'
    })
  }
}
