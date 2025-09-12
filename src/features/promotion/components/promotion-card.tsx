import { Calendar, Percent, DollarSign, Star } from 'lucide-react'
import type { Promotion } from '../types'

interface PromotionCardProps {
  promotion: Promotion
  onViewDetail: (promotionId: string) => void
}

export function PromotionCard({ promotion, onViewDetail }: PromotionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getDiscountText = () => {
    if (promotion.discountPercentage) {
      return `ลด ${promotion.discountPercentage}%`
    } else if (promotion.discountAmount) {
      return `ลด ${promotion.discountAmount.toLocaleString()} บาท`
    } else {
      return 'ฟรีค่าธรรมเนียม'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'discount':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
      case 'free_fee':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
      case 'cashback':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
      case 'special':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
    }
  }

  const isExpired = new Date(promotion.validUntil) < new Date()

  return (
    <div 
      className={`relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
        isExpired ? 'opacity-60' : ''
      }`}
      onClick={() => onViewDetail(promotion.id)}
    >
      {/* Featured Badge */}
      {promotion.isFeatured && (
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center bg-[#EC1B2E] text-white px-2 py-1 rounded-full text-xs font-medium">
            <Star className="w-3 h-3 mr-1" />
            แนะนำ
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {promotion.imageUrl && (
          <img 
            src={promotion.imageUrl} 
            alt={promotion.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute bottom-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(promotion.category)}`}>
            {promotion.category === 'all' ? 'ทั่วไป' : 
             promotion.category === 'discount' ? 'ส่วนลด' :
             promotion.category === 'free_fee' ? 'ฟรีค่าธรรมเนียม' :
             promotion.category === 'cashback' ? 'คืนเงิน' :
             promotion.category === 'special' ? 'พิเศษ' : 'อื่นๆ'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          {promotion.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {promotion.description}
        </p>

        {/* Discount Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-[#EC1B2E] font-semibold">
            {promotion.discountPercentage ? (
              <Percent className="w-4 h-4 mr-1" />
            ) : (
              <DollarSign className="w-4 h-4 mr-1" />
            )}
            <span>{getDiscountText()}</span>
          </div>
          {promotion.minPurchase && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ขั้นต่ำ {promotion.minPurchase.toLocaleString()} บาท
            </span>
          )}
        </div>

        {/* Validity Period */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span>ใช้ได้ถึง {formatDate(promotion.validUntil)}</span>
          </div>
          {isExpired && (
            <span className="text-red-500 dark:text-red-400 font-medium">หมดอายุแล้ว</span>
          )}
        </div>
      </div>
    </div>
  )
}
