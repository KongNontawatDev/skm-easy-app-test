import { 
  MobileLayout, 
  MobileHeader, 
  MobileContent, 
  BottomNavigation,
  MobileCard,
  MobileButton
} from '@/components/mobile'
import { 
  Download,
  Eye,
  DollarSign,
  FileText,
  CheckCircle
} from 'lucide-react'
import { useParams } from '@tanstack/react-router'

export function ReceiptDetail() {
  const { id } = useParams({ from: '/receipt/$id' })

  // Mock data - ในแอปจริงจะ fetch จาก API
  const receipt = {
    id: id,
    receiptNo: 'RCP-2024-001',
    contractNo: 'CT-2024-001',
    installmentNo: 12,
    amount: 15000,
    principal: 12000,
    interest: 2500,
    lateFee: 500,
    totalAmount: 15000,
    paymentDate: '2024-01-15',
    paymentMethod: 'QR Code',
    status: 'completed',
    createdAt: '2024-01-15T10:30:00Z'
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

  const formatNumber = (num: number) => {
    return num.toLocaleString('th-TH')
  }

  return (
    <MobileLayout>
      <MobileHeader 
        title="รายละเอียดใบเสร็จ" 
        showBackButton={true}
        onBackClick={() => window.history.back()}
      />
      
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Receipt Header */}
          <MobileCard className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                ใบเสร็จรับเงิน
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                เลขที่: {receipt.receiptNo}
              </p>
              <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                ชำระเรียบร้อย
              </div>
            </div>
          </MobileCard>

          {/* Amount Summary */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              สรุปยอดเงิน
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">เงินต้น</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatNumber(receipt.principal)} ฿
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ดอกเบี้ย</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatNumber(receipt.interest)} ฿
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ค่าปรับ</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatNumber(receipt.lateFee)} ฿
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">รวมทั้งสิ้น</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatNumber(receipt.totalAmount)} ฿
                  </span>
                </div>
              </div>
            </div>
          </MobileCard>

          {/* Payment Details */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              รายละเอียดการชำระ
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">เลขที่สัญญา</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {receipt.contractNo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">งวดที่</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {receipt.installmentNo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">วันที่ชำระ</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatDate(receipt.paymentDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">วิธีการชำระ</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {receipt.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">เวลาที่ชำระ</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatDateTime(receipt.createdAt)}
                </span>
              </div>
            </div>
          </MobileCard>

          {/* Actions */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <MobileButton
                variant="outline"
                className="w-full"
                onClick={() => {
                  // Download receipt
                  // console.log('Download receipt:', receipt.id)
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                ดาวน์โหลด
              </MobileButton>
              
              <MobileButton
                variant="outline"
                className="w-full"
                onClick={() => {
                  // View PDF
                  // console.log('View PDF:', receipt.id)
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                ดู PDF
              </MobileButton>
            </div>
          </div>
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/receipt" />
    </MobileLayout>
  )
}
