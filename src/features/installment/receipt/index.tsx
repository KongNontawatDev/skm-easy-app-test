import { 
  MobileLayout, 
  MobileHeader, 
  MobileContent, 
  BottomNavigation,
  MobileCard,
  MobileButton
} from '@/components/mobile'
import { 
  Receipt as ReceiptIcon,
  Download,
  Eye,
  Calendar
} from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export function Receipt() {
  const navigate = useNavigate()

  // Mock data - ในแอปจริงจะ fetch จาก API
  const receipts = [
    {
      id: '1',
      receiptNo: 'RCP-2024-001',
      contractNo: 'CT-2024-001',
      installmentNo: 12,
      amount: 15000,
      paymentDate: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      receiptNo: 'RCP-2024-002',
      contractNo: 'CT-2024-001',
      installmentNo: 11,
      amount: 15000,
      paymentDate: '2024-01-01',
      status: 'completed'
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('th-TH')
  }

  return (
    <MobileLayout>
      <MobileHeader 
        title="ประวัติการชำระ/ใบเสร็จ" 
        showBackButton={true}
        onBackClick={() => window.history.back()}
      />
      
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Receipt List */}
          <div className="space-y-4">
            {receipts.map((receipt) => (
              <MobileCard key={receipt.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      ใบเสร็จ {receipt.receiptNo}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      สัญญา: {receipt.contractNo} • งวดที่ {receipt.installmentNo}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <ReceiptIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">วันที่ชำระ: {formatDate(receipt.paymentDate)}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {formatNumber(receipt.amount)} ฿
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <MobileButton
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate({ to: '/receipt/$id', params: { id: receipt.id } })}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    ดูรายละเอียด
                  </MobileButton>
                  
                  <MobileButton
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      // Download receipt
                      // console.log('Download receipt:', receipt.id)
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    ดาวน์โหลด
                  </MobileButton>
                </div>
              </MobileCard>
            ))}
          </div>

          {/* Empty State */}
          {receipts.length === 0 && (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <ReceiptIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">ไม่มีใบเสร็จ</h3>
              <p className="text-gray-500 dark:text-gray-400">ยังไม่มีประวัติการชำระเงิน</p>
            </div>
          )}
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/installment" />
    </MobileLayout>
  )
}
