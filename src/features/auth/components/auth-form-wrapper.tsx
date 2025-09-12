import {type ReactNode } from 'react'
import { MobileCard } from '@/components/mobile'

interface AuthFormWrapperProps {
  children: ReactNode
  title: string
  subtitle?: string
  className?: string
}

export function AuthFormWrapper({ 
  children, 
  title, 
  subtitle, 
  className 
}: AuthFormWrapperProps) {
  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <MobileCard className="p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && (
            <p className="text-gray-500">{subtitle}</p>
          )}
        </div>
        {children}
      </MobileCard>
    </div>
  )
}
