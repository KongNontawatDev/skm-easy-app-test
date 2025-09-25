import { useState } from 'react'
import { MobileLayout, MobileHeader, MobileContent, BottomNavigation } from '@/components/mobile'
import { PromotionCard } from './components/promotion-card'
import { CategoryFilter } from './components/category-filter'
import { mockPromotions } from './data/mock-data'
import type { PromotionCategory } from './types'

export function Promotion() {
  const [selectedCategory, setSelectedCategory] = useState<PromotionCategory>('all')

  const filteredPromotions = mockPromotions.filter(promotion =>
    selectedCategory === 'all' || promotion.category === selectedCategory
  )

  const handleViewDetail = (_promotionId: string) => {
    // Navigate to promotion detail (if needed)
  }

  return (
    <MobileLayout>
      <MobileHeader title="โปรโมชั่น" showMoreMenu={true} />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
          
          <div className="grid grid-cols-1 gap-4">
            {filteredPromotions.length > 0 ? (
              filteredPromotions.map(promotion => (
                <PromotionCard
                  key={promotion.id}
                  promotion={promotion}
                  onViewDetail={handleViewDetail}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎉</span>
                </div>
                <p className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">ไม่มีโปรโมชั่น</p>
                <p className="text-sm">ไม่มีโปรโมชั่นในหมวดหมู่นี้</p>
              </div>
            )}
          </div>
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/promotion" />
    </MobileLayout>
  )
}
