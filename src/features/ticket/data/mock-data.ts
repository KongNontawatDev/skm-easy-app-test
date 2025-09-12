import type { Ticket, TicketCategory, TicketPriority, TicketStatus } from '../types'

export const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'ไม่สามารถชำระค่างวดรถ Honda ผ่านแอปได้',
    description: 'เมื่อกดปุ่มชำระเงินแล้วแอปค้าง ไม่มีการตอบสนอง',
    category: 'payment',
    priority: 'high',
    status: 'in_progress',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
    assignedTo: 'ทีมเทคนิค Honda',
    attachments: [],
    responses: [
      {
        id: 'RES-001',
        ticketId: 'TKT-001',
        author: 'ทีมเทคนิค Honda',
        content: 'ขอบคุณที่แจ้งปัญหา เรากำลังตรวจสอบและจะแก้ไขให้เร็วที่สุด',
        isStaff: true,
        createdAt: '2024-01-15T11:00:00Z',
        attachments: []
      }
    ]
  },
  {
    id: 'TKT-002',
    title: 'ต้องการเปลี่ยนข้อมูลบัญชี Honda',
    description: 'ต้องการเปลี่ยนเบอร์โทรศัพท์และที่อยู่ในการติดต่อ',
    category: 'account',
    priority: 'medium',
    status: 'resolved',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    assignedTo: 'ทีมบริการลูกค้า Honda',
    attachments: [],
    responses: [
      {
        id: 'RES-002',
        ticketId: 'TKT-002',
        author: 'ทีมบริการลูกค้า Honda',
        content: 'ข้อมูลบัญชีของคุณได้รับการอัปเดตเรียบร้อยแล้ว',
        isStaff: true,
        createdAt: '2024-01-12T16:45:00Z',
        attachments: []
      }
    ]
  },
  {
    id: 'TKT-003',
    title: 'แอปพลิเคชัน Honda Easy Payment เปิดไม่ได้',
    description: 'เมื่อเปิดแอปแล้วแอปปิดทันที ไม่ทราบสาเหตุ',
    category: 'technical',
    priority: 'urgent',
    status: 'open',
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-01-20T08:00:00Z',
    assignedTo: 'ทีมเทคนิค Honda',
    attachments: [],
    responses: []
  }
]

export const mockTicketCategories: { id: TicketCategory; name: string }[] = [
  { id: 'payment', name: 'การชำระเงิน' },
  { id: 'technical', name: 'เทคนิค' },
  { id: 'account', name: 'บัญชี' },
  { id: 'general', name: 'ทั่วไป' },
  { id: 'complaint', name: 'ร้องเรียน' },
]

export const mockTicketPriorities: { id: TicketPriority; name: string; color: string }[] = [
  { id: 'low', name: 'ต่ำ', color: 'bg-gray-100 text-gray-700' },
  { id: 'medium', name: 'ปานกลาง', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'high', name: 'สูง', color: 'bg-orange-100 text-orange-700' },
  { id: 'urgent', name: 'ด่วน', color: 'bg-red-100 text-red-700' },
]

export const mockTicketStatuses: { id: TicketStatus; name: string; color: string }[] = [
  { id: 'open', name: 'เปิด', color: 'bg-blue-100 text-blue-700' },
  { id: 'in_progress', name: 'กำลังดำเนินการ', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'resolved', name: 'แก้ไขแล้ว', color: 'bg-green-100 text-green-700' },
  { id: 'closed', name: 'ปิด', color: 'bg-gray-100 text-gray-700' },
]
