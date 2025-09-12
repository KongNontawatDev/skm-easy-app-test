import { useState } from 'react'
import { MobileLayout, MobileHeader, MobileContent, BottomNavigation } from '@/components/mobile'
import { BlogCard } from './components/blog-card'
import { CategoryFilter } from './components/category-filter'
import { mockBlogPosts } from './data/mock-data'
import type { BlogCategory } from './types'
import { useRouter } from '@tanstack/react-router'

export function Blog() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('all')

  const filteredPosts = mockBlogPosts.filter(post =>
    selectedCategory === 'all' || post.category === selectedCategory
  )

  const handleViewDetail = (postId: string) => {
    router.navigate({ to: '/blog/$id', params: { id: postId } })
  }


  return (
    <MobileLayout>
      <MobileHeader 
        title="ข่าวสาร/บทความ" 
        showMoreMenu={true}
      />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
          
          <div className="grid grid-cols-1 gap-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onViewDetail={handleViewDetail}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📰</span>
                </div>
                <p className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">ไม่พบบทความ</p>
                <p className="text-sm">ไม่มีบทความในหมวดหมู่นี้</p>
              </div>
            )}
          </div>
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/blog" />
    </MobileLayout>
  )
}
