import { useState } from 'react'
import { MobileCard } from '@/components/mobile'
import { MobileButton } from '@/components/mobile'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, Clock, DollarSign, Calendar, AlertCircle } from 'lucide-react'
import type { RefinanceVehicle } from '../types'

interface RefinanceVehicleCardProps {
  vehicle: RefinanceVehicle
  onCheckEligibility: (vehicleId: string) => void
}

export function RefinanceVehicleCard({ vehicle, onCheckEligibility }: RefinanceVehicleCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'fair': return 'bg-yellow-100 text-yellow-800'
      case 'poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'ดีเยี่ยม'
      case 'good': return 'ดี'
      case 'fair': return 'พอใช้'
      case 'poor': return 'ต้องซ่อม'
      default: return 'ไม่ระบุ'
    }
  }

  const getEligibilityColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800'
    if (score >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getEligibilityText = (score: number) => {
    if (score >= 80) return 'ผ่านเกณฑ์'
    if (score >= 60) return 'ผ่านเกณฑ์บางส่วน'
    return 'ไม่ผ่านเกณฑ์'
  }

  return (
    <MobileCard className="p-4 space-y-4">
      {/* Vehicle Image and Basic Info */}
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          {vehicle.imageUrl ? (
            <img 
              src={vehicle.imageUrl} 
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-2xl">🏍️</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ปี {vehicle.year} • สี{vehicle.color}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ทะเบียน {vehicle.plateNumber}
          </p>
          
          <div className="flex gap-2 mt-2">
            <Badge className={getConditionColor(vehicle.condition)}>
              {getConditionText(vehicle.condition)}
            </Badge>
            <Badge className={getEligibilityColor(vehicle.eligibility.score)}>
              {getEligibilityText(vehicle.eligibility.score)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Financial Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm font-medium">มูลค่ารีไฟแนน</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {vehicle.refinanceAmount.toLocaleString()} บาท
          </p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">ผ่อนเดือนละ</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {vehicle.monthlyPayment.toLocaleString()} บาท
          </p>
        </div>
      </div>

      {/* Details Toggle */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showDetails ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด'}
        </button>
        
        <MobileButton
          onClick={() => onCheckEligibility(vehicle.id)}
          disabled={!vehicle.eligibility.isEligible}
          className="px-4 py-2"
        >
          {vehicle.eligibility.isEligible ? 'ตรวจสอบสิทธิ์' : 'ไม่ผ่านเกณฑ์'}
        </MobileButton>
      </div>

      {/* Detailed Information */}
      {showDetails && (
        <div className="space-y-3 pt-3 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">มูลค่าประเมิน:</span>
              <p className="font-medium">{vehicle.estimatedValue.toLocaleString()} บาท</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">ดอกเบี้ย:</span>
              <p className="font-medium">{vehicle.interestRate}% ต่อปี</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">ระยะเวลาผ่อน:</span>
              <p className="font-medium">{vehicle.termMonths} เดือน</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">คะแนนสิทธิ์:</span>
              <p className="font-medium">{vehicle.eligibility.score}/100</p>
            </div>
          </div>

          {/* Eligibility Reasons */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">เหตุผลที่ผ่านเกณฑ์:</span>
            </div>
            <ul className="space-y-1">
              {vehicle.eligibility.reasons.map((reason, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">เอกสารที่ต้องใช้:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {vehicle.requirements.map((requirement, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {requirement}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </MobileCard>
  )
}
