// ข้อมูลกลางสำหรับทั้งระบบ
export interface ContractData {
  id: string
  contractNumber: string
  vehicleInfo: {
    brand: string
    model: string
    year: number
    color: string
    plateNumber: string
    imageUrl: string
  }
  customerInfo: {
    name: string
    phone: string
    email: string
    address: string
    taxId: string
  }
  financialInfo: {
    totalAmount: number
    downPayment: number
    loanAmount: number
    monthlyPayment: number
    interestRate: number
    remainingAmount: number
    term: number
  }
  contractInfo: {
    startDate: string
    endDate: string
    term: number
    status: 'active' | 'overdue' | 'completed'
  }
  progress: number
  nextPaymentDate: string
  createdAt: string
}

export interface PaymentData {
  id: string
  contractNo: string
  installmentNo: number
  amount: number
  dueDate: string
  status: 'pending' | 'paid' | 'overdue'
}

export interface InvoiceData {
  id: string
  invoiceNumber: string
  contractId: string
  contractNumber: string
  customerInfo: {
    name: string
    address: string
    taxId: string
  }
  vehicleInfo: {
    brand: string
    model: string
    plateNumber: string
  }
  billingInfo: {
    issueDate: string
    dueDate: string
    paymentDate?: string
    amount: number
    vat: number
    totalAmount: number
  }
  paymentInfo: {
    method: string
    reference: string
    status: 'paid' | 'pending' | 'sent'
  }
  items: Array<{
    id: string
    description: string
    quantity: number
    unitPrice: number
    amount: number
  }>
  status: 'paid' | 'sent' | 'pending'
  createdAt: string
  updatedAt: string
}

export interface ReceiptData {
  id: string
  receiptNumber: string
  invoiceId: string
  contractId: string
  contractNumber: string
  customerInfo: {
    name: string
    address: string
    taxId: string
  }
  vehicleInfo: {
    brand: string
    model: string
    plateNumber: string
  }
  paymentInfo: {
    paymentDate: string
    amount: number
    method: string
    reference: string
    bankAccount: string
    status: 'completed' | 'pending' | 'failed'
  }
  items: Array<{
    id: string
    description: string
    amount: number
    period: string
  }>
  createdAt: string
  updatedAt: string
}

// ข้อมูลสัญญาหลัก
export const CONTRACTS_DATA: ContractData[] = [
  {
    id: 'CT-2024-001',
    contractNumber: 'CT-2024-001',
    vehicleInfo: {
      brand: 'Honda',
      model: 'CBR150R',
      year: 2023,
      color: 'แดง',
      plateNumber: 'กข-1234',
      imageUrl: 'https://s38.wheelsage.org/picture/h/honda/cbr1000rr_sp/honda_cbr1000rr_sp_8.jpeg'
    },
    customerInfo: {
      name: 'สมชาย ใจดี',
      phone: '081-234-5678',
      email: 'somchai@email.com',
      address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110',
      taxId: '1234567890123'
    },
    financialInfo: {
      totalAmount: 350000,
      downPayment: 50000,
      loanAmount: 300000,
      monthlyPayment: 15000,
      interestRate: 2.5,
      remainingAmount: 180000,
      term: 24
    },
    contractInfo: {
      startDate: '2023-06-01',
      endDate: '2025-05-31',
      term: 24,
      status: 'active'
    },
    progress: 65,
    nextPaymentDate: '2024-02-15',
    createdAt: '2023-06-01T00:00:00Z'
  },
  {
    id: 'CT-2024-002',
    contractNumber: 'CT-2024-002',
    vehicleInfo: {
      brand: 'Honda',
      model: 'PCX160',
      year: 2022,
      color: 'ดำ',
      plateNumber: 'กข-5678',
      imageUrl: 'https://img.motofiixthailand.com/asset/files/17345971816726901.webp'
    },
    customerInfo: {
      name: 'สมศรี รักดี',
      phone: '082-345-6789',
      email: 'somsri@email.com',
      address: '456 ถนนรัชดาภิเษก กรุงเทพฯ 10400',
      taxId: '9876543210987'
    },
    financialInfo: {
      totalAmount: 280000,
      downPayment: 40000,
      loanAmount: 240000,
      monthlyPayment: 12000,
      interestRate: 2.8,
      remainingAmount: 120000,
      term: 20
    },
    contractInfo: {
      startDate: '2022-08-01',
      endDate: '2024-07-31',
      term: 20,
      status: 'active'
    },
    progress: 80,
    nextPaymentDate: '2024-02-20',
    createdAt: '2022-08-01T00:00:00Z'
  },
  {
    id: 'CT-2024-003',
    contractNumber: 'CT-2024-003',
    vehicleInfo: {
      brand: 'Honda',
      model: 'Wave 125i',
      year: 2021,
      color: 'เงิน',
      plateNumber: 'กข-9012',
      imageUrl: 'https://s359.kapook.com/rq/600/auto/10/pagebuilder/d00209a5-b85a-4592-8cd5-3955b2d799c2.jpg'
    },
    customerInfo: {
      name: 'สมศักดิ์ ใจงาม',
      phone: '083-456-7890',
      email: 'somsak@email.com',
      address: '789 ถนนลาดพร้าว กรุงเทพฯ 10230',
      taxId: '4567891234567'
    },
    financialInfo: {
      totalAmount: 150000,
      downPayment: 25000,
      loanAmount: 125000,
      monthlyPayment: 6250,
      interestRate: 3.0,
      remainingAmount: 45000,
      term: 20
    },
    contractInfo: {
      startDate: '2021-12-01',
      endDate: '2023-11-30',
      term: 20,
      status: 'overdue'
    },
    progress: 90,
    nextPaymentDate: '2024-02-25',
    createdAt: '2021-12-01T00:00:00Z'
  }
]

