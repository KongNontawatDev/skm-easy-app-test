import { useState } from 'react'
import { MobileLayout, MobileHeader, MobileContent, BottomNavigation } from '@/components/mobile'
import { InvoiceCard } from './components/invoice-card'
import { mockInvoices } from './data/mock-data'
import { useRouter, useSearch } from '@tanstack/react-router'
import { Search, Filter, Download } from 'lucide-react'

interface InvoiceSearchParams {
  contractId?: string
}

export function Invoice() {
  const router = useRouter()
  const search = useSearch({ from: '/invoice/' }) as InvoiceSearchParams
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Get contractId from URL parameters
  const contractId = search.contractId

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesContract = !contractId || invoice.contractNumber === contractId
    const matchesSearch = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vehicleInfo.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.vehicleInfo.model.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    
    return matchesContract && matchesSearch && matchesStatus
  })

  const handleViewDetail = (invoiceId: string) => {
    router.navigate({ to: '/invoice/$id', params: { id: invoiceId } })
  }

  const statusOptions = [
    { value: 'all', label: 'ทั้งหมด' },
    { value: 'paid', label: 'ชำระแล้ว' },
    { value: 'sent', label: 'ส่งแล้ว' },
    { value: 'overdue', label: 'เกินกำหนด' },
    { value: 'draft', label: 'ร่าง' },
  ]

  // If no contractId provided, redirect to installment page
  if (!contractId) {
    router.navigate({ to: '/installment' })
    return null
  }

  return (
    <MobileLayout>
      <MobileHeader 
        title="ใบแจ้งหนี้" 
        showBackButton={true}
        onBackClick={() => router.navigate({ to: '/installment' })}
      />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="ค้นหาใบแจ้งหนี้, สัญญา, หรือรถยนต์"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EC1B2E] focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#EC1B2E] focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Invoices List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                ใบแจ้งหนี้สัญญา {contractId} ({filteredInvoices.length})
              </h3>
              <button className="flex items-center text-[#EC1B2E] text-sm font-medium">
                <Download className="w-4 h-4 mr-1" />
                ดาวน์โหลดทั้งหมด
              </button>
            </div>
            
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map(invoice => (
                <InvoiceCard
                  key={invoice.id}
                  invoice={invoice}
                  onViewDetail={handleViewDetail}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 py-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
                <p className="text-lg font-medium mb-2">
                  {searchTerm || statusFilter !== 'all' ? 'ไม่พบใบแจ้งหนี้' : 'ยังไม่มีใบแจ้งหนี้'}
                </p>
                <p className="text-sm">
                  {searchTerm || statusFilter !== 'all' ? 'ลองค้นหาด้วยคำอื่น' : 'ใบแจ้งหนี้จะแสดงที่นี่เมื่อมีการออกใบแจ้งหนี้'}
                </p>
              </div>
            )}
          </div>
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/invoice" />
    </MobileLayout>
  )
}
