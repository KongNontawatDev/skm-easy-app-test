import { Eye, CheckCircle, Clock, AlertCircle, QrCode } from 'lucide-react'
import type { Installment } from '../types'

interface InstallmentCardProps {
  installment: Installment
  onViewDetail: (installmentId: string) => void
  onPayNow: (installmentId: string) => void
}

export function InstallmentCard({ installment, onViewDetail, onPayNow }: InstallmentCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
      case 'pending':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
      case 'overdue':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
      case 'cancelled':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'ชำระแล้ว'
      case 'pending':
        return 'รอชำระ'
      case 'overdue':
        return 'เกินกำหนด'
      case 'cancelled':
        return 'ยกเลิก'
      default:
        return 'ไม่ทราบสถานะ'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const isOverdue = installment.status === 'overdue' || (installment.status === 'pending' && new Date(installment.paymentInfo.dueDate) < new Date())

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-2xl p-4 cursor-pointer transition-all duration-200 ${
        isOverdue ? 'bg-red-50 dark:bg-red-900/20' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {installment.vehicleInfo.brand} {installment.vehicleInfo.model}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            สัญญา: {installment.contractNumber}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(installment.status)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(installment.status)}`}>
            {getStatusText(installment.status)}
          </span>
        </div>
      </div>

      {/* Vehicle Image */}
      <div className="relative h-32 bg-gray-100 dark:bg-gray-700 rounded-xl mb-3 overflow-hidden">
        {installment.vehicleInfo.imageUrl && (
          <img 
            src={installment.vehicleInfo.imageUrl}
            alt={`${installment.vehicleInfo.brand} ${installment.vehicleInfo.model}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {installment.vehicleInfo.plateNumber}
        </div>
      </div>

      {/* Amount */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">ยอดชำระ</span>
        <span className="text-xl font-bold text-[#EC1B2E]">
          {installment.paymentInfo.amount.toLocaleString('th-TH')} ฿
        </span>
      </div>

      {/* Payment Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">กำหนดชำระ</span>
          <span className={`font-medium ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
            {formatDate(installment.paymentInfo.dueDate)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">วิธีการชำระ</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{installment.paymentInfo.paymentMethod}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onViewDetail(installment.id)
          }}
          className="flex-1 flex items-center justify-center py-2 px-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Eye className="w-4 h-4 mr-1" />
          ดูรายละเอียด
        </button>
        
        {installment.status === 'pending' && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPayNow(installment.id)
            }}
            className="flex-1 flex items-center justify-center py-2 px-3 bg-[#EC1B2E] text-white rounded-lg text-sm font-medium hover:bg-[#C20010] transition-colors"
          >
            <QrCode className="w-4 h-4 mr-1" />
            ชำระเลย
          </button>
        )}
      </div>
    </div>
  )
}
