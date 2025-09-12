import { MobileLayout, MobileHeader, MobileContent, BottomNavigation } from '@/components/mobile'
import { TicketCard } from './components/ticket-card'
import { mockTickets } from './data/mock-data'

export function TicketHistory() {
  const handleViewDetail = (_ticketId: string) => {
    // Navigate to ticket detail (if needed)
    // console.log('View ticket:', ticketId)
  }

  return (
    <MobileLayout>
      <MobileHeader title="ประวัติการแจ้ง" showBackButton />
      <MobileContent className="pb-20">
        <div className="space-y-4">
          {mockTickets.length > 0 ? (
            mockTickets.map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onViewDetail={handleViewDetail}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-10">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <p className="text-lg font-medium mb-2">ไม่มีประวัติการแจ้ง</p>
              <p className="text-sm">คุณยังไม่เคยแจ้งปัญหามาก่อน</p>
            </div>
          )}
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/ticket" />
    </MobileLayout>
  )
}
