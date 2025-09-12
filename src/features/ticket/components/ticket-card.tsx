import { Calendar, MessageCircle, User } from 'lucide-react'
import type { Ticket } from '../types'
import { mockTicketPriorities, mockTicketStatuses } from '../data/mock-data'

interface TicketCardProps {
  ticket: Ticket
  onViewDetail: (ticketId: string) => void
}

export function TicketCard({ ticket, onViewDetail }: TicketCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getPriorityInfo = (priority: string) => {
    return mockTicketPriorities.find(p => p.id === priority) || mockTicketPriorities[0]
  }

  const getStatusInfo = (status: string) => {
    return mockTicketStatuses.find(s => s.id === status) || mockTicketStatuses[0]
  }

  const priorityInfo = getPriorityInfo(ticket.priority)
  const statusInfo = getStatusInfo(ticket.status)

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 cursor-pointer transition-all duration-200"
      onClick={() => onViewDetail(ticket.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 flex-1 mr-2">
          {ticket.title}
        </h3>
        <div className="flex flex-col space-y-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.color}`}>
            {priorityInfo.name}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
            {statusInfo.name}
          </span>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
        {ticket.description}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{formatDate(ticket.createdAt)}</span>
          </div>
          {ticket.assignedTo && (
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              <span>{ticket.assignedTo}</span>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <MessageCircle className="w-3 h-3 mr-1" />
          <span>{ticket.responses.length} ตอบกลับ</span>
        </div>
      </div>
    </div>
  )
}
