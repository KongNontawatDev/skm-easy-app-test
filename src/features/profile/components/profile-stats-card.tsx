import { type LucideIcon } from 'lucide-react'
import { MobileCard } from '@/components/mobile'

interface ProfileStatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: string
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function ProfileStatsCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend,
  className 
}: ProfileStatsCardProps) {
  return (
    <MobileCard className={`p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={`flex items-center mt-1 text-xs ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="mr-1">
                {trend.isPositive ? '↗' : '↘'}
              </span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </MobileCard>
  )
}
