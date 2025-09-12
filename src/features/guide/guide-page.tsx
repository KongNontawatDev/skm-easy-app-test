import { useState } from 'react'
import { MobileLayout, MobileHeader, MobileContent, BottomNavigation } from '@/components/mobile'
import { GuideCard } from './components/guide-card'
import { CategoryFilter } from './components/category-filter'
import { mockGuides } from './data/mock-data'
import type { GuideCategory } from './types'
import { useRouter } from '@tanstack/react-router'

export function Guide() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory>('all')

  const filteredGuides = mockGuides.filter(guide =>
    selectedCategory === 'all' || guide.category === selectedCategory
  )

  const handleViewDetail = (guideId: string) => {
    router.navigate({ to: '/guide/$id', params: { id: guideId } })
  }

  return (
    <MobileLayout>
      <MobileHeader title="วิธีใช้งาน" showMoreMenu={true} />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
          
          <div className="grid grid-cols-1 gap-4">
            {filteredGuides.length > 0 ? (
              filteredGuides.map(guide => (
                <GuideCard
                  key={guide.id}
                  guide={guide}
                  onViewDetail={handleViewDetail}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📖</span>
                </div>
                <p className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">ไม่พบคู่มือ</p>
                <p className="text-sm">ไม่มีคู่มือในหมวดหมู่นี้</p>
              </div>
            )}
          </div>
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/guide" />
    </MobileLayout>
  )
}
