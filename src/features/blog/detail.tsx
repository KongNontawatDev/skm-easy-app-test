import { MobileLayout, MobileHeader, MobileContent, MobileButton, BottomNavigation } from '@/components/mobile'
import { Calendar, Clock, Eye, Heart, User, ArrowLeft, Share2, Bookmark } from 'lucide-react'
import { useParams, useRouter } from '@tanstack/react-router'
import { mockBlogPosts } from './data/mock-data'

export function BlogDetail() {
  const router = useRouter()
  const { id } = useParams({ from: '/blog/$id' })
  const post = mockBlogPosts.find(p => p.id === id)

  if (!post) {
    return (
      <MobileLayout>
        <MobileHeader title="ไม่พบบทความ" />
        <MobileContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📰</span>
            </div>
            <p className="text-gray-500">ไม่พบบทความที่คุณต้องการ</p>
          </div>
        </MobileContent>
        <BottomNavigation currentPath="/blog" />
      </MobileLayout>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'news':
        return 'bg-blue-100 text-blue-700'
      case 'tips':
        return 'bg-green-100 text-green-700'
      case 'promotion':
        return 'bg-red-100 text-red-700'
      case 'announcement':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <MobileLayout>
      <MobileHeader title="รายละเอียดบทความ" showBackButton />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Image */}
          <div className="relative h-64 bg-gray-100 rounded-2xl overflow-hidden">
            {post.imageUrl && (
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                {post.category === 'all' ? 'ทั่วไป' : 
                 post.category === 'news' ? 'ข่าวสาร' :
                 post.category === 'tips' ? 'เคล็ดลับ' :
                 post.category === 'promotion' ? 'โปรโมชั่น' :
                 post.category === 'announcement' ? 'ประกาศ' : 'อื่นๆ'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.readTime} นาที</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{post.views.toLocaleString()} ครั้ง</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>{post.likes} ถูกใจ</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {post.content}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <MobileButton
              variant="outline"
              className="flex-1 h-12 flex items-center justify-center"
              onClick={() => router.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับ
            </MobileButton>
            
            <MobileButton
              variant="outline"
              className="flex-1 h-12 flex items-center justify-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              แชร์
            </MobileButton>
            
            <MobileButton
              variant="outline"
              className="flex-1 h-12 flex items-center justify-center"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              บันทึก
            </MobileButton>
          </div>
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/blog" />
    </MobileLayout>
  )
}
