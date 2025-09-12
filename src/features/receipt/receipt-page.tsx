import { useState } from 'react'
import { MobileLayout, MobileHeader, MobileContent, BottomNavigation } from '@/components/mobile'
import { ReceiptCard } from './components/receipt-card'
import { mockReceipts } from './data/mock-data'
import { useRouter } from '@tanstack/react-router'
import { Search, Download } from 'lucide-react'

export function Receipt() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')

  const filteredReceipts = mockReceipts.filter(receipt => {
    const matchesSearch = 
      receipt.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.vehicleInfo.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receipt.vehicleInfo.model.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || receipt.paymentInfo.status === statusFilter
    
    const matchesDate = (() => {
      if (dateFilter === 'all') return true
      const receiptDate = new Date(receipt.paymentInfo.paymentDate)
      const now = new Date()
      
      switch (dateFilter) {
        case 'today':
          return receiptDate.toDateString() === now.toDateString()
        case 'week': {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          return receiptDate >= weekAgo
        }
        case 'month': {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          return receiptDate >= monthAgo
        }
        case 'year': {
          const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
          return receiptDate >= yearAgo
        }
        default:
          return true
      }
    })()
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const handleViewDetail = (receiptId: string) => {
    router.navigate({ to: '/receipt/$id', params: { id: receiptId } })
  }

  const statusOptions = [
    { value: 'all', label: 'ทั้งหมด' },
    { value: 'completed', label: 'ชำระแล้ว' },
    { value: 'pending', label: 'รอชำระ' },
    { value: 'failed', label: 'ชำระไม่สำเร็จ' },
    { value: 'refunded', label: 'คืนเงิน' },
  ]

  const dateOptions = [
    { value: 'all', label: 'ทั้งหมด' },
    { value: 'today', label: 'วันนี้' },
    { value: 'week', label: 'สัปดาห์นี้' },
    { value: 'month', label: 'เดือนนี้' },
    { value: 'year', label: 'ปีนี้' },
  ]

  return (
    <MobileLayout>
      <MobileHeader title="ประวัติการชำระ/ใบเสร็จ" showMoreMenu={true} />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="ค้นหาใบเสร็จ, สัญญา, หรือรถยนต์"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EC1B2E] focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EC1B2E] focus:border-transparent text-sm"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EC1B2E] focus:border-transparent text-sm"
              >
                {dateOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Receipts List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                ใบเสร็จ ({filteredReceipts.length})
              </h3>
              <button className="flex items-center text-[#EC1B2E] text-sm font-medium">
                <Download className="w-4 h-4 mr-1" />
                ดาวน์โหลดทั้งหมด
              </button>
            </div>
            
            {filteredReceipts.length > 0 ? (
              filteredReceipts.map(receipt => (
                <ReceiptCard
                  key={receipt.id}
                  receipt={receipt}
                  onViewDetail={handleViewDetail}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧾</span>
                </div>
                <p className="text-lg font-medium mb-2">
                  {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' ? 'ไม่พบใบเสร็จ' : 'ยังไม่มีใบเสร็จ'}
                </p>
                <p className="text-sm">
                  {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' ? 'ลองค้นหาด้วยคำอื่น' : 'ใบเสร็จจะแสดงที่นี่เมื่อมีการชำระเงิน'}
                </p>
              </div>
            )}
          </div>
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/receipt" />
    </MobileLayout>
  )
}
