import { useParams } from '@tanstack/react-router'
import { MobileLayout } from '@/components/mobile/mobile-layout'
import { MobileHeader } from '@/components/mobile/mobile-header'
import { MobileContent } from '@/components/mobile/mobile-content'
import { MobileCard } from '@/components/mobile/mobile-card'
import { MobileButton } from '@/components/mobile/mobile-button'
import { BottomNavigation } from '@/components/mobile/bottom-navigation'
import { ArrowLeft, Receipt, Calendar, DollarSign } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { getReceiptsByContract, getContractById } from '@/lib/mock-data'

export function ReceiptList() {
  const { contractId } = useParams({ from: '/receipt/$contractId' })
  const navigate = useNavigate()

  // ใช้ข้อมูลจากข้อมูลกลาง
  const contract = getContractById(contractId)
  const allReceipts = getReceiptsByContract(contractId)

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
        return 'เสร็จสิ้น'
      case 'pending':
        return 'รอดำเนินการ'
      case 'failed':
        return 'ล้มเหลว'
      default:
        return status
    }
  }

  const handleViewReceipt = (receiptId: string) => {
    navigate({ to: '/receipt/$contractId/$receiptId', params: { contractId, receiptId } })
  }

  return (
    <MobileLayout>
      <MobileHeader 
        title="ใบเสร็จ" 
        onBackClick={() => navigate({ to: '/installment' })}
      />
      <MobileContent>
        {/* Contract Info */}
        {contract && (
          <MobileCard>
            <div className="flex items-center space-x-3 mb-3">
              <Receipt className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold">สัญญา {contract.contractNumber}</h3>
            </div>
            <div className="text-sm text-gray-600">
              <p>{contract.vehicleInfo.brand} {contract.vehicleInfo.model} ({contract.vehicleInfo.year})</p>
              <p>ทะเบียน: {contract.vehicleInfo.plateNumber}</p>
            </div>
          </MobileCard>
        )}

        {/* Receipts List */}
        <div className="space-y-3">
          {allReceipts.map((receipt) => (
            <MobileCard key={receipt.id}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Receipt className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{receipt.receiptNumber}</h4>
                    <p className="text-sm text-gray-600">{formatDate(receipt.paymentInfo.paymentDate)}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.paymentInfo.status)}`}>
                  {getStatusText(receipt.paymentInfo.status)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">วิธีการชำระ:</span>
                  <span className="text-sm font-medium">{receipt.paymentInfo.method}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ยอดเงิน:</span>
                  <span className="text-lg font-semibold text-green-600">
                    {formatNumber(receipt.paymentInfo.amount)} บาท
                  </span>
                </div>
                {receipt.paymentInfo.reference && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">เลขอ้างอิง:</span>
                    <span className="text-sm font-medium">{receipt.paymentInfo.reference}</span>
                  </div>
                )}
              </div>

              <MobileButton
                onClick={() => handleViewReceipt(receipt.id)}
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                <Receipt className="h-4 w-4 mr-2" />
                ดูรายละเอียด
              </MobileButton>
            </MobileCard>
          ))}
        </div>

        {allReceipts.length === 0 && (
          <MobileCard>
            <div className="text-center py-8">
              <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">ไม่พบข้อมูลใบเสร็จ</p>
            </div>
          </MobileCard>
        )}
      </MobileContent>
      <BottomNavigation currentPath="/installment" />
    </MobileLayout>
  )
}