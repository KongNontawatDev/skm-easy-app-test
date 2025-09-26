import type { RefinanceVehicle, CreditCheckResult } from '../types'

// Mock data for refinance vehicles
export const mockRefinanceVehicles: RefinanceVehicle[] = [
  {
    id: '1',
    brand: 'Honda',
    model: 'Wave 125',
    year: 2020,
    color: 'แดง',
    plateNumber: 'กข-1234 กรุงเทพฯ',
    imageUrl: 'https://autostation.com/wp-content/uploads/2024/11/honda_wave_125i_05.jpg',
    condition: 'excellent',
    estimatedValue: 45000,
    refinanceAmount: 30000,
    monthlyPayment: 2500,
    interestRate: 2.5,
    termMonths: 12,
    eligibility: {
      isEligible: true,
      score: 85,
      reasons: ['รถอายุไม่เกิน 5 ปี', 'สภาพรถดี', 'เอกสารครบถ้วน'],
      requirements: ['บัตรประชาชน', 'ใบขับขี่', 'ทะเบียนรถ', 'ประกันภัย']
    },
    requirements: ['บัตรประชาชน', 'ใบขับขี่', 'ทะเบียนรถ', 'ประกันภัย']
  },

  {
    id: '3',
    brand: 'Honda',
    model: 'PCX 150',
    year: 2021,
    color: 'ดำ',
    plateNumber: 'จฉ-9012 กรุงเทพฯ',
    imageUrl: 'https://s359.kapook.com/rq/600/auto/10/pagebuilder/b7d424f7-19f3-4ca6-8704-ff135c1328db.jpg',
    condition: 'excellent',
    estimatedValue: 65000,
    refinanceAmount: 45000,
    monthlyPayment: 3800,
    interestRate: 2.3,
    termMonths: 12,
    eligibility: {
      isEligible: true,
      score: 92,
      reasons: ['รถใหม่', 'สภาพรถดีมาก', 'เอกสารครบถ้วน', 'ประวัติการผ่อนดี'],
      requirements: ['บัตรประชาชน', 'ใบขับขี่', 'ทะเบียนรถ', 'ประกันภัย', 'ใบเสร็จการผ่อน']
    },
    requirements: ['บัตรประชาชน', 'ใบขับขี่', 'ทะเบียนรถ', 'ประกันภัย', 'ใบเสร็จการผ่อน']
  },


]

// Mock data for credit check results
export const mockCreditCheckResults: CreditCheckResult[] = [
  {
    id: '1',
    customerName: 'สมชาย ใจดี',
    phone: '081-234-5678',
    creditScore: 750,
    eligibility: true,
    approvedAmount: 50000,
    interestRate: 2.5,
    monthlyPayment: 4200,
    termMonths: 12,
    status: 'approved',
    submittedAt: '2024-01-15T10:30:00Z',
    processedAt: '2024-01-15T14:30:00Z',
    requirements: ['บัตรประชาชน', 'ใบขับขี่', 'หลักฐานรายได้', 'บัญชีธนาคาร'],
    notes: 'ลูกค้าผ่านการตรวจสอบเครดิต สามารถอนุมัติได้'
  },
  {
    id: '2',
    customerName: 'สมหญิง รักดี',
    phone: '082-345-6789',
    creditScore: 680,
    eligibility: true,
    approvedAmount: 35000,
    interestRate: 3.0,
    monthlyPayment: 3000,
    termMonths: 12,
    status: 'approved',
    submittedAt: '2024-01-14T09:15:00Z',
    processedAt: '2024-01-14T11:45:00Z',
    requirements: ['บัตรประชาชน', 'ใบขับขี่', 'หลักฐานรายได้', 'บัญชีธนาคาร'],
    notes: 'ลูกค้าผ่านการตรวจสอบเครดิต สามารถอนุมัติได้'
  },
  {
    id: '3',
    customerName: 'วิชัย เก่งมาก',
    phone: '083-456-7890',
    creditScore: 520,
    eligibility: false,
    approvedAmount: 0,
    interestRate: 0,
    monthlyPayment: 0,
    termMonths: 0,
    status: 'rejected',
    submittedAt: '2024-01-13T16:20:00Z',
    processedAt: '2024-01-13T18:30:00Z',
    requirements: ['บัตรประชาชน', 'ใบขับขี่', 'หลักฐานรายได้', 'บัญชีธนาคาร'],
    notes: 'เครดิตสกอร์ต่ำเกินไป ต้องเพิ่มหลักฐานรายได้'
  },
  {
    id: '4',
    customerName: 'นิดา สวยงาม',
    phone: '084-567-8901',
    creditScore: 720,
    eligibility: true,
    approvedAmount: 45000,
    interestRate: 2.8,
    monthlyPayment: 3800,
    termMonths: 12,
    status: 'pending',
    submittedAt: '2024-01-16T08:45:00Z',
    requirements: ['บัตรประชาชน', 'ใบขับขี่', 'หลักฐานรายได้', 'บัญชีธนาคาร'],
    notes: 'รอการตรวจสอบเอกสารเพิ่มเติม'
  }
]

// Mock data for occupation options
export const mockOccupations = [
  'พนักงานบริษัท',
  'ข้าราชการ',
  'เจ้าของธุรกิจ',
  'ฟรีแลนซ์',
  'เกษตรกร',
  'ครู/อาจารย์',
  'แพทย์/พยาบาล',
  'วิศวกร',
  'ทนายความ',
  'นักบัญชี',
  'อื่นๆ'
]

// Mock data for provinces
export const mockProvinces = [
  'กรุงเทพมหานคร',
  'เชียงใหม่',
  'เชียงราย',
  'นครราชสีมา',
  'ขอนแก่น',
  'อุดรธานี',
  'อุบลราชธานี',
  'สงขลา',
  'ภูเก็ต',
  'พัทยา',
  'อื่นๆ'
]
