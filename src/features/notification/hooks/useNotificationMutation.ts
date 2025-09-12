import { useApiMutation, useApiDelete } from '@/hooks/useApiMutation'
import { NotificationApiService } from '../api/notification-api'
import type { Notification } from '../types'

// Mark notification as read mutation
export function useMarkAsRead() {
  return useApiMutation<Notification, string>(
    (id) => NotificationApiService.markAsRead(id),
    {
      onSuccess: (data) => {
        console.log('Notification marked as read:', data.data.title)
      },
      onError: (error) => {
        console.error('Failed to mark notification as read:', error.message)
      }
    }
  )
}

// Mark all notifications as read mutation
export function useMarkAllAsRead() {
  return useApiMutation<{ success: boolean }, void>(
    () => NotificationApiService.markAllAsRead(),
    {
      onSuccess: () => {
        console.log('All notifications marked as read')
      },
      onError: (error) => {
        console.error('Failed to mark all notifications as read:', error.message)
      }
    }
  )
}

// Delete notification mutation
export function useDeleteNotification() {
  return useApiDelete(
    'notifications',
    (id) => NotificationApiService.deleteNotification(id)
  )
}