// ข้อมูลการชำระเงิน
export const PAYMENTS_DATA: PaymentData[] = [
  // CT-2024-001
  {
    id: 'PAY-001-13',
    contractNo: 'CT-2024-001',
    installmentNo: 13,
    amount: 15000,
    dueDate: '2024-02-15',
    status: 'pending'
  },
  {
    id: 'PAY-001-12',
    contractNo: 'CT-2024-001',
    installmentNo: 12,
    amount: 15000,
    dueDate: '2024-01-15',
    status: 'paid'
  },
  {
    id: 'PAY-001-11',
    contractNo: 'CT-2024-001',
    installmentNo: 11,
    amount: 15000,
    dueDate: '2023-12-15',
    status: 'paid'
  },
  // CT-2024-002
  {
    id: 'PAY-002-5',
    contractNo: 'CT-2024-002',
    installmentNo: 5,
    amount: 12000,
    dueDate: '2024-02-20',
    status: 'pending'
  },
  {
    id: 'PAY-002-4',
    contractNo: 'CT-2024-002',
    installmentNo: 4,
    amount: 12000,
    dueDate: '2024-01-20',
    status: 'paid'
  },
  // CT-2024-003
  {
    id: 'PAY-003-19',
    contractNo: 'CT-2024-003',
    installmentNo: 19,
    amount: 6250,
    dueDate: '2024-02-25',
    status: 'overdue'
  },
  {
    id: 'PAY-003-18',
    contractNo: 'CT-2024-003',
    installmentNo: 18,
    amount: 6250,
    dueDate: '2024-01-25',
    status: 'paid'
  }
]

