import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Camera } from 'lucide-react'
import type { ContractCard } from '../types'

interface ContractCardsCarouselProps {
  contracts: ContractCard[]
  onImageUpload?: (contractId: string, file: File) => void
  onContractChange?: (index: number) => void
  className?: string
}

const gradient = 'linear-gradient(135deg, rgba(236, 27, 46, 0.2), rgba(194, 0, 16, 0.14))'

export function ContractCardsCarousel({ 
  contracts, 
  onImageUpload,
  onContractChange,
  className 
}: ContractCardsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center' })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isUploading, setIsUploading] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      const newIndex = emblaApi.selectedScrollSnap()
      setActiveIndex(newIndex)
      onContractChange?.(newIndex)
    }
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onContractChange])

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
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {contracts.map((contract) => (
            <div key={contract.id} className="shrink-0 basis-[90%]">
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
                      {contract.remainingAmount.toLocaleString('th-TH')} ฿
                    </b>
                  </div>
                </div>
                
                {/* ข้อมูลย่อ */}
                <div className="p-3">
                  <div className="text-sm font-semibold text-[#EC1B2E]">
                    {contract.vehicleInfo.brand} {contract.vehicleInfo.model}
                  </div>
                  <div className="text-xs text-gray-500">
                    สัญญา: {contract.contractNumber} • สี {contract.vehicleInfo.color}
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {contracts.map((_, i) => (
          <span 
            key={i} 
            onClick={() => emblaApi?.scrollTo(i)}
            className="h-[6px] w-[10px] rounded-full cursor-pointer transition-colors"
            style={{ 
              background: i === activeIndex ? '#EC1B2E' : 'rgba(0, 0, 0, 0.25)' 
            }} 
          />
        ))}
      </div>

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
