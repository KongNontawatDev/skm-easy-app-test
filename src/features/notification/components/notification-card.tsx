import { Bell, DollarSign, Gift, Settings, Clock, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'
import type { Notification } from '../types'

interface NotificationCardProps {
  notification: Notification
  onViewDetail: (notificationId: string) => void
  onMarkAsRead: (notificationId: string) => void
}

export function NotificationCard({ notification, onViewDetail }: NotificationCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'วันนี้'
    } else if (diffDays === 1) {
      return 'เมื่อวาน'
    } else if (diffDays < 7) {
      return `${diffDays} วันที่แล้ว`
    } else {
      return date.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="w-5 h-5" />
      case 'promotion':
        return <Gift className="w-5 h-5" />
      case 'system':
        return <Settings className="w-5 h-5" />
      case 'reminder':
        return <Clock className="w-5 h-5" />
      case 'alert':
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'text-blue-600 bg-blue-100'
      case 'promotion':
        return 'text-purple-600 bg-purple-100'
      case 'system':
        return 'text-gray-600 bg-gray-100'
      case 'reminder':
        return 'text-yellow-600 bg-yellow-100'
      case 'alert':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500'
      case 'high':
        return 'bg-orange-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-gray-400'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div 
      className={`bg-white rounded-2xl p-4 cursor-pointer transition-all duration-200 ${
        !notification.isRead ? 'bg-red-50' : ''
      }`}
      onClick={() => onViewDetail(notification.id)}
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
          {getTypeIcon(notification.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
              {notification.title}
            </h3>
            <div className="flex items-center space-x-2 ml-2">
              {notification.isImportant && (
                <div className="w-2 h-2 bg-red-500 rounded-full" />
              )}
              {!notification.isRead && (
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {notification.message}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {formatDate(notification.createdAt)}
            </span>
            {notification.actionText && (
              <div className="flex items-center text-[#EC1B2E] text-xs font-medium">
                <span>{notification.actionText}</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            )}
          </div>
        </div>

        {/* Read Status */}
        {notification.isRead && (
          <div className="flex-shrink-0">
            <CheckCircle className="w-4 h-4 text-green-500" />
          </div>
        )}
      </div>
    </div>
  )
}
