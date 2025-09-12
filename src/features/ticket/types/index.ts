export interface Ticket {
  id: string
  title: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  createdAt: string
  updatedAt: string
  assignedTo?: string
  attachments: string[]
  responses: TicketResponse[]
}

export type TicketCategory = 'payment' | 'technical' | 'account' | 'general' | 'complaint'
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent'
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'

export interface TicketResponse {
  id: string
  ticketId: string
  author: string
  content: string
  isStaff: boolean
  createdAt: string
  attachments: string[]
}
