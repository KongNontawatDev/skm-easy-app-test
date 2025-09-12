import { MockApiService } from '@/lib/mock-api'
import type { User } from '@/lib/types'

// Mock user data
const mockUser: User = {
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

export class ProfileApiService {
  // Get current user profile
  static async getProfile() {
    return MockApiService.get<User>('/profile')
      .then(response => ({
        ...response,
        data: mockUser
      }))
  }

  // Update user profile
  static async updateProfile(data: Partial<User>) {
    const updatedUser = {
      ...mockUser,
      ...data,
      updatedAt: new Date().toISOString()
    }
    
    return MockApiService.put<User>('/profile', updatedUser)
      .then(response => ({
        ...response,
        data: updatedUser
      }))
  }

  // Change password
  static async changePassword(data: { currentPassword: string; newPassword: string }) {
    return MockApiService.post<{ success: boolean }>('/profile/change-password', data)
      .then(response => ({
        ...response,
        data: { success: true }
      }))
  }

  // Upload avatar
  static async uploadAvatar(file: File) {
    // Simulate file upload
    const mockUrl = `https://example.com/avatars/${file.name}`
    return MockApiService.post<{ url: string }>('/profile/avatar', { url: mockUrl })
      .then(response => ({
        ...response,
        data: { url: mockUrl }
      }))
  }

  // Get user statistics
  static async getUserStats() {
    const stats = {
      totalContracts: 3,
      activeContracts: 2,
      totalPayments: 12,
      nextPayment: {
        amount: 15000,
        dueDate: '2024-02-15'
      },
      totalCoupons: 5,
      usedCoupons: 2
    }
    
    return MockApiService.get<typeof stats>('/profile/stats')
      .then(response => ({
        ...response,
        data: stats
      }))
  }

  // Get user preferences
  static async getPreferences() {
    const preferences = {
      theme: 'light',
      language: 'th',
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        showPhone: true,
        showEmail: false
      }
    }
    
    return MockApiService.get<typeof preferences>('/profile/preferences')
      .then(response => ({
        ...response,
        data: preferences
      }))
  }

  // Update user preferences
  static async updatePreferences(data: any) {
    return MockApiService.put('/profile/preferences', data)
  }
}
