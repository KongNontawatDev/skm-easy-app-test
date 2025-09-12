import { useApiQuery, useApiQueryById, useApiQueryList } from '@/hooks/useApiQuery'
import { NotificationApiService } from '../api/notification-api'
import { QueryParams } from '@/lib/api-types'

// Get all notifications with pagination and filters
export function useNotifications(params?: QueryParams) {
  return useApiQueryList(
    'notifications',
    params,
    () => NotificationApiService.getNotifications(params)
  )
}

// Get notification by ID
export function useNotification(id: string) {
  return useApiQueryById(
    'notifications',
    id,
    () => NotificationApiService.getNotification(id)
  )
}

// Get unread notifications
export function useUnreadNotifications(params?: QueryParams) {
  return useApiQueryList(
    'notifications',
    { ...params, isRead: false },
    () => NotificationApiService.getNotifications({ ...params, isRead: false })
  )
}

// Get unread count
export function useUnreadCount() {
  return useApiQuery(
    ['notifications', 'unread-count'],
    () => NotificationApiService.getUnreadCount()
  )
}

// Get recent notifications (for dashboard)
export function useRecentNotifications(limit: number = 5) {
  return useApiQuery(
    ['notifications', 'recent', limit],
    () => NotificationApiService.getNotifications({ limit })
  )
}
