export interface ContactInfo {
  id: string
  type: ContactType
  title: string
  value: string
  description?: string
  icon: string
  isActive: boolean
}

export type ContactType = 'phone' | 'email' | 'address' | 'hours' | 'social'

export interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  category: string
}
