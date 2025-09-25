import { useState } from 'react'
import { 
  MobileLayout, 
  MobileHeader, 
  MobileContent,
  BottomNavigation 
} from '@/components/mobile'
import { LoadingSpinner } from '@/components/shared'
import { EmptyState } from '@/components/shared'
import { RefinanceVehicleCard } from './components/refinance-vehicle-card'
import { useRefinanceVehicles, useRefinanceCheck } from './hooks'
import { mockRefinanceVehicles } from './data/mock-data'
import { Search, Filter, RefreshCw } from 'lucide-react'

export function RefinanceCheckPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCondition, setSelectedCondition] = useState<string>('all')
  
  const { data: vehicles, isLoading, error, refetch } = useRefinanceVehicles()
  const refinanceCheckMutation = useRefinanceCheck()

  // Use mock data for now
  const displayVehicles = mockRefinanceVehicles.filter(vehicle => {
    const matchesSearch = vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCondition = selectedCondition === 'all' || vehicle.condition === selectedCondition
    
    return matchesSearch && matchesCondition
  })

  const handleCheckEligibility = (vehicleId: string) => {
    refinanceCheckMutation.mutate({
      vehicleId,
      customerInfo: {
        name: 'ลูกค้าทดสอบ',
        phone: '081-234-5678',
        email: 'test@example.com'
      }
    })
  }

  const handleRefresh = () => {
    refetch()
  }

  if (isLoading) {
    return (
      <MobileLayout>
        <MobileHeader title="ตรวจสอบการรีไฟแนน" />
        <MobileContent className="flex items-center justify-center">
          <LoadingSpinner />
        </MobileContent>
      </MobileLayout>
    )
  }

  if (error) {
    return (
      <MobileLayout>
        <MobileHeader title="ตรวจสอบการรีไฟแนน" />
        <MobileContent className="flex items-center justify-center">
          <EmptyState
            icon="⚠️"
            title="เกิดข้อผิดพลาด"
            description="ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง"
            actionLabel="ลองใหม่"
            onAction={handleRefresh}
          />
        </MobileContent>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout>
      <MobileHeader title="ตรวจสอบการรีไฟแนน" />
      
      <MobileContent className="pb-20">
        <div className="space-y-4">
          {/* Header Info */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white">
            <h2 className="text-lg font-bold mb-2">รีไฟแนนรถมอเตอร์ไซค์</h2>
            <p className="text-blue-100 text-sm">
              ตรวจสอบว่ารถของคุณสามารถรีไฟแนนได้หรือไม่ พร้อมรับเงินสดทันที
            </p>
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="ค้นหารถตามยี่ห้อ รุ่น หรือทะเบียน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCondition('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCondition === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                ทั้งหมด
              </button>
              <button
                onClick={() => setSelectedCondition('excellent')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCondition === 'excellent'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                ดีเยี่ยม
              </button>
              <button
                onClick={() => setSelectedCondition('good')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCondition === 'good'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                ดี
              </button>
              <button
                onClick={() => setSelectedCondition('fair')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCondition === 'fair'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                พอใช้
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              พบรถที่สามารถรีไฟแนนได้ {displayVehicles.length} คัน
            </p>
            <button
              onClick={handleRefresh}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <RefreshCw className="w-4 h-4" />
              รีเฟรช
            </button>
          </div>

          {/* Vehicle List */}
          {displayVehicles.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="ไม่พบรถที่ตรงกับเงื่อนไข"
              description="ลองเปลี่ยนคำค้นหาหรือเงื่อนไขการกรองดู"
              actionLabel="ล้างการค้นหา"
              onAction={() => {
                setSearchTerm('')
                setSelectedCondition('all')
              }}
            />
          ) : (
            <div className="space-y-4">
              {displayVehicles.map((vehicle) => (
                <RefinanceVehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onCheckEligibility={handleCheckEligibility}
                />
              ))}
            </div>
          )}

          {/* Benefits Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 mt-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              ข้อดีของการรีไฟแนน
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  ได้เงินสดทันที ไม่ต้องรอ
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  ดอกเบี้ยต่ำกว่าตลาดทั่วไป
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  กระบวนการง่าย รวดเร็ว
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  ไม่ต้องขายรถ ยังใช้ได้ต่อ
                </span>
              </div>
            </div>
          </div>
        </div>
      </MobileContent>

      <BottomNavigation currentPath="/refinance-check" />
    </MobileLayout>
  )
}
