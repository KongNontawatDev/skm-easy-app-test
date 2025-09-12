import { MobileLayout, MobileHeader, MobileContent, MobileButton, BottomNavigation } from '@/components/mobile'
import { DollarSign, FileText, Download, Share2, Phone, Car, CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useLoaderData, useRouter } from '@tanstack/react-router'
import { mockInvoices } from './data/mock-data'

export function InvoiceDetail() {
  const router = useRouter()
  const { id } = useLoaderData({ from: '/invoice/$id' }) as { id: string }
  const invoice = mockInvoices.find(i => i.id === id)

  if (!invoice) {
    return (
      <MobileLayout>
        <MobileHeader title="ไม่พบใบแจ้งหนี้" />
        <MobileContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <p className="text-gray-500">ไม่พบใบแจ้งหนี้ที่คุณต้องการ</p>
          </div>
        </MobileContent>
        <BottomNavigation currentPath="/invoice" />
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
        return <CheckCircle className="w-5 h-5" />
      case 'sent':
        return <Clock className="w-5 h-5" />
      case 'overdue':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const isOverdue = invoice.status === 'overdue' || (invoice.status === 'sent' && new Date(invoice.billingInfo.dueDate) < new Date())

  return (
    <MobileLayout>
      <MobileHeader title="รายละเอียดใบแจ้งหนี้" showBackButton />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Invoice Header */}
          <div className={`bg-white rounded-2xl shadow-sm border p-4 ${isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-1">
                  ใบแจ้งหนี้ #{invoice.invoiceNumber}
                </h1>
                <p className="text-sm text-gray-600">
                  สัญญา: {invoice.contractNumber}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(invoice.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                  {getStatusText(invoice.status)}
                </span>
              </div>
            </div>

            {/* Amount */}
            <div className="text-center py-4 border-t border-b">
              <p className="text-sm text-gray-600 mb-1">ยอดรวมทั้งสิ้น</p>
              <p className="text-3xl font-bold text-[#EC1B2E]">
                {invoice.billingInfo.totalAmount.toLocaleString('th-TH')} ฿
              </p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <span className="text-gray-600">วันที่ออก</span>
                <p className="font-medium">{formatDate(invoice.billingInfo.issueDate)}</p>
              </div>
              <div>
                <span className="text-gray-600">กำหนดชำระ</span>
                <p className={`font-medium ${isOverdue ? 'text-red-600' : ''}`}>
                  {formatDate(invoice.billingInfo.dueDate)}
                </p>
              </div>
              {invoice.billingInfo.paymentDate && (
                <div className="col-span-2">
                  <span className="text-gray-600">วันที่ชำระ</span>
                  <p className="font-medium text-green-600">
                    {formatDate(invoice.billingInfo.paymentDate)}
                  </p>
                </div>
              )}
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
                <span className="font-medium">{invoice.vehicleInfo.brand} {invoice.vehicleInfo.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ทะเบียน</span>
                <span className="font-medium">{invoice.vehicleInfo.plateNumber}</span>
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
                <p className="font-medium">{invoice.customerInfo.name}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">ที่อยู่</span>
                <p className="font-medium">{invoice.customerInfo.address}</p>
              </div>
              <div>
                <span className="text-gray-600 text-sm">เลขประจำตัวผู้เสียภาษี</span>
                <p className="font-medium">{invoice.customerInfo.taxId}</p>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              รายการ
            </h3>
            <div className="space-y-3">
              {invoice.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.description}</p>
                    <p className="text-xs text-gray-500">จำนวน: {item.quantity} x {item.unitPrice.toLocaleString('th-TH')} ฿</p>
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
              <div className="flex justify-between">
                <span className="text-gray-600">ยอดก่อนภาษี</span>
                <span className="font-medium">{invoice.billingInfo.amount.toLocaleString('th-TH')} ฿</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ภาษีมูลค่าเพิ่ม (7%)</span>
                <span className="font-medium">{invoice.billingInfo.vat.toLocaleString('th-TH')} ฿</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-lg">
                <span>ยอดรวมทั้งสิ้น</span>
                <span className="text-[#EC1B2E]">{invoice.billingInfo.totalAmount.toLocaleString('th-TH')} ฿</span>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          {invoice.paymentInfo.method && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-[#EC1B2E]" />
                ข้อมูลการชำระ
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">วิธีการชำระ</span>
                  <span className="font-medium">{invoice.paymentInfo.method}</span>
                </div>
                {invoice.paymentInfo.reference && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">หมายเลขอ้างอิง</span>
                    <span className="font-medium">{invoice.paymentInfo.reference}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">สถานะ</span>
                  <span className={`font-medium ${
                    invoice.paymentInfo.status === 'paid' ? 'text-green-600' : 
                    invoice.paymentInfo.status === 'pending' ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {invoice.paymentInfo.status === 'paid' ? 'ชำระแล้ว' :
                     invoice.paymentInfo.status === 'pending' ? 'รอชำระ' :
                     invoice.paymentInfo.status === 'failed' ? 'ชำระไม่สำเร็จ' :
                     'คืนเงิน'}
                  </span>
                </div>
              </div>
            </div>
          )}

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
      <BottomNavigation currentPath="/invoice" />
    </MobileLayout>
  )
}
