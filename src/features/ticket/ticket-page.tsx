import { useState } from 'react'
import { MobileLayout, MobileHeader, MobileContent, MobileButton, BottomNavigation } from '@/components/mobile'
import { TicketForm } from './components/ticket-form'
import { TicketCard } from './components/ticket-card'
import { mockTickets } from './data/mock-data'
import { Plus, History } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'

export function Ticket() {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)

  const handleViewDetail = (_ticketId: string) => {
    // Navigate to ticket detail (if needed)
    // console.log('View ticket:', ticketId)
  }

  const handleSubmitTicket = (_data: Record<string, unknown>) => {
    // console.log('Submit ticket:', data)
    setShowForm(false)
    // Here you would typically send the data to your API
  }

  return (
    <MobileLayout>
      <MobileHeader title="แจ้งปัญหา" showMoreMenu={true} />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <MobileButton
              onClick={() => setShowForm(true)}
              className="flex-1 flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              แจ้งปัญหาใหม่
            </MobileButton>
            <MobileButton
              variant="outline"
              onClick={() => router.navigate({ to: '/ticket/history' })}
              className="flex-1 flex items-center justify-center"
            >
              <History className="w-4 h-4 mr-2" />
              ประวัติ
            </MobileButton>
          </div>

          {/* Form or Ticket List */}
          {showForm ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">แจ้งปัญหาใหม่</h3>
              <TicketForm
                onSubmit={handleSubmitTicket}
                onCancel={() => setShowForm(false)}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">ปัญหาล่าสุด</h3>
              {mockTickets.length > 0 ? (
                mockTickets.map(ticket => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onViewDetail={handleViewDetail}
                  />
                ))
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎫</span>
                  </div>
                  <p className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">ยังไม่มีปัญหา</p>
                  <p className="text-sm">กดปุ่ม "แจ้งปัญหาใหม่" เพื่อเริ่มต้น</p>
                </div>
              )}
            </div>
          )}
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/ticket" />
    </MobileLayout>
  )
}
