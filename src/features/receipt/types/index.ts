export interface Receipt {
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
    bankAccount?: string
    status: PaymentStatus
  }
  items: ReceiptItem[]
  createdAt: string
  updatedAt: string
}

export type PaymentStatus = 'completed' | 'pending' | 'failed' | 'refunded'

export interface ReceiptItem {
  id: string
  description: string
  amount: number
  period: string
}
