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
  Calendar,
  ArrowLeft
} from 'lucide-react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { mockInvoices } from './data/mock-data'

export function InvoiceList() {
  const { contractId } = useParams({ from: '/invoice/$contractId' })
  const navigate = useNavigate()

  // Filter invoices by contractId
  const invoices = mockInvoices.filter(invoice => invoice.contractId === contractId)

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
        return 'bg-green-100 text-green-800'
      case 'sent':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'ชำระแล้ว'
      case 'sent':
        return 'ส่งแล้ว'
      case 'pending':
        return 'รอชำระ'
      default:
        return status
    }
  }

  return (
    <MobileLayout>
      <MobileHeader 
        title={`ใบแจ้งหนี้สัญญา ${contractId}`}
        onBackClick={() => navigate({ to: '/installment' })}
      />

      <MobileContent className='pb-48'>
        <div className='space-y-4'>
          {/* Contract Info */}
          <MobileCard className='p-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                <ReceiptIcon className='w-6 h-6 text-blue-600' />
              </div>
              <div>
                <h3 className='font-semibold text-gray-900 dark:text-gray-100'>
                  สัญญา {contractId}
                </h3>
                <p className='text-sm text-gray-500'>
                  ใบแจ้งหนี้ทั้งหมด {invoices.length} ใบ
                </p>
              </div>
            </div>
          </MobileCard>

          {/* Invoice List */}
          {invoices.length === 0 ? (
            <MobileCard className='p-8 text-center'>
              <div className='text-gray-500 dark:text-gray-400'>
                <ReceiptIcon className='w-16 h-16 mx-auto mb-4 text-gray-300' />
                <p className='text-lg font-medium mb-2 text-gray-900 dark:text-gray-100'>
                  ไม่มีใบแจ้งหนี้
                </p>
                <p className='text-sm'>ยังไม่มีใบแจ้งหนี้สำหรับสัญญานี้</p>
              </div>
            </MobileCard>
          ) : (
            <div className='space-y-3'>
              {invoices.map((invoice) => (
                <MobileCard key={invoice.id} className='p-4'>
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <h4 className='font-semibold text-gray-900 dark:text-gray-100'>
                        {invoice.invoiceNumber}
                      </h4>
                      <p className='text-sm text-gray-500'>
                        {invoice.vehicleInfo.brand} {invoice.vehicleInfo.model}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusText(invoice.status)}
                    </span>
                  </div>

                  <div className='space-y-2 mb-4'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>วันที่ออก:</span>
                      <span>{formatDate(invoice.billingInfo.issueDate)}</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>ครบกำหนด:</span>
                      <span>{formatDate(invoice.billingInfo.dueDate)}</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>จำนวนเงิน:</span>
                      <span className='font-semibold text-[#EC1B2E]'>
                        {formatNumber(invoice.billingInfo.totalAmount)} ฿
                      </span>
                    </div>
                  </div>

                  <div className='flex space-x-2'>
                    <MobileButton
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate({ 
                        to: '/invoice/$contractId/$invoiceId', 
                        params: { contractId, invoiceId: invoice.id } 
                      })}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      ดูรายละเอียด
                    </MobileButton>
                    
                    {invoice.status === 'paid' && (
                      <MobileButton
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          // Handle download
                          console.log('Download invoice:', invoice.id)
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        ดาวน์โหลด
                      </MobileButton>
                    )}
                  </div>
                </MobileCard>
              ))}
            </div>
          )}
        </div>
      </MobileContent>

      <BottomNavigation currentPath='/installment' />
    </MobileLayout>
  )
}
