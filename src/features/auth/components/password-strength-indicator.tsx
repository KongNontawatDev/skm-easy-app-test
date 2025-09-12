import { useMemo } from 'react'

interface PasswordStrengthIndicatorProps {
  password: string
  className?: string
}

export function PasswordStrengthIndicator({ 
  password, 
  className 
}: PasswordStrengthIndicatorProps) {
  const strength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '' }
    
    let score = 0
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }
    
    score = Object.values(checks).filter(Boolean).length
    
    if (score <= 2) return { score, label: 'อ่อน', color: 'bg-red-500' }
    if (score <= 3) return { score, label: 'ปานกลาง', color: 'bg-yellow-500' }
    if (score <= 4) return { score, label: 'ดี', color: 'bg-blue-500' }
    return { score, label: 'แข็งแรง', color: 'bg-green-500' }
  }, [password])

  if (!password) return null

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">ความแข็งแรงของรหัสผ่าน:</span>
        <span className={`font-medium ${
          strength.score <= 2 ? 'text-red-600' :
          strength.score <= 3 ? 'text-yellow-600' :
          strength.score <= 4 ? 'text-blue-600' : 'text-green-600'
        }`}>
          {strength.label}
        </span>
      </div>
      
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded ${
              level <= strength.score 
                ? strength.color 
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
