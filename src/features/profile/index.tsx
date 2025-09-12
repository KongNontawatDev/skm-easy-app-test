import { 
  MobileLayout, 
  MobileHeader, 
  MobileContent, 
  BottomNavigation,
  MobileCard,
  MobileButton,
  MobileAvatar
} from '@/components/mobile'
import { 
  ChevronRight,
  Settings,
  FileText,
  HelpCircle,
  Phone,
  Gift,
  BookOpen,
  Ticket,
  LogOut
} from 'lucide-react'

export function Profile() {
  const menuItems = [
    {
      id: 'setting',
      title: 'ตั้งค่า',
      icon: Settings,
      color: 'bg-gray-50 text-gray-600',
      path: '/settings'
    },
    {
      id: 'blog',
      title: 'ข่าวสาร/บทความ',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600',
      path: '/blog'
    },
    {
      id: 'ticket',
      title: 'แจ้งปัญหา',
      icon: HelpCircle,
      color: 'bg-orange-50 text-orange-600',
      path: '/ticket'
    },
    {
      id: 'contact',
      title: 'ติดต่อบริษัท',
      icon: Phone,
      color: 'bg-green-50 text-green-600',
      path: '/contact'
    },
    {
      id: 'promotion',
      title: 'โปรโมชั่น',
      icon: Gift,
      color: 'bg-red-50 text-red-600',
      path: '/promotion'
    },
    {
      id: 'guide',
      title: 'วิธีใช้งาน',
      icon: BookOpen,
      color: 'bg-purple-50 text-purple-600',
      path: '/guide'
    },
    {
      id: 'coupon',
      title: 'คูปองส่วนลด',
      icon: Ticket,
      color: 'bg-yellow-50 text-yellow-600',
      path: '/coupon'
    }
  ]

  return (
    <MobileLayout>
      <MobileHeader title="โปรไฟล์" showMoreMenu={true} />
      
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Profile Header */}
          <MobileCard className="p-6">
            <div className="flex items-center space-x-4">
              <MobileAvatar 
                size="xl" 
                src="https://www.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg" 
                fallback="JD"
                className="h-16 w-16"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">จอห์น โด</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">john.doe@example.com</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">081-234-5678</p>
              </div>
            </div>
          </MobileCard>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item) => (
              <MobileButton
                key={item.id}
                variant="ghost"
                className="w-full justify-between h-auto p-4"
                onClick={() => window.location.href = item.path}
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">{item.title}</span>
                  <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 ml-auto" />
                </div>
              </MobileButton>
            ))}
          </div>

          {/* Logout Button */}
          <MobileButton 
            variant="outline" 
            className="w-full h-12 text-red-600 dark:text-red-400 border-red-200 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut className="mr-2 h-5 w-5" />
            ออกจากระบบ
          </MobileButton>
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/profile" />
    </MobileLayout>
  )
}
