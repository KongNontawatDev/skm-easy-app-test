import { 
  MobileButton,
  MobileInput
} from '@/components/mobile'
import { HCaptchaWrapper, type HCaptchaWrapperRef } from '@/components/auth/hcaptcha-wrapper'
import { 
  CreditCard, 
  Phone,
  Shield
} from 'lucide-react'
import { useState, useRef } from 'react'
import { useRouter, useNavigate } from '@tanstack/react-router'
import { showToast } from '@/lib/toast'

export function SignIn() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nationalId: '',
    phoneNumber: ''
  })
  const [errors, setErrors] = useState({
    nationalId: '',
    phoneNumber: '',
    captcha: ''
  })
  const [_captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false)
  const captchaRef = useRef<HCaptchaWrapperRef>(null)
  const router = useRouter()

  // hCaptcha site key (ใช้ test key สำหรับ development)
  const HCAPTCHA_SITE_KEY = '14aee74e-f122-4974-b2f2-0d8cfbc08a86'

  const validateNationalId = (id: string) => {
    // Remove all non-digits
    const cleanId = id.replace(/\D/g, '')
    
    if (cleanId.length !== 13) {
      return 'เลขบัตรประชาชนต้องมี 13 หลัก'
    }
    
    // Thai National ID validation algorithm
    let sum = 0
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanId[i]) * (13 - i)
    }
    const checkDigit = (11 - (sum % 11)) % 10
    
    if (parseInt(cleanId[12]) !== checkDigit) {
      return 'เลขบัตรประชาชนไม่ถูกต้อง'
    }
    
    return ''
  }

  const validatePhoneNumber = (phone: string) => {
    // Remove all non-digits
    const cleanPhone = phone.replace(/\D/g, '')
    
    if (cleanPhone.length !== 10) {
      return 'เบอร์โทรศัพท์ต้องมี 10 หลัก'
    }
    
    if (!cleanPhone.startsWith('0')) {
      return 'เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0'
    }
    
    return ''
  }

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token)
    setIsCaptchaVerified(true)
    setErrors(prev => ({ ...prev, captcha: '' }))
  }

  const handleCaptchaExpire = () => {
    setCaptchaToken(null)
    setIsCaptchaVerified(false)
  }

  const handleCaptchaError = () => {
    setCaptchaToken(null)
    setIsCaptchaVerified(false)
    setErrors(prev => ({ ...prev, captcha: 'เกิดข้อผิดพลาดในการยืนยันตัวตน' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const nationalIdError = validateNationalId(formData.nationalId)
    const phoneError = validatePhoneNumber(formData.phoneNumber)
    const captchaError = !isCaptchaVerified ? 'กรุณายืนยันตัวตน' : ''
    
    setErrors({
      nationalId: nationalIdError,
      phoneNumber: phoneError,
      captcha: captchaError
    })
    
    if (nationalIdError || phoneError || captchaError) {
      return
    }
    
    // Handle sign in logic here
    // TODO: Implement actual sign in API call
    // // console.log('Sign in:', formData, 'Captcha token:', captchaToken)
    
    // Show loading toast
    const loadingToast = showToast.loading('กำลังเข้าสู่ระบบ...')
    
    // Simulate API call
    setTimeout(() => {
      showToast.dismiss(loadingToast)
      showToast.success('เข้าสู่ระบบสำเร็จ', 'ยินดีต้อนรับสู่ระบบจัดการค่างวดรถ')
      router.navigate({ to: '/' })
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const formatNationalId = (value: string) => {
    // Remove all non-digits
    const cleanValue = value.replace(/\D/g, '')
    
    // Format as X-XXXX-XXXXX-XX-X
    if (cleanValue.length <= 1) return cleanValue
    if (cleanValue.length <= 5) return `${cleanValue.slice(0, 1)}-${cleanValue.slice(1)}`
    if (cleanValue.length <= 10) return `${cleanValue.slice(0, 1)}-${cleanValue.slice(1, 5)}-${cleanValue.slice(5)}`
    if (cleanValue.length <= 12) return `${cleanValue.slice(0, 1)}-${cleanValue.slice(1, 5)}-${cleanValue.slice(5, 10)}-${cleanValue.slice(10)}`
    return `${cleanValue.slice(0, 1)}-${cleanValue.slice(1, 5)}-${cleanValue.slice(5, 10)}-${cleanValue.slice(10, 12)}-${cleanValue.slice(12, 13)}`
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleanValue = value.replace(/\D/g, '')
    
    // Format as XXX-XXX-XXXX
    if (cleanValue.length <= 3) return cleanValue
    if (cleanValue.length <= 6) return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3)}`
    return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3, 6)}-${cleanValue.slice(6, 10)}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">เข้าสู่ระบบ</h1>
        <p className="text-gray-600">ยินดีต้อนรับกลับสู่ระบบจัดการค่างวดรถ</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">เลขบัตรประชาชน</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <MobileInput
              type="text"
              placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
              value={formData.nationalId}
              onChange={(e) => {
                const formatted = formatNationalId(e.target.value)
                handleInputChange('nationalId', formatted)
              }}
              className="pl-10"
              maxLength={17} // X-XXXX-XXXXX-XX-X format
              required
            />
          </div>
          {errors.nationalId && (
            <p className="text-sm text-red-600">{errors.nationalId}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <MobileInput
              type="tel"
              placeholder="กรอกเบอร์โทรศัพท์ 10 หลัก"
              value={formData.phoneNumber}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value)
                handleInputChange('phoneNumber', formatted)
              }}
              className="pl-10"
              maxLength={12} // XXX-XXX-XXXX format
              required
            />
          </div>
          {errors.phoneNumber && (
            <p className="text-sm text-red-600">{errors.phoneNumber}</p>
          )}
        </div>

        {/* hCaptcha */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">ยืนยันตัวตน</label>
          </div>
          <HCaptchaWrapper
            ref={captchaRef}
            siteKey={HCAPTCHA_SITE_KEY}
            onVerify={handleCaptchaVerify}
            onExpire={handleCaptchaExpire}
            onError={handleCaptchaError}
            theme="light"
            size="normal"
            className="py-2"
          />
          {errors.captcha && (
            <p className="text-sm text-red-600">{errors.captcha}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-[#EC1B2E] focus:ring-[#EC1B2E]" />
            <span className="ml-2 text-sm text-gray-600">จดจำฉัน</span>
          </label>
          <button type="button" className="text-sm text-[#EC1B2E] hover:underline">
            ลืมรหัสผ่าน?
          </button>
        </div>

        <MobileButton 
          type="submit" 
          className="w-full bg-[#EC1B2E] text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!isCaptchaVerified}
        >
          {isCaptchaVerified ? 'เข้าสู่ระบบ' : 'กรุณายืนยันตัวตนก่อน'}
        </MobileButton>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">หรือ</span>
        </div>
      </div>

      {/* Social Login */}
      <div className="space-y-3">
        <MobileButton variant="outline" className="w-full">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          เข้าสู่ระบบด้วย Google
        </MobileButton>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-gray-600">
          ยังไม่มีบัญชี?{' '}
          <button 
            type="button"
            onClick={() => navigate({ to: '/sign-up' })}
            className="text-[#EC1B2E] hover:underline font-medium"
          >
            สมัครสมาชิก
          </button>
        </p>
      </div>
    </div>
  )
}
