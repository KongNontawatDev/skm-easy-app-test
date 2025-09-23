import { 
  MobileLayout, 
  MobileHeader, 
  MobileContent, 
  BottomNavigation,
  MobileCard,
  MobileButton
} from '@/components/mobile'
import { 
  QrCode,
  Download,
  Share2,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useParams } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { getContractById, getPaymentsByContract } from '@/lib/mock-data'

export function PaymentDetail() {
  const { id: contractNumber } = useParams({ from: '/installment/pay/$id' })
  const [isLoading, setIsLoading] = useState(true)
  const [expiresAt, setExpiresAt] = useState<Date | null>(null)

  // ใช้ข้อมูลจากข้อมูลกลาง
  const contract = getContractById(contractNumber)
  const payments = getPaymentsByContract(contractNumber)
  const currentPayment = payments.find(p => p.status === 'pending' || p.status === 'overdue')

  useEffect(() => {
    // Simulate QR code generation
    const generateQRCode = () => {
      setIsLoading(true)
      // Mock QR code data
      setExpiresAt(new Date(Date.now() + 15 * 60 * 1000)) // 15 minutes
      setIsLoading(false)
    }

    generateQRCode()
  }, [contractNumber])

  if (!contract || !currentPayment) {
    return (
      <MobileLayout>
        <MobileHeader title="ไม่พบข้อมูลการชำระ" />
        <MobileContent>
          <MobileCard>
            <p className="text-center text-gray-500">ไม่พบข้อมูลการชำระที่ระบุ</p>
          </MobileCard>
        </MobileContent>
      </MobileLayout>
    )
  }

  const payment = {
    id: currentPayment.id,
    contractNo: currentPayment.contractNo,
    installmentNo: currentPayment.installmentNo,
    amount: currentPayment.amount,
    dueDate: currentPayment.dueDate,
    status: currentPayment.status
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isOverdue = new Date(payment.dueDate) < new Date()

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setExpiresAt(new Date(Date.now() + 15 * 60 * 1000))
      setIsLoading(false)
    }, 1000)
  }

  const handleDownload = () => {
    // Mock download functionality
    // console.log('Download QR Code')
  }

  const handleShare = () => {
    // Mock share functionality
    // console.log('Share QR Code')
  }

  const isExpired = expiresAt && new Date() > expiresAt

  return (
    <MobileLayout>
      <MobileHeader 
        title="QR Code ชำระเงิน" 
        showBackButton={true}
        onBackClick={() => window.history.back()}
      />
      
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Payment Summary */}
          <MobileCard className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                QR Code ชำระเงิน
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                สัญญา: {payment.contractNo} • งวดที่ {payment.installmentNo}
              </p>
              <div className="text-3xl font-bold text-[#EC1B2E] mb-2">
                {formatNumber(payment.amount)} ฿
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ครบกำหนด: {formatDate(payment.dueDate)}
              </p>
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

          {/* QR Code */}
          <MobileCard className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                สแกน QR Code เพื่อชำระเงิน
              </h3>
              
              {isLoading ? (
                <div className="w-64 h-64 mx-auto bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-gray-400 animate-spin" />
                </div>
              ) : (
                <div className="w-64 h-64 mx-auto bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  {/* Mock QR Code - ในแอปจริงจะใช้ QR Code library */}
                  <div className="w-56 h-56 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-gray-400" />
                  </div>
                </div>
              )}

              {expiresAt && !isExpired && (
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  QR Code หมดอายุใน {formatTime(expiresAt)}
                </div>
              )}

              {isExpired && (
                <div className="mt-4 flex items-center justify-center text-red-600 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">QR Code หมดอายุแล้ว</span>
                </div>
              )}
            </div>
          </MobileCard>

          {/* Instructions */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              วิธีการชำระเงิน
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#EC1B2E] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</div>
                <p>เปิดแอปธนาคารหรือแอปชำระเงิน</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#EC1B2E] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</div>
                <p>เลือกเมนู "สแกน QR Code"</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#EC1B2E] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</div>
                <p>สแกน QR Code ด้านบน</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-[#EC1B2E] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</div>
                <p>ตรวจสอบข้อมูลและยืนยันการชำระเงิน</p>
              </div>
            </div>
          </MobileCard>

          {/* Actions */}
          <div className="space-y-3">
            <MobileButton
              onClick={handleRefresh}
              disabled={isLoading}
              className="w-full"
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'กำลังสร้าง QR Code...' : 'สร้าง QR Code ใหม่'}
            </MobileButton>
            
            <div className="grid grid-cols-2 gap-3">
              <MobileButton
                variant="outline"
                className="w-full"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                บันทึก
              </MobileButton>
              
              <MobileButton
                variant="outline"
                className="w-full"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                แชร์
              </MobileButton>
            </div>
          </div>

          {/* Payment Status */}
          <MobileCard className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">การชำระเงินปลอดภัย</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  ระบบชำระเงินได้รับการรับรองมาตรฐานความปลอดภัยระดับสากล
                </p>
              </div>
            </div>
          </MobileCard>
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/installment" />
    </MobileLayout>
  )
}
