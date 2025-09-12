import { Clock, BookOpen, ArrowRight } from 'lucide-react'
import type { Guide } from '../types'
import { mockGuideDifficulties } from '../data/mock-data'

interface GuideCardProps {
  guide: Guide
  onViewDetail: (guideId: string) => void
}

export function GuideCard({ guide, onViewDetail }: GuideCardProps) {
  const getDifficultyInfo = (difficulty: string) => {
    return mockGuideDifficulties.find(d => d.id === difficulty) || mockGuideDifficulties[0]
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'payment':
        return 'การชำระเงิน'
      case 'account':
        return 'บัญชี'
      case 'app_usage':
        return 'การใช้งานแอป'
      case 'troubleshooting':
        return 'แก้ไขปัญหา'
      default:
        return 'ทั่วไป'
    }
  }

  const difficultyInfo = getDifficultyInfo(guide.difficulty)

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 cursor-pointer transition-all duration-200"
      onClick={() => onViewDetail(guide.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 flex-1 mr-2">
          {guide.title}
        </h3>
        <div className="flex flex-col space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyInfo.color}`}>
            {difficultyInfo.name}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
            {getCategoryName(guide.category)}
          </span>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
        {guide.excerpt}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{guide.estimatedTime} นาที</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-3 h-3 mr-1" />
            <span>{guide.steps.length} ขั้นตอน</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      {guide.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {guide.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
          {guide.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
              +{guide.tags.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-[#EC1B2E] text-sm font-medium">อ่านคู่มือ</span>
        <ArrowRight className="w-4 h-4 text-[#EC1B2E]" />
      </div>
    </div>
  )
}
