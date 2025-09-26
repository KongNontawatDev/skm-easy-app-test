import type { ContractCard, QuickMenuItem, PromotionAd, HomeData, ContractProgress } from '../types'
import { CONTRACTS_DATA } from '@/lib/mock-data'

// Mock data for contract cards carousel - ใช้ข้อมูลจากข้อมูลกลาง
export const mockContractCards: ContractCard[] = CONTRACTS_DATA.map(contract => ({
  id: contract.id,
  contractNumber: contract.contractNumber,
  vehicleInfo: {
    brand: contract.vehicleInfo.brand,
    model: contract.vehicleInfo.model,
    year: contract.vehicleInfo.year,
    color: contract.vehicleInfo.color,
    imageUrl: contract.vehicleInfo.imageUrl,
  },
  remainingAmount: contract.financialInfo.remainingAmount,
  nextPaymentDate: contract.nextPaymentDate,
  status: contract.contractInfo.status,
  progress: contract.progress,
}))

// Progress data for each contract - ใช้ข้อมูลจากข้อมูลกลาง
export const mockContractProgressData = CONTRACTS_DATA.reduce((acc, contract) => {
  const paidAmount = contract.financialInfo.totalAmount - contract.financialInfo.remainingAmount
  acc[contract.id] = {
    totalAmount: contract.financialInfo.totalAmount,
    paidAmount: paidAmount,
    nextDueDate: contract.nextPaymentDate,
    installmentIndex: Math.floor(paidAmount / contract.financialInfo.monthlyPayment),
    totalInstallments: contract.financialInfo.term,
  }
  return acc
}, {} as Record<string, ContractProgress>)

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
    title: 'รีไฟแนน',
    icon: '💰',
    path: '/refinance-check',
    color: 'bg-green-50 text-green-600',
  },
  {
    id: '3',
    title: 'เช็คเครดิต',
    icon: '📊',
    path: '/credit-check',
    color: 'bg-blue-50 text-blue-600',
  },
 
  {
    id: '5',
    title: 'ติดต่อร้าน',
    icon: '📞',
    path: '/contact',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    id: '6',
    title: 'ข่าวสาร',
    icon: '📋',
    path: '/blog',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    id: '7',
    title: 'คูปอง',
    icon: '🎫',
    path: '/coupon',
    color: 'bg-yellow-50 text-yellow-600',
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
