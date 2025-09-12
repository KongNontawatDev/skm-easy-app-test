import { MobileLayout, MobileHeader, MobileContent, MobileButton, BottomNavigation } from '@/components/mobile'
import { Clock, BookOpen, ArrowLeft, CheckCircle } from 'lucide-react'
import { useParams, useRouter } from '@tanstack/react-router'
import { mockGuides, mockGuideDifficulties } from './data/mock-data'

export function GuideDetail() {
  const router = useRouter()
  const { id } = useParams({ from: '/guide/$id' })
  const guide = mockGuides.find(g => g.id === id)

  if (!guide) {
    return (
      <MobileLayout>
        <MobileHeader title="ไม่พบคู่มือ" />
        <MobileContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📖</span>
            </div>
            <p className="text-gray-500">ไม่พบคู่มือที่คุณต้องการ</p>
          </div>
        </MobileContent>
        <BottomNavigation currentPath="/guide" />
      </MobileLayout>
    )
  }

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
    <MobileLayout>
      <MobileHeader title="รายละเอียดคู่มือ" showBackButton />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-2xl p-4">
            <h1 className="text-xl font-bold text-gray-900 mb-3">
              {guide.title}
            </h1>
            
            <p className="text-gray-600 text-sm mb-4">
              {guide.excerpt}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{guide.estimatedTime} นาที</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>{guide.steps.length} ขั้นตอน</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyInfo.color}`}>
                  {difficultyInfo.name}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {getCategoryName(guide.category)}
                </span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">ขั้นตอนการทำ</h2>
            {guide.steps.map((step) => (
              <div key={step.id} className="bg-white rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#EC1B2E] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.order}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                    {step.imageUrl && (
                      <div className="mt-3">
                        <img 
                          src={step.imageUrl} 
                          alt={step.title}
                          className="w-full h-48 object-cover rounded-xl"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          {guide.tags.length > 0 && (
            <div className="bg-white rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">แท็ก</h3>
              <div className="flex flex-wrap gap-2">
                {guide.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <MobileButton
              variant="outline"
              className="flex-1 h-12 flex items-center justify-center"
              onClick={() => router.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับ
            </MobileButton>
            
            <MobileButton
              className="flex-1 h-12 flex items-center justify-center"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              ทำเสร็จแล้ว
            </MobileButton>
          </div>
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/guide" />
    </MobileLayout>
  )
}
