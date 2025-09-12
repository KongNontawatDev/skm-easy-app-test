import { Calendar, Eye } from 'lucide-react'
import { formatDate, formatNumber } from '@/lib/utils'
import { StatusBadge } from '@/components/shared/status-badge'
import type { Contract } from '../types'

interface ContractCardProps {
  contract: Contract
  onViewDetail: (contractId: string) => void
}

export function ContractCard({ contract, onViewDetail }: ContractCardProps) {

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 cursor-pointer transition-all duration-200"
      onClick={() => onViewDetail(contract.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {contract.vehicleInfo.brand} {contract.vehicleInfo.model}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            สัญญาเลขที่: {contract.contractNumber}
          </p>
        </div>
        <StatusBadge status={contract.status} type="status" size="sm" />
      </div>

      {/* Vehicle Image */}
      <div className="relative h-32 bg-gray-100 dark:bg-gray-700 rounded-xl mb-3 overflow-hidden">
        {(contract.vehicleInfo.customImageUrl || contract.vehicleInfo.imageUrl) && (
          <img 
            src={contract.vehicleInfo.customImageUrl || contract.vehicleInfo.imageUrl}
            alt={`${contract.vehicleInfo.brand} ${contract.vehicleInfo.model}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {contract.vehicleInfo.plateNumber}
        </div>
      </div>

      {/* Financial Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">ค่างวดรายเดือน</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {formatNumber(contract.financialInfo.monthlyPayment)} ฿
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">ยอดคงเหลือ</span>
          <span className="font-semibold text-[#EC1B2E]">
            {formatNumber(contract.financialInfo.remainingAmount)} ฿
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">งวดถัดไป</span>
          <span className="text-gray-900 dark:text-gray-100">
            {formatDate(contract.paymentInfo.nextPaymentDate)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
          <span>ความคืบหน้า</span>
          <span className="font-medium">{contract.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
          <div
            className="bg-[#EC1B2E] h-2 rounded-full transition-all duration-500"
            style={{ width: `${contract.progress}%` }}
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="w-3 h-3 mr-1" />
          <span>สร้างเมื่อ {formatDate(contract.createdAt)}</span>
        </div>
        <div className="flex items-center text-[#EC1B2E] text-sm font-medium">
          <Eye className="w-4 h-4 mr-1" />
          <span>ดูรายละเอียด</span>
        </div>
      </div>
    </div>
  )
}
