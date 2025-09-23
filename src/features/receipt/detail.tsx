import { MobileLayout, MobileHeader, MobileContent, MobileButton, BottomNavigation } from '@/components/mobile'
import { DollarSign, FileText, Download, Share2, Phone, Car, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useParams, useRouter } from '@tanstack/react-router'
import { getReceiptById } from '@/lib/mock-data'

export function ReceiptDetail() {
  const router = useRouter()
  const { contractId, receiptId } = useParams({ from: '/receipt/$contractId/$receiptId' })
  const receipt = getReceiptById(receiptId)

  if (!receipt) {
    return (
      <MobileLayout>
        <MobileHeader title="ไม่พบใบเสร็จ" />
        <MobileContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🧾</span>
            </div>
            <p className="text-gray-500">ไม่พบใบเสร็จที่คุณต้องการ</p>
          </div>
        </MobileContent>
        <BottomNavigation currentPath="/receipt" />
      </MobileLayout>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('th-TH', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
        return <CheckCircle className="w-5 h-5" />
      case 'pending':
        return <Clock className="w-5 h-5" />
      case 'failed':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  return (
    <MobileLayout>
      <MobileHeader title="รายละเอียดใบเสร็จ" showBackButton />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Receipt Header */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-1">
                  ใบเสร็จ #{receipt.receiptNumber}
                </h1>
                <p className="text-sm text-gray-600">
                  สัญญา: {receipt.contractNumber}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(receipt.paymentInfo.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(receipt.paymentInfo.status)}`}>
                  {getStatusText(receipt.paymentInfo.status)}
                </span>
              </div>
            </div>

            {/* Amount */}
            <div className="text-center py-4 border-t border-b">
              <p className="text-sm text-gray-600 mb-1">ยอดชำระทั้งสิ้น</p>
              <p className="text-3xl font-bold text-green-600">
                {receipt.paymentInfo.amount.toLocaleString('th-TH')} ฿
              </p>
            </div>

            {/* Payment Info */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <span className="text-gray-600">วันที่ชำระ</span>
                <p className="font-medium">{formatDate(receipt.paymentInfo.paymentDate)}</p>
              </div>
              <div>
                <span className="text-gray-600">วิธีการชำระ</span>
                <p className="font-medium">{receipt.paymentInfo.method}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600">หมายเลขอ้างอิง</span>
                <p className="font-medium">{receipt.paymentInfo.reference}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Car className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              ข้อมูลรถยนต์
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">ยี่ห้อ/รุ่น</span>
                <span className="font-medium">{receipt.vehicleInfo.brand} {receipt.vehicleInfo.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ทะเบียน</span>
                <span className="font-medium">{receipt.vehicleInfo.plateNumber}</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              ข้อมูลลูกค้า
            </h3>
            <div className="space-y-2">
              <div>
                <span className="text-gray-600 text-sm">ชื่อ-นามสกุล</span>
                <p className="font-medium">{receipt.customerInfo.name}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">ที่อยู่</span>
                <p className="font-medium">{receipt.customerInfo.address}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">เลขประจำตัวผู้เสียภาษี</span>
                <p className="font-medium">{receipt.customerInfo.taxId}</p>
              </div>
            </div>
          </div>

          {/* Receipt Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              รายการชำระ
            </h3>
            <div className="space-y-3">
              {receipt.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.description}</p>
                    <p className="text-xs text-gray-500">{item.period}</p>
                  </div>
                  <span className="font-semibold text-sm">{item.amount.toLocaleString('th-TH')} ฿</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              สรุปการชำระ
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between border-t pt-2 font-semibold text-lg">
                <span>ยอดชำระทั้งสิ้น</span>
                <span className="text-green-600">{receipt.paymentInfo.amount.toLocaleString('th-TH')} ฿</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              ข้อมูลการชำระ
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">วิธีการชำระ</span>
                <span className="font-medium">{receipt.paymentInfo.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">หมายเลขอ้างอิง</span>
                <span className="font-medium">{receipt.paymentInfo.reference}</span>
              </div>
              {receipt.paymentInfo.bankAccount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">บัญชีธนาคาร</span>
                  <span className="font-medium">{receipt.paymentInfo.bankAccount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">เวลาที่ชำระ</span>
                <span className="font-medium">{formatDateTime(receipt.paymentInfo.paymentDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">สถานะ</span>
                <span className={`font-medium ${
                  receipt.paymentInfo.status === 'completed' ? 'text-green-600' : 
                  receipt.paymentInfo.status === 'pending' ? 'text-yellow-600' : 
                  'text-red-600'
                }`}>
                  {getStatusText(receipt.paymentInfo.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <MobileButton
              variant="outline"
              className="flex-1 h-12 flex items-center justify-center"
              onClick={() => router.history.back()}
            >
              กลับ
            </MobileButton>
            
            <MobileButton
              className="flex-1 h-12 flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              ดาวน์โหลด
            </MobileButton>
            
            <MobileButton
              variant="outline"
              className="flex-1 h-12 flex items-center justify-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              แชร์
            </MobileButton>
          </div>
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/receipt" />
    </MobileLayout>
  )
}
