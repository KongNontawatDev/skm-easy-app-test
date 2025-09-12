import { MockApiService } from '@/lib/mock-api'
import { mockNotifications } from '../data/mock-data'
import type { Notification } from '../types'
import type { QueryParams } from '@/lib/api-types'

export class NotificationApiService {
  // Get all notifications with pagination and filters
  static async getNotifications(params?: QueryParams) {
    // Simulate filtering and pagination
    let filteredNotifications = [...mockNotifications]
    
    if (params?.search) {
      const searchTerm = params.search.toLowerCase()
      filteredNotifications = filteredNotifications.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm) ||
        notification.message.toLowerCase().includes(searchTerm)
      )
    }

    // Filter by type if provided
    if (params?.type) {
      filteredNotifications = filteredNotifications.filter(notification => 
        notification.type === params.type
      )
    }

    // Filter by priority if provided
    if (params?.priority) {
      filteredNotifications = filteredNotifications.filter(notification => 
        notification.priority === params.priority
      )
    }

    // Filter by read status if provided
    if (params?.isRead !== undefined) {
      filteredNotifications = filteredNotifications.filter(notification => 
        notification.isRead === params.isRead
      )
    }

    // Simulate pagination
    const page = params?.page || 1
    const limit = params?.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex)

    return MockApiService.get<Notification[]>('/notifications', params)
      .then(response => ({
        ...response,
        data: paginatedNotifications,
        pagination: {
          page,
          pageSize: limit,
          total: filteredNotifications.length,
          pageCount: Math.ceil(filteredNotifications.length / limit)
        }
      }))
  }

  // Get notification by ID
  static async getNotification(id: string) {
    const notification = mockNotifications.find(n => n.id === id)
    if (!notification) {
      throw new Error('Notification not found')
    }
    return MockApiService.get<Notification>(`/notifications/${id}`)
      .then(response => ({
        ...response,
        data: notification
      }))
  }

  // Mark notification as read
  static async markAsRead(id: string) {
    const notification = mockNotifications.find(n => n.id === id)
    if (!notification) {
      throw new Error('Notification not found')
    }

    const updatedNotification = {
      ...notification,
      isRead: true,
      readAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    return MockApiService.put<Notification>(`/notifications/${id}/read`, updatedNotification)
      .then(response => ({
        ...response,
        data: updatedNotification
      }))
  }

  // Mark all notifications as read
  static async markAllAsRead() {
    return MockApiService.put<{ success: boolean }>('/notifications/read-all', { success: true })
  }

  // Get unread count
  static async getUnreadCount() {
    const unreadCount = mockNotifications.filter(n => !n.isRead).length
    return MockApiService.get<{ count: number }>('/notifications/unread-count')
      .then(response => ({
        ...response,
        data: { count: unreadCount }
      }))
  }

  // Delete notification
  static async deleteNotification(id: string) {
    return MockApiService.delete(`/notifications/${id}`)
  }
}
