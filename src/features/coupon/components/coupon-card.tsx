import { useState } from 'react'
import { QrCode, Calendar, Users } from 'lucide-react'
import type { Coupon } from '../types'

interface CouponCardProps {
  coupon: Coupon
  onViewDetail: (couponId: string) => void
  onUseQR: (couponId: string) => void
}

export function CouponCard({ coupon, onViewDetail, onUseQR }: CouponCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getDiscountText = () => {
    if (coupon.discountType === 'percentage') {
      return `ลด ${coupon.discountValue}%`
    } else {
      return `ลด ${coupon.discountValue.toLocaleString()} บาท`
    }
  }

  const getUsageText = () => {
    if (coupon.usageLimit) {
      return `${coupon.usedCount}/${coupon.usageLimit}`
    }
    return `${coupon.usedCount} ครั้ง`
  }

  const isExpired = new Date(coupon.validUntil) < new Date()
  const isUsedUp = coupon.usageLimit && coupon.usedCount >= coupon.usageLimit

  return (
    <div 
      className={`relative h-48 cursor-pointer transition-transform duration-300 hover:scale-105 ${
        isExpired || isUsedUp ? 'opacity-60' : ''
      }`}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Front Side */}
      <div 
        className="absolute inset-0 w-full h-full transition-transform duration-500"
        style={{ 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="bg-gradient-to-r from-[#EC1B2E] to-[#C20010] text-white rounded-2xl p-4 h-full relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            {isExpired ? (
              <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">หมดอายุ</span>
            ) : isUsedUp ? (
              <span className="px-2 py-1 bg-gray-500 text-white text-xs rounded-full">ใช้หมดแล้ว</span>
            ) : (
              <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">ใช้งานได้</span>
            )}
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{coupon.title}</h3>
              <p className="text-white/90 text-sm line-clamp-2">{coupon.description}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">ส่วนลด</span>
                <span className="font-bold">{getDiscountText()}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">ใช้แล้ว</span>
                <span className="font-medium">{getUsageText()}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">หมดอายุ</span>
                <span className="font-medium">{formatDate(coupon.validUntil)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Side */}
      <div 
        className="absolute inset-0 w-full h-full transition-transform duration-500"
        style={{ 
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="bg-white rounded-2xl p-4 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{coupon.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{coupon.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>หมดอายุ {formatDate(coupon.validUntil)}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>ใช้แล้ว {getUsageText()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onViewDetail(coupon.id)
              }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              ดูรายละเอียด
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                onUseQR(coupon.id)
              }}
              disabled={!!(isExpired || isUsedUp)}
              className="flex-1 bg-[#EC1B2E] hover:bg-[#C20010] disabled:bg-gray-300 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
            >
              <QrCode className="w-4 h-4 mr-1" />
              ใช้คูปอง
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
