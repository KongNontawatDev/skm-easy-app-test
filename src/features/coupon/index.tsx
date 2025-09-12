import { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { 
  MobileLayout, 
  MobileHeader, 
  MobileContent, 
  BottomNavigation 
} from '@/components/mobile'
import { CouponCard } from './components/coupon-card'
import { CategoryFilter } from './components/category-filter'
import { mockCoupons, mockCouponCategories } from './data/mock-data'

export function Coupon() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('1')

  const filteredCoupons = selectedCategory === '1' 
    ? mockCoupons 
    : mockCoupons.filter(coupon => {
        // Simple filtering logic - in real app, this would be more sophisticated
        switch (selectedCategory) {
          case '2': // ส่วนลด
            return coupon.discountType === 'percentage' || coupon.discountType === 'fixed'
          case '3': // ฟรีค่าธรรมเนียม
            return coupon.title.includes('ฟรี') || coupon.title.includes('ค่าธรรมเนียม')
          case '4': // พิเศษ
            return coupon.title.includes('พิเศษ') || coupon.discountValue > 500
          default:
            return true
        }
      })

  const handleViewDetail = (couponId: string) => {
    router.navigate({ to: `/coupon/${couponId}` })
  }

  const handleUseQR = (couponId: string) => {
    router.navigate({ to: '/coupon/qrcode', search: { couponId } })
  }

  return (
    <MobileLayout>
      <MobileHeader title="คูปองส่วนลด" />
      
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Category Filter */}
          <CategoryFilter
            categories={mockCouponCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Coupons Grid */}
          <div className="space-y-4">
            {filteredCoupons.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎫</span>
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">ไม่มีคูปอง</p>
                <p className="text-gray-500">ไม่มีคูปองในหมวดหมู่นี้</p>
              </div>
            ) : (
              filteredCoupons.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  coupon={coupon}
                  onViewDetail={handleViewDetail}
                  onUseQR={handleUseQR}
                />
              ))
            )}
          </div>

          {/* QR Scanner Button */}
          <div className="bg-gradient-to-r from-[#EC1B2E] to-[#C20010] rounded-2xl p-4 text-white text-center">
            <h3 className="text-lg font-semibold mb-2">สแกน QR Code</h3>
            <p className="text-white/90 text-sm mb-4">สแกน QR Code เพื่อใช้คูปอง</p>
            <button
              onClick={() => router.navigate({ to: '/coupon/qrcode' })}
              className="bg-white text-[#EC1B2E] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              เปิดกล้องสแกน
            </button>
          </div>
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/profile" />
    </MobileLayout>
  )
}
