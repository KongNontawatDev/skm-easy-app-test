export interface Invoice {
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
    status: PaymentStatus
  }
  items: InvoiceItem[]
  status: InvoiceStatus
  createdAt: string
  updatedAt: string
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
}
