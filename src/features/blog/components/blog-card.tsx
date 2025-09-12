import { Calendar, Clock, Eye, Heart, User } from 'lucide-react'
import type { BlogPost } from '../types'

interface BlogCardProps {
  post: BlogPost
  onViewDetail: (postId: string) => void
}

export function BlogCard({ post, onViewDetail }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'news':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
      case 'tips':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
      case 'promotion':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
      case 'announcement':
        return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
      onClick={() => onViewDetail(post.id)}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {post.imageUrl && (
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
            {post.category === 'all' ? 'ทั่วไป' : 
             post.category === 'news' ? 'ข่าวสาร' :
             post.category === 'tips' ? 'เคล็ดลับ' :
             post.category === 'promotion' ? 'โปรโมชั่น' :
             post.category === 'announcement' ? 'ประกาศ' : 'อื่นๆ'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{post.readTime} นาที</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              <span>{post.likes}</span>
            </div>
          </div>
          <span className="text-[#EC1B2E] font-medium">อ่านต่อ</span>
        </div>
      </div>
    </div>
  )
}
