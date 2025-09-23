import { 
  MobileLayout, 
  MobileContent, 
  BottomNavigation,
} from '@/components/mobile'
import { ContractCardsCarousel } from './components/contract-cards-carousel'
import { QuickMenuGrid } from './components/quick-menu-grid'
import { PromotionBanner } from './components/promotion-banner'
import { useUploadContractImage } from './hooks/useMutation'
import { mockHomeData } from './data/mock-data'

export function Home() {
  const uploadImageMutation = useUploadContractImage()

  const handleImageUpload = (contractId: string, file: File) => {
    uploadImageMutation.mutate({ contractId, file })
  }

  return (
    <MobileLayout>
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[#EC1B2E] to-[#C20010] rounded-2xl p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">สวัสดี! ผู้ใช้ทดสอบ 👋</h1>
            <p className="text-white/90 text-sm">ยินดีต้อนรับสู่ระบบจัดการค่างวดรถของสหกิจ มอเตอร์ไบค์</p>
          </div>

          {/* Contract Cards Carousel */}
          <ContractCardsCarousel
            contracts={mockHomeData.contracts}
            onImageUpload={handleImageUpload}
          />

          {/* Quick Menu */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">เมนูด่วน</h2>
            <QuickMenuGrid items={mockHomeData.quickMenu} />
          </div>

          {/* Promotion Banner */}
          <PromotionBanner promotions={mockHomeData.promotions} />
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/" />
    </MobileLayout>
  )
}