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
  DollarSign,
  CreditCard,
  AlertCircle
} from 'lucide-react'
import { useParams } from '@tanstack/react-router'
import { useState } from 'react'

export function PaymentDetail() {
  const { id } = useParams({ from: '/installment/pay/$id' })
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card' | 'bank'>('qr')

  // Mock data - ในแอปจริงจะ fetch จาก API
  const payment = {
    id: id,
    contractNo: 'CT-2024-001',
    installmentNo: 13,
    amount: 15000,
    dueDate: '2024-02-15',
    status: 'pending'
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

  const isOverdue = new Date(payment.dueDate) < new Date()

  const handlePayment = () => {
    if (paymentMethod === 'qr') {
      window.location.href = `/installment/pay/${payment.id}/qrcode`
    } else {
      // Handle other payment methods
      // console.log('Payment method:', paymentMethod)
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
          {/* Payment Summary */}
          <MobileCard className="p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                สรุปการชำระ
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

          {/* Payment Methods */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              เลือกวิธีการชำระ
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod('qr')}
                className={`w-full p-4 rounded-xl border-2 transition-colors ${
                  paymentMethod === 'qr'
                    ? 'border-[#EC1B2E] bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <QrCode className="w-6 h-6 text-[#EC1B2E] mr-3" />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">QR Code</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">สแกน QR Code เพื่อชำระเงิน</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 rounded-xl border-2 transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-[#EC1B2E] bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <CreditCard className="w-6 h-6 text-[#EC1B2E] mr-3" />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">บัตรเครดิต/เดบิต</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">ชำระด้วยบัตรเครดิตหรือเดบิต</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('bank')}
                className={`w-full p-4 rounded-xl border-2 transition-colors ${
                  paymentMethod === 'bank'
                    ? 'border-[#EC1B2E] bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <DollarSign className="w-6 h-6 text-[#EC1B2E] mr-3" />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">โอนเงินผ่านธนาคาร</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">โอนเงินผ่านธนาคารออนไลน์</p>
                  </div>
                </div>
              </button>
            </div>
          </MobileCard>

          {/* Payment Terms */}
          <MobileCard className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              เงื่อนไขการชำระ
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>• การชำระเงินจะได้รับการยืนยันภายใน 1-2 วันทำการ</p>
              <p>• ใบเสร็จจะถูกส่งไปยังอีเมลที่ลงทะเบียนไว้</p>
              <p>• หากมีข้อสงสัยกรุณาติดต่อเจ้าหน้าที่</p>
            </div>
          </MobileCard>

          {/* Payment Button */}
          <MobileButton
            onClick={handlePayment}
            className="w-full bg-[#EC1B2E] hover:bg-[#C20010] text-white py-4 text-lg font-semibold"
          >
            {paymentMethod === 'qr' ? (
              <>
                <QrCode className="w-6 h-6 mr-2" />
                สแกน QR Code ชำระเงิน
              </>
            ) : (
              <>
                <CreditCard className="w-6 h-6 mr-2" />
                ชำระเงิน {formatNumber(payment.amount)} ฿
              </>
            )}
          </MobileButton>
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/installment" />
    </MobileLayout>
  )
}
