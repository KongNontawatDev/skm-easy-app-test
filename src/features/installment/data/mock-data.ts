import type { Installment, PaymentMethod } from '../types'

export const mockInstallments: Installment[] = [
  {
    id: 'INST-001',
    contractId: 'CTR-001',
    contractNumber: 'CTR-2024-001',
    vehicleInfo: {
      brand: 'Honda',
      model: 'CBR150R',
      plateNumber: 'กข-1234 กรุงเทพ',
      imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    },
    customerInfo: {
      name: 'สมชาย ใจดี',
      phone: '081-234-5678',
      email: 'somchai@email.com',
    },
    paymentInfo: {
      amount: 8500,
      dueDate: '2024-02-15T00:00:00Z',
      paymentMethod: 'QR Code',
      bankAccount: '123-4-56789-0',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT-CTR-001-8500',
    },
    status: 'pending',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'INST-002',
    contractId: 'CTR-002',
    contractNumber: 'CTR-2024-002',
    vehicleInfo: {
      brand: 'Honda',
      model: 'PCX160',
      plateNumber: 'กข-5678 กรุงเทพ',
      imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    },
    customerInfo: {
      name: 'สมหญิง รักดี',
      phone: '082-345-6789',
      email: 'somying@email.com',
    },
    paymentInfo: {
      amount: 6500,
      dueDate: '2024-02-20T00:00:00Z',
      paymentMethod: 'โอนเงิน',
      bankAccount: '987-6-54321-0',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT-CTR-002-6500',
    },
    status: 'pending',
    createdAt: '2024-01-20T09:30:00Z',
    updatedAt: '2024-01-20T09:30:00Z',
  },
  {
    id: 'INST-003',
    contractId: 'CTR-003',
    contractNumber: 'CTR-2023-015',
    vehicleInfo: {
      brand: 'Honda',
      model: 'Wave 125i',
      plateNumber: 'กข-9999 กรุงเทพ',
      imageUrl: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    },
    customerInfo: {
      name: 'วิชัย เก่งมาก',
      phone: '083-456-7890',
      email: 'wichai@email.com',
    },
    paymentInfo: {
      amount: 3500,
      dueDate: '2024-02-10T00:00:00Z',
      paymentMethod: 'QR Code',
      bankAccount: '456-7-89012-3',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT-CTR-003-3500',
    },
    status: 'overdue',
    createdAt: '2024-01-10T14:00:00Z',
    updatedAt: '2024-01-10T14:00:00Z',
  },
]

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'PM-001',
    name: 'ธนาคารกสิกรไทย',
    type: 'bank_transfer',
    accountNumber: '123-4-56789-0',
    isActive: true,
  },
  {
    id: 'PM-002',
    name: 'ธนาคารกรุงเทพ',
    type: 'bank_transfer',
    accountNumber: '987-6-54321-0',
    isActive: true,
  },
  {
    id: 'PM-003',
    name: 'บัตรเครดิต',
    type: 'credit_card',
    isActive: true,
  },
  {
    id: 'PM-004',
    name: 'QR Code',
    type: 'qr_code',
    isActive: true,
  },
]
