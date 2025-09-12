import { 
  MobileLayout, 
  MobileHeader, 
  MobileContent, 
  BottomNavigation,
  MobileButton,
  MobileCard,
  ThemeSwitch
} from '@/components/mobile'
import { Switch } from '@/components/ui/switch'
import { 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Lock
} from 'lucide-react'

export function Settings() {
  return (
    <MobileLayout>
      <MobileHeader title="ตั้งค่า" showMoreMenu={true} />
      
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Theme Section */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">ธีม</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Palette className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-gray-100">ธีมแอป</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">เลือกธีมที่คุณต้องการ</p>
                </div>
              </div>
              <ThemeSwitch />
            </div>
          </MobileCard>

          {/* General Section */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">ทั่วไป</h3>
            <div className="space-y-4">
              <MobileButton 
                variant="ghost" 
                className="w-full justify-between h-auto p-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-gray-100">ภาษา</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">ไทย</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </MobileButton>
              
              <div className="h-px bg-gray-100 dark:bg-gray-700" />
              
              <MobileButton 
                variant="ghost" 
                className="w-full justify-between h-auto p-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <HelpCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-gray-100">ติดต่อเรา</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">ขอความช่วยเหลือและสนับสนุน</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </MobileButton>
            </div>
          </MobileCard>

          {/* Security Section */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">ความปลอดภัย</h3>
            <div className="space-y-4">
              <MobileButton 
                variant="ghost" 
                className="w-full justify-between h-auto p-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-gray-100">เปลี่ยนรหัสผ่าน</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">อัปเดตรหัสผ่านของคุณ</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </MobileButton>
              
              <div className="h-px bg-gray-100 dark:bg-gray-700" />
              
              <MobileButton 
                variant="ghost" 
                className="w-full justify-between h-auto p-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-gray-100">นโยบายความเป็นส่วนตัว</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">อ่านนโยบายความเป็นส่วนตัวของเรา</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </MobileButton>
            </div>
          </MobileCard>

          {/* App Settings */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">การตั้งค่าแอป</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">การแจ้งเตือน</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">รับการแจ้งเตือนจากแอป</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </MobileCard>

          {/* Account Actions */}
          <div className="space-y-3">
            <MobileButton 
              variant="outline" 
              className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-5 w-5" />
              ออกจากระบบ
            </MobileButton>
          </div>
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/settings" />
    </MobileLayout>
  )
}
