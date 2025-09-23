import type { ContractCard, QuickMenuItem, PromotionAd, HomeData } from '../types'

export const mockContractCards: ContractCard[] = [
  {
    id: '1',
    contractNumber: 'CT-2024-001',
    vehicleInfo: {
      brand: 'Honda',
      model: 'CBR150R',
      year: 2023,
      color: 'แดง',
      imageUrl: 'https://s38.wheelsage.org/picture/h/honda/cbr1000rr_sp/honda_cbr1000rr_sp_8.jpeg',
    },
    remainingAmount: 180000,
    nextPaymentDate: '2024-02-15',
    status: 'active',
    progress: 65,
  },
  {
    id: '2',
    contractNumber: 'CT-2024-002',
    vehicleInfo: {
      brand: 'Honda',
      model: 'PCX160',
      year: 2022,
      color: 'ดำ',
      imageUrl: 'https://img.motofiixthailand.com/asset/files/17345971816726901.webp',
    },
    remainingAmount: 120000,
    nextPaymentDate: '2024-02-20',
    status: 'active',
    progress: 80,
  },
  {
    id: '3',
    contractNumber: 'CT-2024-003',
    vehicleInfo: {
      brand: 'Honda',
      model: 'Wave 125i',
      year: 2021,
      color: 'เงิน',
      imageUrl: 'https://s359.kapook.com/rq/600/auto/10/pagebuilder/d00209a5-b85a-4592-8cd5-3955b2d799c2.jpg',
    },
    remainingAmount: 45000,
    nextPaymentDate: '2024-02-25',
    status: 'overdue',
    progress: 90,
  },
]

// Progress data for each contract
export const mockContractProgressData = {
  '1': {
    totalAmount: 350000,
    paidAmount: 170000,
    nextDueDate: '2024-02-15',
    installmentIndex: 8,
    totalInstallments: 24,
  },
  '2': {
    totalAmount: 280000,
    paidAmount: 160000,
    nextDueDate: '2024-02-20',
    installmentIndex: 12,
    totalInstallments: 20,
  },
  '3': {
    totalAmount: 150000,
    paidAmount: 105000,
    nextDueDate: '2024-02-25',
    installmentIndex: 18,
    totalInstallments: 20,
  },
}

// Mock data for progress component
export const mockProgressData = {
  totalAmount: 350000,
  paidAmount: 200000,
  nextDueDate: '2024-02-15',
  installmentIndex: 8,
  totalInstallments: 24,
}

export const mockQuickMenuItems: QuickMenuItem[] = [
  {
    id: '1',
    title: 'โปรโมชั่น',
    icon: '🎉',
    path: '/promotion',
    color: 'bg-red-50 text-red-600',
  },
  {
    id: '2',
    title: 'คู่มือใช้งาน',
    icon: '📖',
    path: '/guide',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: '3',
    title: 'ติดต่อร้าน',
    icon: '📞',
    path: '/contact',
    color: 'bg-green-50 text-green-600',
  },
  {
    id: '4',
    title: 'ข่าวสาร',
    icon: '📋',
    path: '/blog',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    id: '5',
    title: 'คูปอง',
    icon: '🎫',
    path: '/coupon',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    id: '6',
    title: 'การตั้งค่า',
    icon: '⚙️',
    path: '/settings',
    color: 'bg-gray-50 text-gray-600',
  },
]

export const mockPromotionAds: PromotionAd[] = [
  {
    id: '1',
    title: 'ลดดอกเบี้ย 0.5%',
    description: 'สำหรับลูกค้า Honda ใหม่ที่สมัครในเดือนนี้',
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop',
    actionUrl: '/promotions/interest-reduction',
    isActive: true,
  },
  {
    id: '2',
    title: 'โปรโมชั่นพิเศษ Honda',
    description: 'ผ่อน 0% นาน 6 เดือน สำหรับรถ Honda',
    imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=200&fit=crop',
    actionUrl: '/promotions/special-offer',
    isActive: true,
  },
]

export const mockHomeData: HomeData = {
  welcome: {
    message: 'ยินดีต้อนรับสู่ Honda Easy Payment',
    userName: 'คุณสมชาย',
    lastLogin: '2024-01-15T10:30:00Z',
  },
  contracts: mockContractCards,
  quickMenu: mockQuickMenuItems,
  promotions: mockPromotionAds,
}
