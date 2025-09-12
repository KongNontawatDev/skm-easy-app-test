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
  AlertCircle
} from 'lucide-react'

export function Invoice() {
  const invoices = [
    {
      id: '1',
      invoiceNo: 'INV-2024-001',
      contractNo: 'CNT-2024-001',
      amount: '฿15,000',
      dueDate: '15 ม.ค. 2567',
      status: 'pending',
      installmentNo: 'งวดที่ 13/36',
      principal: '฿12,500',
      interest: '฿2,500',
      lateFee: '฿0',
      totalAmount: '฿15,000'
    },
    {
      id: '2',
      invoiceNo: 'INV-2024-002',
      contractNo: 'CNT-2024-001',
      amount: '฿15,000',
      dueDate: '15 ธ.ค. 2566',
      status: 'paid',
      installmentNo: 'งวดที่ 12/36',
      principal: '฿12,500',
      interest: '฿2,500',
      lateFee: '฿0',
      totalAmount: '฿15,000'
    },
    {
      id: '3',
      invoiceNo: 'INV-2024-003',
      contractNo: 'CNT-2024-001',
      amount: '฿15,000',
      dueDate: '15 พ.ย. 2566',
      status: 'paid',
      installmentNo: 'งวดที่ 11/36',
      principal: '฿12,500',
      interest: '฿2,500',
      lateFee: '฿0',
      totalAmount: '฿15,000'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800'
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'รอชำระ'
      case 'paid':
        return 'ชำระแล้ว'
      case 'overdue':
        return 'เลยกำหนด'
      default:
        return 'ไม่ทราบสถานะ'
    }
  }

  return (
    <MobileLayout>
      <MobileHeader 
        title="ใบแจ้งหนี้" 
        showBackButton={true}
        onBackClick={() => window.history.back()}
      />
      
      <MobileContent className="pb-20">
        <div className="space-y-4">
          {/* Summary Card */}
          <MobileCard className="p-4 bg-gradient-to-r from-[#EC1B2E] to-[#C20010] text-white">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">สรุปใบแจ้งหนี้</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/80 text-sm">รอชำระ</p>
                  <p className="text-xl font-bold">1 ใบ</p>
                </div>
                <div>
                  <p className="text-white/80 text-sm">ยอดรวม</p>
                  <p className="text-xl font-bold">฿15,000</p>
                </div>
              </div>
            </div>
          </MobileCard>

          {/* Invoice List */}
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <MobileCard key={invoice.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{invoice.invoiceNo}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{invoice.contractNo}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                      {getStatusText(invoice.status)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">งวด</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{invoice.installmentNo}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">ยอดเงิน</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{invoice.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">ครบกำหนด</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{invoice.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">สถานะ</p>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{getStatusText(invoice.status)}</p>
                    </div>
                  </div>

                  {invoice.status === 'pending' && (
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">เงินต้น</span>
                          <span className="text-gray-900 dark:text-gray-100">{invoice.principal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">ดอกเบี้ย</span>
                          <span className="text-gray-900 dark:text-gray-100">{invoice.interest}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">ค่าปรับ</span>
                          <span className="text-gray-900 dark:text-gray-100">{invoice.lateFee}</span>
                        </div>
                        <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-100 dark:border-gray-700">
                          <span className="text-gray-900 dark:text-gray-100">รวมทั้งสิ้น</span>
                          <span className="text-gray-900 dark:text-gray-100">{invoice.totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-3">
                    <MobileButton variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      ดูรายละเอียด
                    </MobileButton>
                    <MobileButton size="sm" className="flex-1 bg-[#EC1B2E] text-white">
                      <Download className="mr-2 h-4 w-4" />
                      ดาวน์โหลด
                    </MobileButton>
                  </div>
                </div>
              </MobileCard>
            ))}
          </div>

          {/* Payment Reminder */}
          <MobileCard className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-orange-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 text-sm">แจ้งเตือนการชำระ</h3>
                <p className="text-orange-700 text-xs">กรุณาชำระค่างวดภายในวันที่กำหนดเพื่อหลีกเลี่ยงค่าปรับ</p>
              </div>
            </div>
          </MobileCard>
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/mobile/installment" />
    </MobileLayout>
  )
}
