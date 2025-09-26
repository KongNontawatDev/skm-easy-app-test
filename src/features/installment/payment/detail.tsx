import { useState, useEffect } from 'react'
import { useParams } from '@tanstack/react-router'
import {  Download, RefreshCw, AlertCircle } from 'lucide-react'
import { getContractById, getPaymentsByContract } from '@/lib/mock-data'
import {
  MobileLayout,
  MobileHeader,
  MobileContent,
  BottomNavigation,
  MobileCard,
  MobileButton,
} from '@/components/mobile'

export function PaymentDetail() {
  const { id: contractNumber } = useParams({ from: '/installment/pay/$id' })
  const [isLoading, setIsLoading] = useState(true)

  // ใช้ข้อมูลจากข้อมูลกลาง
  const contract = getContractById(contractNumber)
  const payments = getPaymentsByContract(contractNumber)
  const currentPayment = payments.find(
    (p) => p.status === 'pending' || p.status === 'overdue'
  )

  useEffect(() => {
    // Simulate QR code generation
    const generateQRCode = () => {
      setIsLoading(true)
      // Mock QR code data
      setIsLoading(false)
    }

    generateQRCode()
  }, [contractNumber])

  if (!contract || !currentPayment) {
    return (
      <MobileLayout>
        <MobileHeader title='ไม่พบข้อมูลการชำระ' />
        <MobileContent>
          <MobileCard>
            <p className='text-center text-gray-500'>
              ไม่พบข้อมูลการชำระที่ระบุ
            </p>
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
    status: currentPayment.status,
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('th-TH')
  }


  const isOverdue = new Date(payment.dueDate) < new Date()

  const handleDownload = () => {
    // Mock download functionality
  }


  return (
    <MobileLayout>
      <MobileHeader
        title='QR Code ชำระเงิน'
        showBackButton={true}
        onBackClick={() => window.history.back()}
      />

      <MobileContent className='pb-20'>
        <div className='space-y-4'>
          {/* Payment Summary */}
          <MobileCard className='p-4'>
            <div className='text-center'>
              <h1 className='mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100'>
                QR Code ชำระเงิน
              </h1>
              {/* <p className="text-gray-600 dark:text-gray-400 mb-4">
                สัญญา: {payment.contractNo}
              </p> */}
              <div className='mb-2 text-3xl font-bold text-[#EC1B2E]'>
                {formatNumber(payment.amount)} ฿
              </div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                ครบกำหนด: {formatDate(payment.dueDate)} • งวดที่{' '}
                {payment.installmentNo}
              </p>
            </div>
          </MobileCard>

          {/* Overdue Warning */}
          {isOverdue && (
            <MobileCard className='border-red-200 bg-red-50 p-3 dark:border-red-700 dark:bg-red-900/20'>
              <div className='flex items-center'>
                <AlertCircle className='mr-3 h-5 w-5 text-red-600 dark:text-red-400' />
                <div>
                  <h4 className='font-semibold text-red-800 dark:text-red-200'>
                    เกินกำหนดชำระ
                  </h4>
                  <p className='text-sm text-red-600 dark:text-red-400'>
                    กรุณาชำระเงินโดยเร็วที่สุดเพื่อหลีกเลี่ยงค่าปรับเพิ่มเติม
                  </p>
                </div>
              </div>
            </MobileCard>
          )}

          {/* QR Code */}
          <MobileCard className='p-4'>
            <div className='text-center'>
              {/* <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                QR Code สำหรับโอนเงิน
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                บันทึก QR Code นี้แล้วอัพโหลดในแอพธนาคาร
              </p> */}

              {isLoading ? (
                <div className='mx-auto flex h-64 w-64 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-700'>
                  <RefreshCw className='h-8 w-8 animate-spin text-gray-400' />
                </div>
              ) : (
                <div className='mx-auto flex h-64 w-64 items-center justify-center rounded-2xl border-2 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'>
                  {/* QR Code Image */}
                  <img
                    src='https://hexdocs.pm/qr_code/docs/qrcode.svg'
                    alt='QR Code สำหรับชำระเงิน'
                    className='h-56 w-56 rounded-xl'
                  />
                </div>
              )}
            </div>
          </MobileCard>

          {/* Instructions */}
          <MobileCard className='p-4'>
            <h3 className='mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100'>
              วิธีการโอนเงิน
            </h3>
            <div className='space-y-3 text-sm text-gray-600 dark:text-gray-400'>
              <div className='flex items-start'>
                <div className='mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#EC1B2E] text-xs font-bold text-white'>
                  1
                </div>
                <p>บันทึก QR Code ด้านบนลงในอุปกรณ์ของคุณ</p>
              </div>
              <div className='flex items-start'>
                <div className='mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#EC1B2E] text-xs font-bold text-white'>
                  2
                </div>
                <p>เปิดแอปธนาคารหรือแอปชำระเงิน</p>
              </div>
              <div className='flex items-start'>
                <div className='mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#EC1B2E] text-xs font-bold text-white'>
                  3
                </div>
                <p>เลือกเมนู "สแกน QR Code" หรือ "อัพโหลดรูปภาพ"</p>
              </div>
              <div className='flex items-start'>
                <div className='mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#EC1B2E] text-xs font-bold text-white'>
                  4
                </div>
                <p>อัพโหลดรูป QR Code ที่บันทึกไว้</p>
              </div>
              <div className='flex items-start'>
                <div className='mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#EC1B2E] text-xs font-bold text-white'>
                  5
                </div>
                <p>ตรวจสอบข้อมูลและยืนยันการโอนเงิน</p>
              </div>
            </div>
          </MobileCard>

          {/* Actions */}
          <div className='space-y-3'>
            <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-700 dark:bg-yellow-900/20'>
              <p className='text-center text-sm text-yellow-800 dark:text-yellow-200'>
                💡 <strong>หมายเหตุ:</strong>{' '}
                หากชำระแล้วใบเสร็จจะถูกส่งให้ย้อนหลังภายใน 1-2 วัน
              </p>
            </div>

            <MobileButton
              variant='outline'
              className='w-full'
              onClick={handleDownload}
            >
              <Download className='mr-2 h-4 w-4' />
              บันทึก QR Code
            </MobileButton>
          </div>

          {/* Payment Status */}
          {/* <MobileCard className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">การชำระเงินปลอดภัย</h4>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  ระบบชำระเงินได้รับการรับรองมาตรฐานความปลอดภัยระดับสากล
                </p>
              </div>
            </div>
          </MobileCard> */}
        </div>
      </MobileContent>

      <BottomNavigation currentPath='/installment' />
    </MobileLayout>
  )
}