// ข้อมูลใบแจ้งหนี้
export const INVOICES_DATA: InvoiceData[] = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-2024-001',
    contractId: 'CT-2024-001',
    contractNumber: 'CT-2024-001',
    customerInfo: {
      name: 'สมชาย ใจดี',
      address: '123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110',
      taxId: '1234567890123'
    },
    vehicleInfo: {
      brand: 'Honda',
      model: 'CBR150R',
      plateNumber: 'กข-1234 กรุงเทพ'
    },
    billingInfo: {
      issueDate: '2024-01-15T00:00:00Z',
      dueDate: '2024-02-15T00:00:00Z',
      paymentDate: '2024-01-20T00:00:00Z',
      amount: 15000,
      vat: 1050,
      totalAmount: 16050
    },
    paymentInfo: {
      method: 'โอนเงิน',
      reference: 'TXN-20240120-001',
      status: 'paid'
    },
    items: [
      {
        id: 'ITEM-001',
        description: 'ค่างวดรถมอเตอร์ไซค์ Honda CBR150R งวดที่ 12',
        quantity: 1,
        unitPrice: 15000,
        amount: 15000
      }
    ],
    status: 'paid',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-2024-002',
    contractId: 'CT-2024-001',
    contractNumber: 'CT-2024-001',
    customerInfo: {
      name: 'สมชาย ใจดี',
      address: '123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110',
      taxId: '1234567890123'
    },
    vehicleInfo: {
      brand: 'Honda',
      model: 'CBR150R',
      plateNumber: 'กข-1234 กรุงเทพ'
    },
    billingInfo: {
      issueDate: '2024-02-15T00:00:00Z',
      dueDate: '2024-03-15T00:00:00Z',
      amount: 15000,
      vat: 1050,
      totalAmount: 16050
    },
    paymentInfo: {
      method: 'QR Code',
      reference: '',
      status: 'pending'
    },
    items: [
      {
        id: 'ITEM-002',
        description: 'ค่างวดรถมอเตอร์ไซค์ Honda CBR150R งวดที่ 13',
        quantity: 1,
        unitPrice: 15000,
        amount: 15000
      }
    ],
    status: 'sent',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 'INV-003',
    invoiceNumber: 'INV-2024-003',
    contractId: 'CT-2024-002',
    contractNumber: 'CT-2024-002',
    customerInfo: {
      name: 'สมศรี รักดี',
      address: '456 ถนนรัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10400',
      taxId: '9876543210987'
    },
    vehicleInfo: {
      brand: 'Honda',
      model: 'PCX160',
      plateNumber: 'กข-5678 กรุงเทพ'
    },
    billingInfo: {
      issueDate: '2024-01-20T00:00:00Z',
      dueDate: '2024-02-20T00:00:00Z',
      amount: 12000,
      vat: 840,
      totalAmount: 12840
    },
    paymentInfo: {
      method: 'โอนเงิน',
      reference: 'TXN-20240125-002',
      status: 'paid'
    },
    items: [
      {
        id: 'ITEM-003',
        description: 'ค่างวดรถมอเตอร์ไซค์ Honda PCX160 งวดที่ 4',
        quantity: 1,
        unitPrice: 12000,
        amount: 12000
      }
    ],
    status: 'paid',
    createdAt: '2024-01-20T09:30:00Z',
    updatedAt: '2024-01-25T11:15:00Z'
  },
  {
    id: 'INV-004',
    invoiceNumber: 'INV-2024-004',
    contractId: 'CT-2024-003',
    contractNumber: 'CT-2024-003',
    customerInfo: {
      name: 'สมศักดิ์ ใจงาม',
      address: '789 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10230',
      taxId: '4567891234567'
    },
    vehicleInfo: {
      brand: 'Honda',
      model: 'Wave 125i',
      plateNumber: 'กข-9012 กรุงเทพ'
    },
    billingInfo: {
      issueDate: '2024-01-10T00:00:00Z',
      dueDate: '2024-02-10T00:00:00Z',
      amount: 6250,
      vat: 437.5,
      totalAmount: 6687.5
    },
    paymentInfo: {
      method: 'โอนเงิน',
      reference: 'TXN-20240112-003',
      status: 'paid'
    },
    items: [
      {
        id: 'ITEM-004',
        description: 'ค่างวดรถมอเตอร์ไซค์ Honda Wave 125i งวดที่ 18',
        quantity: 1,
        unitPrice: 6250,
        amount: 6250
      }
    ],
    status: 'paid',
    createdAt: '2024-01-10T14:00:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  }
]

