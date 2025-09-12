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
  AlertCircle
} from 'lucide-react'
import { useParams } from '@tanstack/react-router'

export function InvoiceDetail() {
  const { id } = useParams({ from: '/invoice/$id' })

  // Mock data - ในแอปจริงจะ fetch จาก API
  const invoice = {
    id: id,
    invoiceNo: 'INV-2024-001',
    contractNo: 'CT-2024-001',
    installmentNo: 13,
    amount: 15000,
    principal: 12000,
    interest: 2500,
    lateFee: 500,
    totalAmount: 15000,
    dueDate: '2024-02-15',
    status: 'pending',
    createdAt: '2024-01-15T00:00:00Z'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('th-TH')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
      case 'overdue':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
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
      default:
        return 'ไม่ทราบสถานะ'
    }
  }

  const isOverdue = invoice.status === 'overdue' || (invoice.status === 'pending' && new Date(invoice.dueDate) < new Date())

  return (
    <MobileLayout>
      <MobileHeader 
        title="รายละเอียดใบแจ้งหนี้" 
        showBackButton={true}
        onBackClick={() => window.location.href = '/invoice'}
      />
      
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Invoice Header */}
          <MobileCard className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                ใบแจ้งหนี้
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                เลขที่: {invoice.invoiceNo}
              </p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                {getStatusText(invoice.status)}
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
                  {formatNumber(invoice.principal)} ฿
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ดอกเบี้ย</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatNumber(invoice.interest)} ฿
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">ค่าปรับ</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatNumber(invoice.lateFee)} ฿
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">รวมทั้งสิ้น</span>
                  <span className="text-2xl font-bold text-[#EC1B2E]">
                    {formatNumber(invoice.totalAmount)} ฿
                  </span>
                </div>
              </div>
            </div>
          </MobileCard>

          {/* Invoice Details */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-[#EC1B2E]" />
              รายละเอียดใบแจ้งหนี้
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">เลขที่สัญญา</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {invoice.contractNo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">งวดที่</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {invoice.installmentNo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">วันที่ออกใบแจ้งหนี้</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatDate(invoice.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">วันที่ครบกำหนด</span>
                <span className={`font-medium ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-gray-100'}`}>
                  {formatDate(invoice.dueDate)}
                </span>
              </div>
            </div>
          </MobileCard>

          {/* Overdue Warning */}
          {isOverdue && (
            <MobileCard className="p-4 border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-200">เกินกำหนดชำระ</h4>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    กรุณาชำระเงินโดยเร็วที่สุดเพื่อหลีกเลี่ยงค่าปรับเพิ่มเติม
                  </p>
                </div>
              </div>
            </MobileCard>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <MobileButton
              variant="primary"
              className="w-full"
              onClick={() => {
                // Navigate to payment
                window.location.href = `/installment/pay/${invoice.id}`
              }}
            >
              <DollarSign className="w-5 h-5 mr-2" />
              ชำระเงิน
            </MobileButton>
            
            <div className="grid grid-cols-2 gap-3">
              <MobileButton
                variant="outline"
                className="w-full"
                onClick={() => {
                  // Download invoice
                  // console.log('Download invoice:', invoice.id)
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
                  // console.log('View PDF:', invoice.id)
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                ดู PDF
              </MobileButton>
            </div>
          </div>
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/invoice" />
    </MobileLayout>
  )
}
