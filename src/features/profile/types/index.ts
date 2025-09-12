// Profile page types
export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  dateOfBirth?: string
  address?: Address
  emergencyContact?: EmergencyContact
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
}

export interface Address {
  street: string
  city: string
  province: string
  postalCode: string
  country: string
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
  email?: string
}

export interface UserPreferences {
  language: string
  timezone: string
  notifications: NotificationSettings
  privacy: PrivacySettings
}

export interface NotificationSettings {
  email: boolean
  sms: boolean
  push: boolean
  marketing: boolean
  paymentReminders: boolean
  contractUpdates: boolean
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends'
  dataSharing: boolean
  analytics: boolean
}

export interface ProfileUpdateRequest {
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: string
  address?: Partial<Address>
  emergencyContact?: Partial<EmergencyContact>
  preferences?: Partial<UserPreferences>
}

export interface ChangeEmailRequest {
  newEmail: string
  currentPassword: string
}

export interface ChangePhoneRequest {
  newPhone: string
  verificationCode: string
}

export interface DeleteAccountRequest {
  password: string
  reason?: string
}
