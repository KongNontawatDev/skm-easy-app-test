import { useState } from 'react'
import { MobileLayout, MobileHeader, MobileContent, BottomNavigation } from '@/components/mobile'
import { NotificationCard } from './components/notification-card'
import { mockNotifications } from './data/mock-data'
import { useRouter } from '@tanstack/react-router'
import { Search, CheckCircle, Trash2 } from 'lucide-react'

export function Notification() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredNotifications = mockNotifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'unread' && !notification.isRead) ||
      (statusFilter === 'read' && notification.isRead)
    
    return matchesSearch && matchesType && matchesStatus
  })

  const handleViewDetail = (notificationId: string) => {
    router.navigate({ to: '/notification/$id', params: { id: notificationId } })
  }

  const handleMarkAsRead = (_notificationId: string) => {
    // Here you would typically update the notification status in your state management
  }

  const handleMarkAllAsRead = () => {
    // Here you would typically mark all notifications as read
  }

  const typeOptions = [
    { value: 'all', label: 'ทั้งหมด' },
    { value: 'payment', label: 'การชำระเงิน' },
    { value: 'promotion', label: 'โปรโมชั่น' },
    { value: 'system', label: 'ระบบ' },
    { value: 'reminder', label: 'แจ้งเตือน' },
    { value: 'alert', label: 'แจ้งเตือน' },
  ]

  const statusOptions = [
    { value: 'all', label: 'ทั้งหมด' },
    { value: 'unread', label: 'ยังไม่อ่าน' },
    { value: 'read', label: 'อ่านแล้ว' },
  ]

  const unreadCount = mockNotifications.filter(n => !n.isRead).length

  return (
    <MobileLayout>
      <MobileHeader title="แจ้งเตือน" showMoreMenu={true} />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="ค้นหาแจ้งเตือน"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-[#EC1B2E] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="p-3 rounded-xl focus:ring-2 focus:ring-[#EC1B2E] text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {typeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-3 rounded-xl focus:ring-2 focus:ring-[#EC1B2E] text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          {unreadCount > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                มี {unreadCount} ข้อความที่ยังไม่อ่าน
              </span>
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center text-[#EC1B2E] text-sm font-medium"
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                อ่านทั้งหมด
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                แจ้งเตือน ({filteredNotifications.length})
              </h3>
              <button className="flex items-center text-gray-500 text-sm">
                <Trash2 className="w-4 h-4 mr-1" />
                ลบทั้งหมด
              </button>
            </div>
            
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onViewDetail={handleViewDetail}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔔</span>
                </div>
                <p className="text-lg font-medium mb-2">
                  {searchTerm || typeFilter !== 'all' || statusFilter !== 'all' ? 'ไม่พบแจ้งเตือน' : 'ไม่มีแจ้งเตือน'}
                </p>
                <p className="text-sm">
                  {searchTerm || typeFilter !== 'all' || statusFilter !== 'all' ? 'ลองค้นหาด้วยคำอื่น' : 'แจ้งเตือนจะแสดงที่นี่'}
                </p>
              </div>
            )}
          </div>
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/notification" />
    </MobileLayout>
  )
}
