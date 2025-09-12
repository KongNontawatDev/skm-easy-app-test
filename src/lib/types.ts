export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: Record<string, string[]>
}

export interface ApiError {
  message: string
  code: string
  details?: Record<string, unknown>
}

export type Status = 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled'
export type Priority = 'low' | 'medium' | 'high' | 'urgent'
export type Theme = 'light' | 'dark' | 'system'

export interface User extends BaseEntity {
  name: string
  email: string
  phone: string
  avatar?: string
  role: 'user' | 'admin' | 'staff'
  isActive: boolean
  lastLoginAt?: string
}

export interface Vehicle extends BaseEntity {
  brand: string
  model: string
  year: number
  color: string
  plateNumber: string
  imageUrl?: string
  customImageUrl?: string
  vin?: string
  engineNumber?: string
}

export interface Customer extends BaseEntity {
  name: string
  email: string
  phone: string
  address: string
  taxId?: string
  dateOfBirth?: string
  gender?: 'male' | 'female' | 'other'
  occupation?: string
  monthlyIncome?: number
}

export interface FinancialInfo {
  totalAmount: number
  downPayment: number
  monthlyPayment: number
  interestRate: number
  termMonths: number
  remainingAmount: number
  paidAmount: number
  remainingMonths: number
}

export interface PaymentInfo {
  method: string
  bankAccount?: string
  reference?: string
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  paidAt?: string
  dueDate: string
  amount: number
}

export interface Document extends BaseEntity {
  name: string
  type: 'contract' | 'insurance' | 'registration' | 'invoice' | 'receipt' | 'other'
  url: string
  mimeType: string
  size: number
  uploadedBy: string
}

export interface Notification extends BaseEntity {
  title: string
  message: string
  type: 'payment' | 'promotion' | 'system' | 'reminder' | 'alert'
  priority: Priority
  isRead: boolean
  isImportant: boolean
  relatedId?: string
  relatedType?: 'contract' | 'invoice' | 'receipt' | 'installment' | 'promotion'
  actionUrl?: string
  actionText?: string
  readAt?: string
}

export interface SearchParams {
  query?: string
  filters?: Record<string, unknown>
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface FilterOption {
  id: string
  name: string
  value: unknown
  count?: number
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface TableColumn<T = unknown> {
  key: keyof T | string
  title: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: unknown, record: T) => React.ReactNode
  width?: string | number
  align?: 'left' | 'center' | 'right'
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date' | 'select' | 'textarea' | 'checkbox' | 'radio'
  required?: boolean
  placeholder?: string
  options?: SelectOption[]
  validation?: {
    min?: number
    max?: number
    pattern?: RegExp
    message?: string
  }
}

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

export interface MenuItem {
  id: string
  label: string
  icon?: React.ComponentType<Record<string, unknown>>
  href?: string
  children?: MenuItem[]
  badge?: string | number
  disabled?: boolean
  external?: boolean
}

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
  badge?: string | number
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
}

export interface ToastProps {
  id: string
  title?: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export interface LoadingState {
  isLoading: boolean
  error?: string | null
  data?: unknown
}

export interface PaginationState {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface SortState {
  field: string
  order: 'asc' | 'desc'
}

export interface FilterState {
  [key: string]: unknown
}
