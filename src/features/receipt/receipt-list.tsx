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
import { mockReceipts } from './data/mock-data'

export function ReceiptList() {
  const { contractId } = useParams({ from: '/receipt/$contractId' })
  const navigate = useNavigate()

  // Filter receipts by contractId
  const receipts = mockReceipts.filter(receipt => receipt.contractId === contractId)

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
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'สำเร็จ'
      case 'pending':
        return 'รอดำเนินการ'
      case 'failed':
        return 'ล้มเหลว'
      default:
        return status
    }
  }

  return (
    <MobileLayout>
      <MobileHeader 
        title={`ใบเสร็จสัญญา ${contractId}`}
        onBackClick={() => navigate({ to: '/installment' })}
      />

      <MobileContent className='pb-48'>
        <div className='space-y-4'>
          {/* Contract Info */}
          <MobileCard className='p-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                <ReceiptIcon className='w-6 h-6 text-green-600' />
              </div>
              <div>
                <h3 className='font-semibold text-gray-900 dark:text-gray-100'>
                  สัญญา {contractId}
                </h3>
                <p className='text-sm text-gray-500'>
                  ใบเสร็จทั้งหมด {receipts.length} ใบ
                </p>
              </div>
            </div>
          </MobileCard>

          {/* Receipt List */}
          {receipts.length === 0 ? (
            <MobileCard className='p-8 text-center'>
              <div className='text-gray-500 dark:text-gray-400'>
                <ReceiptIcon className='w-16 h-16 mx-auto mb-4 text-gray-300' />
                <p className='text-lg font-medium mb-2 text-gray-900 dark:text-gray-100'>
                  ไม่มีใบเสร็จ
                </p>
                <p className='text-sm'>ยังไม่มีใบเสร็จสำหรับสัญญานี้</p>
              </div>
            </MobileCard>
          ) : (
            <div className='space-y-3'>
              {receipts.map((receipt) => (
                <MobileCard key={receipt.id} className='p-4'>
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <h4 className='font-semibold text-gray-900 dark:text-gray-100'>
                        {receipt.receiptNumber}
                      </h4>
                      <p className='text-sm text-gray-500'>
                        {receipt.vehicleInfo.brand} {receipt.vehicleInfo.model}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.paymentInfo.status)}`}>
                      {getStatusText(receipt.paymentInfo.status)}
                    </span>
                  </div>

                  <div className='space-y-2 mb-4'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>วันที่ชำระ:</span>
                      <span>{formatDate(receipt.paymentInfo.paymentDate)}</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>วิธีการชำระ:</span>
                      <span>{receipt.paymentInfo.method}</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-500'>จำนวนเงิน:</span>
                      <span className='font-semibold text-[#EC1B2E]'>
                        {formatNumber(receipt.paymentInfo.amount)} ฿
                      </span>
                    </div>
                  </div>

                  <div className='flex space-x-2'>
                    <MobileButton
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate({ 
                        to: '/receipt/$contractId/$receiptId', 
                        params: { contractId, receiptId: receipt.id } 
                      })}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      ดูรายละเอียด
                    </MobileButton>
                    
                    <MobileButton
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        // Handle download
                        console.log('Download receipt:', receipt.id)
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      ดาวน์โหลด
                    </MobileButton>
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