// ข้อมูลใบเสร็จ
export const RECEIPTS_DATA: ReceiptData[] = [
  {
    id: 'RCP-001',
    receiptNumber: 'RCP-2024-001',
    invoiceId: 'INV-001',
    contractId: 'CT-2024-001',
    contractNumber: 'CT-2024-001',
    customerInfo: {
      name: 'สมชาย ใจดี',
      address: '123 ถนนสุขุมวิท แขวงคลองตัน เขตวัฒนา กรุงเทพฯ 10110',
      taxId: '1234567890123'
    },
    vehicleInfo: {
      brand: 'Honda',
      model: 'CBR150R',
      plateNumber: 'กข-1234 กรุงเทพ'
    },
    paymentInfo: {
      paymentDate: '2024-01-20T14:30:00Z',
      amount: 16050,
      method: 'โอนเงิน',
      reference: 'TXN-20240120-001',
      bankAccount: '123-4-56789-0',
      status: 'completed'
    },
    items: [
      {
        id: 'ITEM-001',
        description: 'ค่างวดรถมอเตอร์ไซค์ Honda CBR150R งวดที่ 12',
        amount: 15000,
        period: 'มกราคม 2567'
      },
      {
        id: 'ITEM-002',
        description: 'ค่าธรรมเนียมการชำระ',
        amount: 50,
        period: 'มกราคม 2567'
      }
    ],
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: 'RCP-002',
    receiptNumber: 'RCP-2024-002',
    invoiceId: 'INV-003',
    contractId: 'CT-2024-002',
    contractNumber: 'CT-2024-002',
    customerInfo: {
      name: 'สมศรี รักดี',
      address: '456 ถนนรัชดาภิเษก แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10400',
      taxId: '9876543210987'
    },
    vehicleInfo: {
      brand: 'Honda',
      model: 'PCX160',
      plateNumber: 'กข-5678 กรุงเทพ'
    },
    paymentInfo: {
      paymentDate: '2024-01-25T11:15:00Z',
      amount: 12840,
      method: 'โอนเงิน',
      reference: 'TXN-20240125-002',
      bankAccount: '987-6-54321-0',
      status: 'completed'
    },
    items: [
      {
        id: 'ITEM-003',
        description: 'ค่างวดรถมอเตอร์ไซค์ Honda PCX160 งวดที่ 4',
        amount: 12000,
        period: 'มกราคม 2567'
      },
      {
        id: 'ITEM-004',
        description: 'ค่าธรรมเนียมการชำระ',
        amount: 40,
        period: 'มกราคม 2567'
      }
    ],
    createdAt: '2024-01-25T11:15:00Z',
    updatedAt: '2024-01-25T11:15:00Z'
  },
  {
    id: 'RCP-003',
    receiptNumber: 'RCP-2024-003',
    invoiceId: 'INV-004',
    contractId: 'CT-2024-003',
    contractNumber: 'CT-2024-003',
    customerInfo: {
      name: 'สมศักดิ์ ใจงาม',
      address: '789 ถนนลาดพร้าว แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10230',
      taxId: '4567891234567'
    },
    vehicleInfo: {
      brand: 'Honda',
      model: 'Wave 125i',
      plateNumber: 'กข-9012 กรุงเทพ'
    },
    paymentInfo: {
      paymentDate: '2024-01-12T16:45:00Z',
      amount: 6687.5,
      method: 'โอนเงิน',
      reference: 'TXN-20240112-003',
      bankAccount: '456-7-89012-3',
      status: 'completed'
    },
    items: [
      {
        id: 'ITEM-005',
        description: 'ค่างวดรถมอเตอร์ไซค์ Honda Wave 125i งวดที่ 18',
        amount: 6250,
        period: 'มกราคม 2567'
      },
      {
        id: 'ITEM-006',
        description: 'ค่าธรรมเนียมการชำระ',
        amount: 25,
        period: 'มกราคม 2567'
      }
    ],
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z'
  }
]

// Helper functions
export const getContractById = (id: string): ContractData | undefined => {
  return CONTRACTS_DATA.find(contract => contract.id === id || contract.contractNumber === id)
}

export const getPaymentsByContract = (contractId: string): PaymentData[] => {
  return PAYMENTS_DATA.filter(payment => payment.contractNo === contractId)
}

export const getInvoicesByContract = (contractId: string): InvoiceData[] => {
  return INVOICES_DATA.filter(invoice => invoice.contractId === contractId)
}

export const getReceiptsByContract = (contractId: string): ReceiptData[] => {
  return RECEIPTS_DATA.filter(receipt => receipt.contractId === contractId)
}

export const getPaymentById = (id: string): PaymentData | undefined => {
  return PAYMENTS_DATA.find(payment => payment.id === id)
}

export const getInvoiceById = (id: string): InvoiceData | undefined => {
  return INVOICES_DATA.find(invoice => invoice.id === id)
}

export const getReceiptById = (id: string): ReceiptData | undefined => {
  return RECEIPTS_DATA.find(receipt => receipt.id === id)
}
