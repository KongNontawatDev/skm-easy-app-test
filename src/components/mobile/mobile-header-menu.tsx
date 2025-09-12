import { MoreHorizontal, User, HelpCircle, Phone, LogOut } from 'lucide-react'
import { MobileButton } from './mobile-button'
import { showToast } from '@/lib/toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function MobileHeaderMenu() {
  const handleNavigation = (path: string) => {
    window.location.href = path
  }

  const handleLogout = () => {
    showToast.success('ออกจากระบบแล้ว', 'ขอบคุณที่ใช้บริการ')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MobileButton
          variant="ghost"
          size="sm"
          className="h-10 w-10 p-0"
        >
          <MoreHorizontal className="h-5 w-5" />
        </MobileButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-white dark:bg-gray-800 rounded-xl p-1"
        style={{
          boxShadow: 'none',
          border: 'none'
        }}
      >
        <DropdownMenuItem 
          onClick={() => handleNavigation('/profile')}
          className="rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700"
        >
          <User className="mr-3 h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="text-gray-900 dark:text-gray-100">โปรไฟล์</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleNavigation('/guide')}
          className="rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700"
        >
          <HelpCircle className="mr-3 h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="text-gray-900 dark:text-gray-100">วิธีใช้งาน</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleNavigation('/contact')}
          className="rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:bg-gray-50 dark:focus:bg-gray-700"
        >
          <Phone className="mr-3 h-4 w-4 text-gray-600 dark:text-gray-400" />
          <span className="text-gray-900 dark:text-gray-100">ติดต่อบริษัท</span>
        </DropdownMenuItem>
        <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20"
        >
          <LogOut className="mr-3 h-4 w-4 text-red-600 dark:text-red-400" />
          <span className="text-red-600 dark:text-red-400">ออกจากระบบ</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
