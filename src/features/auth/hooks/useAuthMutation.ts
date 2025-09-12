import { useApiMutation } from '@/hooks/useApiMutation'
import { AuthApiService } from '../api/auth-api'

// Sign in mutation
export function useSignIn() {
  return useApiMutation<any, { nationalId: string; phoneNumber: string; captchaToken: string }>(
    (data) => AuthApiService.signIn(data),
    {
      onSuccess: (data) => {
        // Store tokens in localStorage
        if (data.data.tokens) {
          localStorage.setItem('accessToken', data.data.tokens.accessToken)
          localStorage.setItem('refreshToken', data.data.tokens.refreshToken)
        }
        console.log('Sign in successful')
      },
      onError: (error) => {
        console.error('Sign in failed:', error.message)
      }
    }
  )
}

// Sign up mutation
export function useSignUp() {
  return useApiMutation<any, {
    name: string
    email: string
    phone: string
    password: string
    confirmPassword: string
    captchaToken: string
  }>(
    (data) => AuthApiService.signUp(data),
    {
      onSuccess: (data) => {
        // Store tokens in localStorage
        if (data.data.tokens) {
          localStorage.setItem('accessToken', data.data.tokens.accessToken)
          localStorage.setItem('refreshToken', data.data.tokens.refreshToken)
        }
        console.log('Sign up successful')
      },
      onError: (error) => {
        console.error('Sign up failed:', error.message)
      }
    }
  )
}

// Sign out mutation
export function useSignOut() {
  return useApiMutation<any, void>(
    () => AuthApiService.signOut(),
    {
      onSuccess: () => {
        // Clear tokens from localStorage
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        console.log('Sign out successful')
      },
      onError: (error) => {
        console.error('Sign out failed:', error.message)
      }
    }
  )
}

// Forgot password mutation
export function useForgotPassword() {
  return useApiMutation<any, string>(
    (email) => AuthApiService.forgotPassword(email),
    {
      onSuccess: () => {
        console.log('Password reset email sent')
      },
      onError: (error) => {
        console.error('Failed to send password reset email:', error.message)
      }
    }
  )
}

// Reset password mutation
export function useResetPassword() {
  return useApiMutation<any, { token: string; password: string; confirmPassword: string }>(
    (data) => AuthApiService.resetPassword(data),
    {
      onSuccess: () => {
        console.log('Password reset successful')
      },
      onError: (error) => {
        console.error('Password reset failed:', error.message)
      }
    }
  )
}

// Verify email mutation
export function useVerifyEmail() {
  return useApiMutation<any, string>(
    (token) => AuthApiService.verifyEmail(token),
    {
      onSuccess: () => {
        console.log('Email verified successfully')
      },
      onError: (error) => {
        console.error('Email verification failed:', error.message)
      }
    }
  )
}

// Resend verification email mutation
export function useResendVerificationEmail() {
  return useApiMutation<any, string>(
    (email) => AuthApiService.resendVerificationEmail(email),
    {
      onSuccess: () => {
        console.log('Verification email sent')
      },
      onError: (error) => {
        console.error('Failed to send verification email:', error.message)
      }
    }
  )
}
