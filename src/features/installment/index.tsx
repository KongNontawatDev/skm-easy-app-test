import { useState } from 'react'
import {
  FileText,
  Receipt,
  CreditCard,
  History,
  ArrowRight,
  QrCode,
} from 'lucide-react'
import {
  MobileLayout,
  MobileHeader,
  MobileContent,
  BottomNavigation,
  MobileButton,
} from '@/components/mobile'
import { ContractCardsCarousel } from '../home/components/contract-cards-carousel'
import { InstallmentProgress } from '../home/components/installment-progress'
import { mockHomeData, mockContractProgressData } from '../home/data/mock-data'
import { useUploadContractImage } from '../home/hooks/useMutation'

export function Installment() {
  const uploadImageMutation = useUploadContractImage()
  const [selectedContractIndex, setSelectedContractIndex] = useState(0)

  const handleImageUpload = (contractId: string, file: File) => {
    uploadImageMutation.mutate({ contractId, file })
  }

  const handleContractChange = (index: number) => {
    setSelectedContractIndex(index)
  }

  const selectedContract = mockHomeData.contracts[selectedContractIndex]
  const selectedProgress = selectedContract
    ? mockContractProgressData[
        selectedContract.id as keyof typeof mockContractProgressData
      ]
    : null

  const menuItems = [
    {
      id: 'contract',
      title: 'ข้อมูลสัญญา',
      description: 'ดูรายละเอียดสัญญาค่างวดรถ',
      icon: FileText,
      path: '/contract',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'invoice',
      title: 'ใบแจ้งหนี้',
      description: 'ดูใบแจ้งหนี้ค่างวดรถ',
      icon: Receipt,
      path: '/invoice',
      color: 'bg-green-50 text-green-600',
    },
    {
      id: 'receipt',
      title: 'ประวัติการชำระ/ใบเสร็จ',
      description: 'ดูประวัติการชำระและใบเสร็จ',
      icon: History,
      path: '/receipt',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      id: 'payment',
      title: 'ชำระค่างวด',
      description: 'ชำระค่างวดรถออนไลน์',
      icon: CreditCard,
      path: '/installment/pay',
      color: 'bg-orange-50 text-orange-600',
    },
  ]

  const handlePayNow = () => {
    if (selectedContract) {
      window.location.href = `/installment/pay/${selectedContract.id}`
    }
  }

  return (
    <MobileLayout>
      <MobileHeader title='ค่างวดรถ' showMoreMenu={true} />

      <MobileContent className='pb-48'>
        <div className='space-y-6'>
          {/* Contract Cards Carousel */}
          <ContractCardsCarousel
            contracts={mockHomeData.contracts}
            onImageUpload={handleImageUpload}
            onContractChange={handleContractChange}
          />

          {/* Installment Progress */}
          {selectedProgress && (
            <InstallmentProgress
              totalAmount={selectedProgress.totalAmount}
              paidAmount={selectedProgress.paidAmount}
              nextDueDate={selectedProgress.nextDueDate}
              installmentIndex={selectedProgress.installmentIndex}
              totalInstallments={selectedProgress.totalInstallments}
            />
          )}

          {/* Menu Items */}
          <div className='space-y-3'>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
              เมนูหลัก
            </h2>
            {menuItems.map((item) => (
              <MobileButton
                key={item.id}
                variant='ghost'
                className='h-auto w-full justify-start p-4'
                onClick={() => (window.location.href = item.path)}
              >
                <div className='flex w-full items-center space-x-4'>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${item.color}`}
                  >
                    <item.icon className='h-6 w-6' />
                  </div>
                  <div className='flex-1 text-left'>
                    <h3 className='font-semibold text-gray-900 dark:text-gray-100'>
                      {item.title}
                    </h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className='h-5 w-5 text-gray-400 dark:text-gray-500' />
                </div>
              </MobileButton>
            ))}
          </div>
        </div>

        {/* Fixed Bottom Payment Section */}
        {selectedContract && selectedProgress && (
          <div className='fixed w-full right-0 bottom-16 left-0 z-40 bg-white p-4 dark:bg-gray-800'>
            <div className='mx-auto max-w-lg'>
              <div className='mb-3 flex items-center justify-between'>
                <div>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    ยอดที่ต้องชำระ
                  </p>
                  <p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
                    {selectedContract.remainingAmount.toLocaleString()} ฿
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    งวดที่ {selectedProgress.installmentIndex + 1} จาก{' '}
                    {selectedProgress.totalInstallments}
                  </p>
                </div>
                <MobileButton
                  onClick={handlePayNow}
                  className='bg-[#EC1B2E] px-6 py-3 text-white hover:bg-[#C20010]'
                >
                  <QrCode className='mr-2 h-5 w-5' />
                  ชำระเลย
                </MobileButton>
              </div>
            </div>
          </div>
        )}
      </MobileContent>

      <BottomNavigation currentPath='/installment' />
    </MobileLayout>
  )
}
