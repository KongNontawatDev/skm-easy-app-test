export interface Installment {
  id: string
  contractId: string
  contractNumber: string
  vehicleInfo: {
    brand: string
    model: string
    plateNumber: string
    imageUrl?: string
  }
  customerInfo: {
    name: string
    phone: string
    email: string
  }
  paymentInfo: {
    amount: number
    dueDate: string
    paymentMethod: string
    bankAccount: string
    qrCode: string
  }
  status: InstallmentStatus
  createdAt: string
  updatedAt: string
}

export type InstallmentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled'

export interface PaymentMethod {
  id: string
  name: string
  type: PaymentType
  accountNumber?: string
  isActive: boolean
}

export type PaymentType = 'bank_transfer' | 'credit_card' | 'qr_code' | 'cash'