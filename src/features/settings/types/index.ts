// Settings page types
export interface AppSettings {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  currency: string
  dateFormat: string
  timeFormat: '12h' | '24h'
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
  biometricEnabled: boolean
  sessionTimeout: number
  loginNotifications: boolean
  passwordExpiry: number
  allowedDevices: Device[]
}

export interface Device {
  id: string
  name: string
  type: 'mobile' | 'desktop' | 'tablet'
  lastActive: string
  location: string
  isCurrent: boolean
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends'
  dataSharing: boolean
  analytics: boolean
  marketing: boolean
  locationTracking: boolean
  crashReporting: boolean
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  types: NotificationTypeSettings
  quietHours: QuietHours
}

export interface NotificationTypeSettings {
  payment_reminder: boolean
  payment_received: boolean
  payment_overdue: boolean
  contract_update: boolean
  promotion: boolean
  system: boolean
  security: boolean
  general: boolean
}

export interface QuietHours {
  enabled: boolean
  start: string
  end: string
  timezone: string
}

export interface AccountSettings {
  email: string
  phone: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  address?: Address
}

export interface Address {
  street: string
  city: string
  province: string
  postalCode: string
  country: string
}

export interface AppInfo {
  version: string
  buildNumber: string
  lastUpdated: string
  size: string
  platform: string
}

export interface SupportContact {
  email: string
  phone: string
  website: string
  address: string
  hours: string
}
