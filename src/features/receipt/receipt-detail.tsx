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
  Receipt as ReceiptIcon,
  AlertCircle,
  User,
  Car,
  CreditCard
} from 'lucide-react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { getReceiptById } from '@/lib/mock-data'

export function ReceiptDetail() {
  const { receiptId } = useParams({ from: '/receipt/detail/$receiptId' })
  const navigate = useNavigate()

  // Find receipt by receiptId from central data
  const receipt = getReceiptById(receiptId)

  if (!receipt) {
    return (
      <MobileLayout>
        <MobileHeader 
          title="ไม่พบใบเสร็จ"
          onBackClick={() => navigate({ to: '/installment' })}
        />
        <MobileContent className='pb-48'>
          <MobileCard className='p-8 text-center'>
            <AlertCircle className='w-16 h-16 mx-auto mb-4 text-gray-300' />
            <p className='text-lg font-medium mb-2 text-gray-900 dark:text-gray-100'>
              ไม่พบใบเสร็จ
            </p>
            <p className='text-sm text-gray-500'>ไม่พบใบเสร็จที่ระบุ</p>
          </MobileCard>
        </MobileContent>
        <BottomNavigation currentPath='/installment' />
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
        title={`ใบเสร็จ ${receipt.receiptNumber}`}
         onBackClick={() => navigate({ to: '/receipt/$contractId', params: { contractId: receipt.contractId } })}
      />

      <MobileContent className='pb-48'>
        <div className='space-y-4'>
          {/* Receipt Header */}
          <MobileCard className='p-4'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                  <ReceiptIcon className='w-6 h-6 text-green-600' />
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900 dark:text-gray-100'>
                    {receipt.receiptNumber}
                  </h3>
                  <p className='text-sm text-gray-500'>
                    สัญญา {receipt.contractNumber}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(receipt.paymentInfo.status)}`}>
                {getStatusText(receipt.paymentInfo.status)}
              </span>
            </div>

            <div className='text-center'>
              <div className='text-2xl font-bold text-[#EC1B2E] mb-1'>
                {formatNumber(receipt.paymentInfo.amount)} ฿
              </div>
              <p className='text-sm text-gray-500'>จำนวนเงินที่ชำระ</p>
            </div>
          </MobileCard>

          {/* Customer Info */}
          <MobileCard className='p-4'>
            <h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center'>
              <User className='w-5 h-5 mr-2' />
              ข้อมูลลูกค้า
            </h4>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-gray-500'>ชื่อ:</span>
                <span>{receipt.customerInfo.name}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>ที่อยู่:</span>
                <span className='text-right'>{receipt.customerInfo.address}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>เลขประจำตัวผู้เสียภาษี:</span>
                <span>{receipt.customerInfo.taxId}</span>
              </div>
            </div>
          </MobileCard>

          {/* Vehicle Info */}
          <MobileCard className='p-4'>
            <h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center'>
              <Car className='w-5 h-5 mr-2' />
              ข้อมูลรถ
            </h4>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-gray-500'>ยี่ห้อ:</span>
                <span>{receipt.vehicleInfo.brand}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>รุ่น:</span>
                <span>{receipt.vehicleInfo.model}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>ทะเบียน:</span>
                <span>{receipt.vehicleInfo.plateNumber}</span>
              </div>
            </div>
          </MobileCard>

          {/* Payment Info */}
          <MobileCard className='p-4'>
            <h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center'>
              <CreditCard className='w-5 h-5 mr-2' />
              ข้อมูลการชำระเงิน
            </h4>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-gray-500'>วันที่ชำระ:</span>
                <span>{formatDate(receipt.paymentInfo.paymentDate)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>วิธีการชำระ:</span>
                <span>{receipt.paymentInfo.method}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>หมายเลขอ้างอิง:</span>
                <span className='text-right'>{receipt.paymentInfo.reference}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>บัญชีธนาคาร:</span>
                <span>{receipt.paymentInfo.bankAccount}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>สถานะ:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.paymentInfo.status)}`}>
                  {getStatusText(receipt.paymentInfo.status)}
                </span>
              </div>
            </div>
          </MobileCard>

          {/* Receipt Items */}
          <MobileCard className='p-4'>
            <h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-3'>
              รายการที่ชำระ
            </h4>
            <div className='space-y-3'>
              {receipt.items.map((item) => (
                <div key={item.id} className='flex justify-between items-start'>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                      {item.description}
                    </p>
                    <p className='text-xs text-gray-500'>
                      งวด {item.period}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm font-semibold text-gray-900 dark:text-gray-100'>
                      {formatNumber(item.amount)} ฿
                    </p>
                  </div>
                </div>
              ))}
              
              <div className='border-t pt-3 space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>ค่างวด:</span>
                  <span>{formatNumber(receipt.paymentInfo.baseAmount || receipt.paymentInfo.amount)} ฿</span>
                </div>
                
                {/* ค่าปรับล่าช้า */}
                <div className='flex justify-between'>
                  <span className='text-gray-500'>ค่าปรับล่าช้า:</span>
                  <span className={receipt.paymentInfo.lateFee && receipt.paymentInfo.lateFee > 0 ? 'text-red-600' : 'text-gray-500'}>
                    {formatNumber(receipt.paymentInfo.lateFee || 0)} ฿
                  </span>
                </div>
                
                {/* ค่าติดตามหนี้ */}
                <div className='flex justify-between'>
                  <span className='text-gray-500'>ค่าติดตามหนี้:</span>
                  <span className={receipt.paymentInfo.collectionFee && receipt.paymentInfo.collectionFee > 0 ? 'text-red-600' : 'text-gray-500'}>
                    {formatNumber(receipt.paymentInfo.collectionFee || 0)} ฿
                  </span>
                </div>
                
                {/* ค่าธรรมเนียมอื่นๆ */}
                <div className='flex justify-between'>
                  <span className='text-gray-500'>ค่าธรรมเนียมอื่นๆ:</span>
                  <span>{formatNumber(receipt.paymentInfo.otherFees || 0)} ฿</span>
                </div>
                
                {/* ค่าอื่นๆ */}
                <div className='flex justify-between'>
                  <span className='text-gray-500'>ค่าอื่นๆ:</span>
                  <span>0 ฿</span>
                </div>
                
                <div className='flex justify-between font-semibold text-lg pt-2 border-t border-gray-200 dark:border-gray-700'>
                  <span>รวมทั้งสิ้น:</span>
                  <span className='text-[#EC1B2E]'>{formatNumber(receipt.paymentInfo.amount)} ฿</span>
                </div>
              </div>
            </div>
          </MobileCard>

          {/* Actions */}
          <div className='space-y-3'>
            <MobileButton
              variant="outline"
              className="w-full"
               onClick={() => {
                 // Handle download
               }}
            >
              <Download className="w-5 h-5 mr-2" />
              ดาวน์โหลดใบเสร็จ
            </MobileButton>
          </div>
        </div>
      </MobileContent>

      <BottomNavigation currentPath='/installment' />
    </MobileLayout>
  )
}
