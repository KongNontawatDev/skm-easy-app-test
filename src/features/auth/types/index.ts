// Authentication types
export interface SignInRequest {
  nationalId: string
  phoneNumber: string
  captchaToken: string
  rememberMe?: boolean
}

export interface SignUpRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}

export interface User {
  id: string
  nationalId: string
  firstName: string
  lastName: string
  email?: string
  phone: string
  avatar?: string
  role: 'user' | 'admin'
  isEmailVerified?: boolean
  isPhoneVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface AuthError {
  message: string
  field?: string
  code: string
}
