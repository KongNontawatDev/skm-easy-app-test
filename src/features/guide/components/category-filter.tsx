import type { GuideCategory } from '../types'
import { mockGuideCategories } from '../data/mock-data'

interface CategoryFilterProps {
  selectedCategory: GuideCategory
  onSelectCategory: (category: GuideCategory) => void
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
      {mockGuideCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            ${selectedCategory === category.id
              ? 'bg-[#EC1B2E] text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
