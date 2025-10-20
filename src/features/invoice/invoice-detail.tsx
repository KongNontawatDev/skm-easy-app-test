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
  DollarSign,
  FileText,
  AlertCircle,
  Calendar,
  User,
  Car
} from 'lucide-react'
import { useParams, useNavigate } from '@tanstack/react-router'
import { getInvoiceById } from '@/lib/mock-data'

export function InvoiceDetail() {
  const { invoiceId } = useParams({ from: '/invoice/detail/$invoiceId' })
  const navigate = useNavigate()

  // Find invoice by invoiceId from central data
  const invoice = getInvoiceById(invoiceId)

  if (!invoice) {
    return (
      <MobileLayout>
        <MobileHeader 
          title="ไม่พบใบแจ้งหนี้"
          onBackClick={() => navigate({ to: '/installment' })}
        />
        <MobileContent className='pb-48'>
          <MobileCard className='p-8 text-center'>
            <AlertCircle className='w-16 h-16 mx-auto mb-4 text-gray-300' />
            <p className='text-lg font-medium mb-2 text-gray-900 dark:text-gray-100'>
              ไม่พบใบแจ้งหนี้
            </p>
            <p className='text-sm text-gray-500'>ไม่พบใบแจ้งหนี้ที่ระบุ</p>
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
        title={`ใบแจ้งหนี้ ${invoice.invoiceNumber}`}
         onBackClick={() => navigate({ to: '/invoice/$contractId', params: { contractId: invoice.contractId } })}
      />

      <MobileContent className='pb-48'>
        <div className='space-y-4'>
          {/* Invoice Header */}
          <MobileCard className='p-4'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                  <FileText className='w-6 h-6 text-blue-600' />
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900 dark:text-gray-100'>
                    {invoice.invoiceNumber}
                  </h3>
                  <p className='text-sm text-gray-500'>
                    สัญญา {invoice.contractNumber}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                {getStatusText(invoice.status)}
              </span>
            </div>

            <div className='text-center'>
              <div className='text-2xl font-bold text-[#EC1B2E] mb-1'>
                {formatNumber(invoice.billingInfo.totalAmount)} ฿
              </div>
              <p className='text-sm text-gray-500'>จำนวนเงินรวม</p>
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
                <span>{invoice.customerInfo.name}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>ที่อยู่:</span>
                <span className='text-right'>{invoice.customerInfo.address}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>เลขประจำตัวผู้เสียภาษี:</span>
                <span>{invoice.customerInfo.taxId}</span>
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
                <span>{invoice.vehicleInfo.brand}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>รุ่น:</span>
                <span>{invoice.vehicleInfo.model}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>ทะเบียน:</span>
                <span>{invoice.vehicleInfo.plateNumber}</span>
              </div>
            </div>
          </MobileCard>

          {/* Billing Info */}
          <MobileCard className='p-4'>
            <h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center'>
              <Calendar className='w-5 h-5 mr-2' />
              ข้อมูลการเรียกเก็บ
            </h4>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-gray-500'>วันที่ออก:</span>
                <span>{formatDate(invoice.billingInfo.issueDate)}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-500'>ครบกำหนด:</span>
                <span>{formatDate(invoice.billingInfo.dueDate)}</span>
              </div>
              {invoice.billingInfo.paymentDate && (
                <div className='flex justify-between'>
                  <span className='text-gray-500'>วันที่ชำระ:</span>
                  <span>{formatDate(invoice.billingInfo.paymentDate)}</span>
                </div>
              )}
            </div>
          </MobileCard>

          {/* Invoice Items */}
          <MobileCard className='p-4'>
            <h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-3'>
              รายการ
            </h4>
            <div className='space-y-3'>
              {invoice.items.map((item) => (
                <div key={item.id} className='flex justify-between items-start'>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                      {item.description}
                    </p>
                    <p className='text-xs text-gray-500'>
                      จำนวน {item.quantity} x {formatNumber(item.unitPrice)} ฿
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
                  <span>{formatNumber(invoice.billingInfo.amount)} ฿</span>
                </div>
                
                {/* ค่าปรับล่าช้า */}
                <div className='flex justify-between'>
                  <span className='text-gray-500'>ค่าปรับล่าช้า:</span>
                  <span className={invoice.billingInfo.lateFee && invoice.billingInfo.lateFee > 0 ? 'text-red-600' : 'text-gray-500'}>
                    {formatNumber(invoice.billingInfo.lateFee || 0)} ฿
                  </span>
                </div>
                
                {/* ค่าติดตามหนี้ */}
                <div className='flex justify-between'>
                  <span className='text-gray-500'>ค่าติดตามหนี้:</span>
                  <span className={invoice.billingInfo.collectionFee && invoice.billingInfo.collectionFee > 0 ? 'text-red-600' : 'text-gray-500'}>
                    {formatNumber(invoice.billingInfo.collectionFee || 0)} ฿
                  </span>
                </div>
                
                {/* ค่าธรรมเนียมอื่นๆ */}
                <div className='flex justify-between'>
                  <span className='text-gray-500'>ค่าธรรมเนียมอื่นๆ:</span>
                  <span>{formatNumber(invoice.billingInfo.otherFees || 0)} ฿</span>
                </div>
                
                <div className='flex justify-between font-semibold text-lg'>
                  <span>รวมทั้งสิ้น:</span>
                  <span className='text-[#EC1B2E]'>{formatNumber(invoice.billingInfo.totalAmount)} ฿</span>
                </div>
              </div>
            </div>
          </MobileCard>

          {/* Payment Info */}
          {invoice.paymentInfo && (
            <MobileCard className='p-4'>
              <h4 className='font-semibold text-gray-900 dark:text-gray-100 mb-3'>
                ข้อมูลการชำระเงิน
              </h4>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>วิธีการชำระ:</span>
                  <span>{invoice.paymentInfo.method}</span>
                </div>
                {invoice.paymentInfo.reference && (
                  <div className='flex justify-between'>
                    <span className='text-gray-500'>หมายเลขอ้างอิง:</span>
                    <span className='text-right'>{invoice.paymentInfo.reference}</span>
                  </div>
                )}
                <div className='flex justify-between'>
                  <span className='text-gray-500'>สถานะ:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.paymentInfo.status)}`}>
                    {getStatusText(invoice.paymentInfo.status)}
                  </span>
                </div>
              </div>
            </MobileCard>
          )}

          {/* Actions */}
          <div className='space-y-3'>
            {invoice.status === 'sent' && (
              <MobileButton
                variant="primary"
                className="w-full"
                onClick={() => {
                  // Navigate to payment
                  navigate({ to: '/installment/pay/$id', params: { id: invoice.id } })
                }}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                ชำระเงิน
              </MobileButton>
            )}
            
            <MobileButton
              variant="outline"
              className="w-full"
              onClick={() => {
                // Handle download
              }}
            >
              <Download className="w-5 h-5 mr-2" />
              ดาวน์โหลดใบแจ้งหนี้
            </MobileButton>
          </div>
        </div>
      </MobileContent>

      <BottomNavigation currentPath='/installment' />
    </MobileLayout>
  )
}
