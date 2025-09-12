import { Calendar, FileText, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import type { Invoice } from '../types'

interface InvoiceCardProps {
  invoice: Invoice
  onViewDetail: (invoiceId: string) => void
}

export function InvoiceCard({ invoice, onViewDetail }: InvoiceCardProps) {
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
        return 'bg-green-100 text-green-700'
      case 'sent':
        return 'bg-blue-100 text-blue-700'
      case 'overdue':
        return 'bg-red-100 text-red-700'
      case 'draft':
        return 'bg-gray-100 text-gray-700'
      case 'cancelled':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'ชำระแล้ว'
      case 'sent':
        return 'ส่งแล้ว'
      case 'overdue':
        return 'เกินกำหนด'
      case 'draft':
        return 'ร่าง'
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
      case 'sent':
        return <Clock className="w-4 h-4" />
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const isOverdue = invoice.status === 'overdue' || (invoice.status === 'sent' && new Date(invoice.billingInfo.dueDate) < new Date())

  return (
    <div 
      className={`bg-white rounded-2xl p-4 cursor-pointer transition-all duration-200 ${
        isOverdue ? 'bg-red-50' : ''
      }`}
      onClick={() => onViewDetail(invoice.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            ใบแจ้งหนี้ #{invoice.invoiceNumber}
          </h3>
          <p className="text-sm text-gray-600">
            สัญญา: {invoice.contractNumber}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(invoice.status)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
            {getStatusText(invoice.status)}
          </span>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="mb-3 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm font-medium text-gray-900">
          {invoice.vehicleInfo.brand} {invoice.vehicleInfo.model}
        </p>
        <p className="text-xs text-gray-600">
          ทะเบียน: {invoice.vehicleInfo.plateNumber}
        </p>
      </div>

      {/* Amount */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600">ยอดรวม</span>
        <span className="text-xl font-bold text-[#EC1B2E]">
          {invoice.billingInfo.totalAmount.toLocaleString('th-TH')} ฿
        </span>
      </div>

      {/* Dates */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">วันที่ออก</span>
          <span className="font-medium">{formatDate(invoice.billingInfo.issueDate)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">กำหนดชำระ</span>
          <span className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
            {formatDate(invoice.billingInfo.dueDate)}
          </span>
        </div>
        {invoice.billingInfo.paymentDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">วันที่ชำระ</span>
            <span className="font-medium text-green-600">
              {formatDate(invoice.billingInfo.paymentDate)}
            </span>
          </div>
        )}
      </div>

      {/* Payment Method */}
      {invoice.paymentInfo.method && (
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="text-gray-600">วิธีการชำระ</span>
          <span className="font-medium">{invoice.paymentInfo.method}</span>
        </div>
      )}

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          <span>สร้างเมื่อ {formatDate(invoice.createdAt)}</span>
        </div>
        <div className="flex items-center text-[#EC1B2E] text-sm font-medium">
          <Eye className="w-4 h-4 mr-1" />
          <span>ดูรายละเอียด</span>
        </div>
      </div>
    </div>
  )
}
