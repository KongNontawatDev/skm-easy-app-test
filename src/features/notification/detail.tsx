import { MobileLayout, MobileHeader, MobileContent, MobileButton, BottomNavigation } from '@/components/mobile'
import { Bell, DollarSign, Gift, Settings, Clock, AlertTriangle, CheckCircle, ArrowRight, Calendar } from 'lucide-react'
import { useParams, useRouter } from '@tanstack/react-router'
import { mockNotifications } from './data/mock-data'

export function NotificationDetail() {
  const router = useRouter()
  const { id } = useParams({ from: '/notification/$id' })
  const notification = mockNotifications.find(n => n.id === id)

  if (!notification) {
    return (
      <MobileLayout>
        <MobileHeader title="ไม่พบแจ้งเตือน" />
        <MobileContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔔</span>
            </div>
            <p className="text-gray-500">ไม่พบแจ้งเตือนที่คุณต้องการ</p>
          </div>
        </MobileContent>
        <BottomNavigation currentPath="/notification" />
      </MobileLayout>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('th-TH', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="w-6 h-6" />
      case 'promotion':
        return <Gift className="w-6 h-6" />
      case 'system':
        return <Settings className="w-6 h-6" />
      case 'reminder':
        return <Clock className="w-6 h-6" />
      case 'alert':
        return <AlertTriangle className="w-6 h-6" />
      default:
        return <Bell className="w-6 h-6" />
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

  const getTypeText = (type: string) => {
    switch (type) {
      case 'payment':
        return 'การชำระเงิน'
      case 'promotion':
        return 'โปรโมชั่น'
      case 'system':
        return 'ระบบ'
      case 'reminder':
        return 'แจ้งเตือน'
      case 'alert':
        return 'แจ้งเตือน'
      default:
        return 'ทั่วไป'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'ด่วนมาก'
      case 'high':
        return 'สูง'
      case 'medium':
        return 'ปานกลาง'
      case 'low':
        return 'ต่ำ'
      default:
        return 'ไม่ทราบ'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700'
      case 'high':
        return 'bg-orange-100 text-orange-700'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'low':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <MobileLayout>
      <MobileHeader title="รายละเอียดแจ้งเตือน" showBackButton />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Notification Header */}
          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-start space-x-3 mb-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
                {getTypeIcon(notification.type)}
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  {notification.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                    {getTypeText(notification.type)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                    {getPriorityText(notification.priority)}
                  </span>
                  {notification.isImportant && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      สำคัญ
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <p className="text-gray-700 leading-relaxed">
                {notification.message}
              </p>
            </div>

            {/* Timestamp */}
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(notification.createdAt)}</span>
            </div>
          </div>

          {/* Status Information */}
          <div className="bg-white rounded-2xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">สถานะ</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">สถานะการอ่าน</span>
                <div className="flex items-center">
                  {notification.isRead ? (
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-2" />
                  )}
                  <span className={`font-medium ${notification.isRead ? 'text-green-600' : 'text-red-600'}`}>
                    {notification.isRead ? 'อ่านแล้ว' : 'ยังไม่อ่าน'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">ความสำคัญ</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                  {getPriorityText(notification.priority)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">ประเภท</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                  {getTypeText(notification.type)}
                </span>
              </div>
            </div>
          </div>

          {/* Related Information */}
          {notification.relatedId && notification.relatedType && (
            <div className="bg-white rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลที่เกี่ยวข้อง</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">ประเภท</span>
                  <span className="font-medium">
                    {notification.relatedType === 'contract' ? 'สัญญา' :
                     notification.relatedType === 'invoice' ? 'ใบแจ้งหนี้' :
                     notification.relatedType === 'receipt' ? 'ใบเสร็จ' :
                     notification.relatedType === 'installment' ? 'ค่างวด' :
                     notification.relatedType === 'promotion' ? 'โปรโมชั่น' : 'อื่นๆ'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">รหัส</span>
                  <span className="font-medium">{notification.relatedId}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <MobileButton
              variant="outline"
              className="flex-1 h-12 flex items-center justify-center"
              onClick={() => router.history.back()}
            >
              กลับ
            </MobileButton>
            
            {notification.actionUrl && notification.actionText && (
              <MobileButton
                className="flex-1 h-12 flex items-center justify-center"
                onClick={() => router.navigate({ to: notification.actionUrl! })}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                {notification.actionText}
              </MobileButton>
            )}
          </div>
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/notification" />
    </MobileLayout>
  )
}
