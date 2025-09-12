export interface Contract {
  id: string
  contractNumber: string
  vehicleInfo: {
    brand: string
    model: string
    year: number
    color: string
    plateNumber: string
    imageUrl?: string
    customImageUrl?: string
  }
  customerInfo: {
    name: string
    phone: string
    email: string
    address: string
  }
  financialInfo: {
    totalAmount: number
    downPayment: number
    monthlyPayment: number
    interestRate: number
    termMonths: number
    remainingAmount: number
  }
  paymentInfo: {
    nextPaymentDate: string
    lastPaymentDate?: string
    paymentMethod: string
    bankAccount: string
  }
  status: ContractStatus
  createdAt: string
  updatedAt: string
  progress: number
}

export type ContractStatus = 'active' | 'completed' | 'defaulted' | 'cancelled'

export interface ContractDocument {
  id: string
  contractId: string
  name: string
  type: DocumentType
  url: string
  uploadedAt: string
}

export type DocumentType = 'contract' | 'insurance' | 'registration' | 'other'
