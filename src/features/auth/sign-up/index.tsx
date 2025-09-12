import { 
  MobileButton,
  MobileInput
} from '@/components/mobile'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  User,
  Phone
} from 'lucide-react'
import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign up logic here
    // // console.log('Sign up:', formData)
    // Redirect to home after successful sign up
    router.navigate({ to: '/' })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">สมัครสมาชิก</h1>
        <p className="text-gray-600">สร้างบัญชีใหม่เพื่อเริ่มใช้งาน</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">ชื่อ</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <MobileInput
                type="text"
                placeholder="ชื่อ"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">นามสกุล</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <MobileInput
                type="text"
                placeholder="นามสกุล"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">อีเมล</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <MobileInput
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <MobileInput
              type="tel"
              placeholder="กรอกเบอร์โทรศัพท์"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">รหัสผ่าน</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <MobileInput
              type={showPassword ? 'text' : 'password'}
              placeholder="กรอกรหัสผ่าน"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">ยืนยันรหัสผ่าน</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <MobileInput
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="ยืนยันรหัสผ่าน"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-start">
          <input type="checkbox" className="mt-1 rounded border-gray-300 text-[#EC1B2E] focus:ring-[#EC1B2E]" required />
          <span className="ml-2 text-sm text-gray-600">
            ฉันยอมรับ{' '}
            <button type="button" className="text-[#EC1B2E] hover:underline">
              ข้อกำหนดการใช้งาน
            </button>
            {' '}และ{' '}
            <button type="button" className="text-[#EC1B2E] hover:underline">
              นโยบายความเป็นส่วนตัว
            </button>
          </span>
        </div>

        <MobileButton type="submit" className="w-full bg-[#EC1B2E] text-white">
          สมัครสมาชิก
        </MobileButton>
      </form>

      {/* Sign In Link */}
      <div className="text-center">
        <p className="text-gray-600">
          มีบัญชีแล้ว?{' '}
          <button 
            type="button"
            onClick={() => window.location.href = '/sign-in'}
            className="text-[#EC1B2E] hover:underline font-medium"
          >
            เข้าสู่ระบบ
          </button>
        </p>
      </div>
    </div>
  )
}
