import { useState } from 'react'
import { MobileLayout, MobileHeader, MobileContent, BottomNavigation } from '@/components/mobile'
import { ContractCard } from './components/contract-card'
import { SearchInput } from '@/components/shared/search-input'
import { EmptyState } from '@/components/shared/empty-state'
import { useRouter } from '@tanstack/react-router'
import { useContracts } from './hooks'
import { Plus, Filter, FileText } from 'lucide-react'

export function Contract() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  
  // Use API hook instead of local search
  const { data: contractsResponse, isLoading, error } = useContracts({
    search: searchQuery,
    page: 1,
    limit: 20
  })
  
  const contracts = contractsResponse?.data || []

  const handleViewDetail = (contractId: string) => {
    router.navigate({ to: '/contract/$id', params: { id: contractId } })
  }

  return (
    <MobileLayout>
      <MobileHeader title="ข้อมูลสัญญา" showMoreMenu={true} />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="space-y-3">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="ค้นหาสัญญา, ยี่ห้อ, รุ่น, หรือทะเบียน"
            />
            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                <Filter className="w-4 h-4 mr-2" />
                กรอง
              </button>
              <button className="flex-1 flex items-center justify-center py-2 px-4 bg-[#EC1B2E] text-white rounded-lg text-sm font-medium">
                <Plus className="w-4 h-4 mr-2" />
                สัญญาใหม่
              </button>
            </div>
          </div>

          {/* Contracts List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                สัญญาของฉัน ({contracts.length})
              </h3>
            </div>
            
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <EmptyState
                icon={<FileText className="w-8 h-8 text-red-400" />}
                title="เกิดข้อผิดพลาด"
                description="ไม่สามารถโหลดข้อมูลสัญญาได้"
              />
            ) : contracts.length > 0 ? (
              contracts.map(contract => (
                <ContractCard
                  key={contract.id}
                  contract={contract}
                  onViewDetail={handleViewDetail}
                />
              ))
            ) : (
              <EmptyState
                icon={<FileText className="w-8 h-8 text-gray-400" />}
                title={searchQuery ? 'ไม่พบสัญญาที่ค้นหา' : 'ยังไม่มีสัญญา'}
                description={searchQuery ? 'ลองค้นหาด้วยคำอื่น' : 'เริ่มต้นการผ่อนชำระรถคันแรกของคุณ'}
              />
            )}
          </div>
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/contract" />
    </MobileLayout>
  )
}
