import { useState } from 'react'
import { Camera } from 'lucide-react'
import { MobileAvatar } from '@/components/mobile'

interface ProfileAvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onUpload?: (file: File) => void
  className?: string
}

export function ProfileAvatar({ 
  src, 
  alt = 'Profile', 
  size = 'lg',
  onUpload,
  className 
}: ProfileAvatarProps) {
  const [isHovering, setIsHovering] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && onUpload) {
      onUpload(file)
    }
  }

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  }

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <MobileAvatar
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} border-4 border-white shadow-lg`}
      />
      
      {onUpload && (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}>
            <Camera className="h-6 w-6 text-white" />
          </div>
        </>
      )}
    </div>
  )
}
