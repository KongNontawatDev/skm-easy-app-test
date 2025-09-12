import { Calendar, FileText, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import type { Receipt } from '../types'

interface ReceiptCardProps {
  receipt: Receipt
  onViewDetail: (receiptId: string) => void
}

export function ReceiptCard({ receipt, onViewDetail }: ReceiptCardProps) {
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
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'failed':
        return 'bg-red-100 text-red-700'
      case 'refunded':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'ชำระแล้ว'
      case 'pending':
        return 'รอชำระ'
      case 'failed':
        return 'ชำระไม่สำเร็จ'
      case 'refunded':
        return 'คืนเงิน'
      default:
        return 'ไม่ทราบสถานะ'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'failed':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => onViewDetail(receipt.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            ใบเสร็จ #{receipt.receiptNumber}
          </h3>
          <p className="text-sm text-gray-600">
            สัญญา: {receipt.contractNumber}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(receipt.paymentInfo.status)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.paymentInfo.status)}`}>
            {getStatusText(receipt.paymentInfo.status)}
          </span>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="mb-3 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm font-medium text-gray-900">
          {receipt.vehicleInfo.brand} {receipt.vehicleInfo.model}
        </p>
        <p className="text-xs text-gray-600">
          ทะเบียน: {receipt.vehicleInfo.plateNumber}
        </p>
      </div>

      {/* Amount */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600">ยอดชำระ</span>
        <span className="text-xl font-bold text-green-600">
          {receipt.paymentInfo.amount.toLocaleString('th-TH')} ฿
        </span>
      </div>

      {/* Payment Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">วันที่ชำระ</span>
          <span className="font-medium">{formatDate(receipt.paymentInfo.paymentDate)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">วิธีการชำระ</span>
          <span className="font-medium">{receipt.paymentInfo.method}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">หมายเลขอ้างอิง</span>
          <span className="font-medium text-xs">{receipt.paymentInfo.reference}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          <span>สร้างเมื่อ {formatDate(receipt.createdAt)}</span>
        </div>
        <div className="flex items-center text-[#EC1B2E] text-sm font-medium">
          <Eye className="w-4 h-4 mr-1" />
          <span>ดูรายละเอียด</span>
        </div>
      </div>
    </div>
  )
}
