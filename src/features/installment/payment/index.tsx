import { 
  MobileLayout, 
  MobileHeader, 
  MobileContent, 
  BottomNavigation,
  MobileCard,
  MobileButton
} from '@/components/mobile'
import { 
  CreditCard,
  QrCode,
  Calendar,
  DollarSign
} from 'lucide-react'
export function PaymentList() {

  // Mock data - ในแอปจริงจะ fetch จาก API
  const payments = [
    {
      id: '1',
      contractNo: 'CT-2024-001',
      installmentNo: 13,
      amount: 15000,
      dueDate: '2024-02-15',
      status: 'pending'
    },
    {
      id: '2',
      contractNo: 'CT-2024-001',
      installmentNo: 12,
      amount: 15000,
      dueDate: '2024-01-15',
      status: 'paid'
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

  return (
    <MobileLayout>
      <MobileHeader 
        title="ชำระค่างวด" 
        showBackButton={true}
        onBackClick={() => window.location.href = '/installment'}
      />
      
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Payment List */}
          <div className="space-y-4">
            {payments.map((payment) => (
              <MobileCard key={payment.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      งวดที่ {payment.installmentNo}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      สัญญา: {payment.contractNo}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {getStatusText(payment.status)}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">ครบกำหนด: {formatDate(payment.dueDate)}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#EC1B2E]">
                      {formatNumber(payment.amount)} ฿
                    </div>
                  </div>
                </div>

                {payment.status === 'pending' && (
                  <MobileButton
                    onClick={() => window.location.href = `/installment/pay/${payment.id}`}
                    className="w-full"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    ชำระเงิน
                  </MobileButton>
                )}

                {payment.status === 'paid' && (
                  <div className="flex items-center justify-center text-green-600 dark:text-green-400">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">ชำระเรียบร้อยแล้ว</span>
                  </div>
                )}
              </MobileCard>
            ))}
          </div>

          {/* Empty State */}
          {payments.length === 0 && (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">ไม่มีรายการชำระ</h3>
              <p className="text-gray-500 dark:text-gray-400">ไม่มีรายการชำระค่างวดในขณะนี้</p>
            </div>
          )}
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/installment" />
    </MobileLayout>
  )
}
