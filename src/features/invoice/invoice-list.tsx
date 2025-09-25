import { useParams, Link, useNavigate } from '@tanstack/react-router'
import { MobileLayout } from '@/components/mobile/mobile-layout'
import { MobileHeader } from '@/components/mobile/mobile-header'
import { MobileContent } from '@/components/mobile/mobile-content'
import { MobileCard } from '@/components/mobile/mobile-card'
import { MobileButton } from '@/components/mobile/mobile-button'
import { BottomNavigation } from '@/components/mobile/bottom-navigation'
import { ArrowLeft, FileText, Calendar, DollarSign } from 'lucide-react'
import { getInvoicesByContract, getContractById } from '@/lib/mock-data'

export function InvoiceList() {
  const { contractId } = useParams({ from: '/invoice/$contractId' })
  const navigate = useNavigate()

  // ใช้ข้อมูลจากข้อมูลกลาง
  const contract = getContractById(contractId)
  const allInvoices = getInvoicesByContract(contractId)

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

  // Navigation is now handled by Link component

  return (
    <MobileLayout>
      <MobileHeader 
        title="ใบแจ้งหนี้" 
        onBackClick={() => navigate({ to: '/installment' })}
      />
      <MobileContent>
        {/* Contract Info */}
        {contract && (
          <MobileCard>
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">สัญญา {contract.contractNumber}</h3>
            </div>
            <div className="text-sm text-gray-600">
              <p>{contract.vehicleInfo.brand} {contract.vehicleInfo.model} ({contract.vehicleInfo.year})</p>
              <p>ทะเบียน: {contract.vehicleInfo.plateNumber}</p>
            </div>
          </MobileCard>
        )}

        {/* Invoices List */}
        <div className="space-y-3">
          {allInvoices.map((invoice) => (
            <MobileCard key={invoice.id}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{invoice.invoiceNumber}</h4>
                    <p className="text-sm text-gray-600">{formatDate(invoice.billingInfo.issueDate)}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                  {getStatusText(invoice.status)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ครบกำหนด:</span>
                  <span className="text-sm font-medium">{formatDate(invoice.billingInfo.dueDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ยอดเงิน:</span>
                  <span className="text-lg font-semibold text-green-600">
                    {formatNumber(invoice.billingInfo.totalAmount)} บาท
                  </span>
                </div>
                {invoice.billingInfo.paymentDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ชำระเมื่อ:</span>
                    <span className="text-sm font-medium">{formatDate(invoice.billingInfo.paymentDate)}</span>
                  </div>
                )}
              </div>

               <Link
                 to="/invoice/detail/$invoiceId"
                 params={{ invoiceId: invoice.id }}
                 className="w-full"
                 onClick={() => {
                   // eslint-disable-next-line no-console
                 }}
               >
                <MobileButton
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  ดูรายละเอียด
                </MobileButton>
              </Link>
            </MobileCard>
          ))}
        </div>

        {allInvoices.length === 0 && (
          <MobileCard>
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">ไม่พบข้อมูลใบแจ้งหนี้</p>
            </div>
          </MobileCard>
        )}
      </MobileContent>
      <BottomNavigation currentPath="/installment" />
    </MobileLayout>
  )
}