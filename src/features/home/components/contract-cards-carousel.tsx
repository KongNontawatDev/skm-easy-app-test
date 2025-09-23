import { useEffect, useRef, useState, useMemo } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Camera } from 'lucide-react'
import type { ContractCard } from '../types'
import { Link } from '@tanstack/react-router'
import { getContractById, getPaymentsByContract } from '@/lib/mock-data'

interface ContractCardsCarouselProps {
  contracts: ContractCard[]
  onImageUpload?: (contractId: string, file: File) => void
  onContractChange?: (index: number) => void
  className?: string
  initialIndex?: number
}

const gradient = 'linear-gradient(135deg, rgba(236, 27, 46, 0.2), rgba(194, 0, 16, 0.14))'

export function ContractCardsCarousel({ 
  contracts, 
  onImageUpload,
  onContractChange,
  className,
  initialIndex = 0
}: ContractCardsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    skipSnaps: false
  })
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [isUploading, setIsUploading] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // คำนวณข้อมูลการชำระเงินล่วงหน้าเพื่อหลีกเลี่ยงการคำนวณซ้ำ
  const contractPaymentData = useMemo(() => {
    return contracts.map(contract => {
      const contractData = getContractById(contract.contractNumber)
      const payments = getPaymentsByContract(contract.contractNumber)
      const nextPayment = payments.find(p => p.status === 'pending' || p.status === 'overdue')
      
      return {
        contractId: contract.id,
        amount: nextPayment ? nextPayment.amount : contractData?.financialInfo.monthlyPayment || 0
      }
    })
  }, [contracts])

  useEffect(() => {
    if (!emblaApi) return
    
    // eslint-disable-next-line no-console
    console.log('Carousel: Setting up emblaApi listeners')
    
    const onSelect = () => {
      const newIndex = emblaApi.selectedScrollSnap()
      // eslint-disable-next-line no-console
      console.log('Carousel: onSelect triggered, newIndex:', newIndex)
      setActiveIndex(newIndex)
      onContractChange?.(newIndex)
    }
    
    const onInit = () => {
      // eslint-disable-next-line no-console
      console.log('Carousel: onInit triggered')
      onSelect()
    }
    
    emblaApi.on('select', onSelect)
    emblaApi.on('init', onInit)
    
    // Initialize immediately if already ready
    if (emblaApi.slideNodes().length > 0) {
      // eslint-disable-next-line no-console
      console.log('Carousel: Slide nodes ready, calling onSelect')
      onSelect()
    }
    
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('init', onInit)
    }
  }, [emblaApi, onContractChange])

  // Debug: Log carousel state changes
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Carousel state:', { activeIndex, contractsLength: contracts.length, initialIndex })
  }, [activeIndex, contracts.length, initialIndex])

  // Force update when contracts change
  useEffect(() => {
    if (emblaApi && contracts.length > 0) {
      // eslint-disable-next-line no-console
      console.log('Carousel: Contracts changed, re-initializing')
      // Reset active index when contracts change
      setActiveIndex(0)
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        emblaApi.reInit()
        // Scroll to first slide after re-init
        emblaApi.scrollTo(0, false)
        // eslint-disable-next-line no-console
        console.log('Carousel: Re-initialized and scrolled to 0')
      }, 100)
    }
  }, [emblaApi, contracts])

  // Scroll ไปยัง initialIndex เมื่อ emblaApi พร้อม
  useEffect(() => {
    if (emblaApi && initialIndex !== undefined) {
      // eslint-disable-next-line no-console
      console.log('Carousel: Scrolling to initialIndex:', initialIndex)
      emblaApi.scrollTo(initialIndex, false) // false = smooth scroll
      setActiveIndex(initialIndex)
    }
  }, [emblaApi, initialIndex])


  const handleImageUpload = (contractId: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('data-contract-id', contractId)
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const contractId = event.target.getAttribute('data-contract-id')
    
    if (file && contractId && onImageUpload) {
      setIsUploading(contractId)
      onImageUpload(contractId, file)
      // Reset loading state after a delay (in real app, this would be handled by the mutation)
      setTimeout(() => setIsUploading(null), 2000)
    }
    
    // Reset input
    event.target.value = ''
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  if (contracts.length === 0) {
    return (
      <div className={`p-6 text-center ${className}`}>
        <div className="text-gray-500 dark:text-gray-400">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-2xl">🚗</span>
          </div>
          <p className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">ไม่มีข้อมูลสัญญา</p>
          <p className="text-sm">เริ่มต้นการผ่อนชำระรถคันแรกของคุณ</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Header with contract count */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          สัญญาของฉัน ({contracts.length})
        </h3>
      </div>

      {/* Embla Carousel */}
      <div className="overflow-hidden" ref={emblaRef} key={`carousel-${contracts.length}`}>
        <div className="flex gap-3">
          {contracts.map((contract, _index) => (
            <div key={`${contract.id}-${_index}`} className="shrink-0 basis-[90%] min-w-0">
              <div className="rounded-2xl p-0 bg-white dark:bg-gray-800">
                {/* ภาพรถ */}
                <div 
                  className="relative rounded-t-2xl" 
                  style={{ height: 140, background: gradient }}
                >
                  {(contract.vehicleInfo.customImageUrl || contract.vehicleInfo.imageUrl) && (
                    <img 
                      src={contract.vehicleInfo.customImageUrl || contract.vehicleInfo.imageUrl}
                      alt={`${contract.vehicleInfo.brand} ${contract.vehicleInfo.model}`}
                      className="absolute inset-0 w-full h-full object-cover rounded-t-2xl" 
                      loading="lazy" 
                    />
                  )}
                  
                  {/* ปุ่มเปลี่ยนรูป */}
                  <button
                    type="button"
                    onClick={() => handleImageUpload(contract.id)}
                    disabled={isUploading === contract.id}
                    className="absolute right-2 top-2 h-8 px-2 rounded-full text-xs bg-white/80 hover:bg-white transition-colors disabled:opacity-50"
                  >
                    {isUploading === contract.id ? (
                      <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Camera className="w-3 h-3 inline mr-1" />
                        เปลี่ยนรูป
                      </>
                    )}
                  </button>
                  
                  {/* แถบ due บนภาพ */}
                  <div className="absolute left-2 bottom-2 rounded-md px-2 py-1 text-[11px] bg-white/80">
                    งวดถัดไป {formatDate(contract.nextPaymentDate)} • 
                    <b className="text-[#EC1B2E] ml-1">
                      {contractPaymentData.find(p => p.contractId === contract.id)?.amount.toLocaleString('th-TH') || '0'} ฿
                    </b>
                  </div>
                </div>
                
                {/* ข้อมูลย่อ */}
                <Link to={`/installment`} className="p-3">
                  <div className="text-sm font-semibold text-[#EC1B2E]">
                    {contract.vehicleInfo.brand} {contract.vehicleInfo.model}
                  </div>
                  <div className="text-xs text-gray-500">
                    สัญญา: {contract.contractNumber} • สี {contract.vehicleInfo.color}
                  </div>
                  
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      {contracts.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {contracts.map((_, i) => (
            <button
              key={i} 
              onClick={() => emblaApi?.scrollTo(i)}
              className="h-[6px] w-[10px] rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
              style={{ 
                background: i === activeIndex ? '#EC1B2E' : 'rgba(0, 0, 0, 0.25)',
                transform: i === activeIndex ? 'scale(1.2)' : 'scale(1)'
              }} 
              aria-label={`ไปยังสไลด์ ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
