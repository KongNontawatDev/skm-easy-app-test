import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import { useNavigate } from '@tanstack/react-router'
import type { 
  SignInRequest, 
  SignUpRequest, 
  AuthResponse, 
  ForgotPasswordRequest, 
  ResetPasswordRequest,
  ChangePasswordRequest 
} from '../types'

// Sign in mutation
export const useSignIn = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<AuthResponse, Error, SignInRequest>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/auth/signin', data)
      return response.data
    },
    onSuccess: (data) => {
      // Store token
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('refresh_token', data.refreshToken)
      
      // Update cache
      queryClient.setQueryData(['current-user'], data.user)
      queryClient.setQueryData(['auth-status'], true)
      
      // Redirect to home
      navigate({ to: '/' })
    },
  })
}

// Sign up mutation
export const useSignUp = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation<AuthResponse, Error, SignUpRequest>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/auth/signup', data)
      return response.data
    },
    onSuccess: (data) => {
      // Store token
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('refresh_token', data.refreshToken)
      
      // Update cache
      queryClient.setQueryData(['current-user'], data.user)
      queryClient.setQueryData(['auth-status'], true)
      
      // Redirect to home
      navigate({ to: '/' })
    },
  })
}

// Sign out mutation
export const useSignOut = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      await axiosInstance.post('/auth/signout')
    },
    onSuccess: () => {
      // Clear tokens
      localStorage.removeItem('auth_token')
      localStorage.removeItem('refresh_token')
      
      // Clear cache
      queryClient.clear()
      
      // Redirect to sign in
      navigate({ to: '/sign-in' })
    },
  })
}

// Forgot password mutation
export const useForgotPassword = () => {
  return useMutation<{ message: string }, Error, ForgotPasswordRequest>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/auth/forgot-password', data)
      return response.data
    },
  })
}

// Reset password mutation
export const useResetPassword = () => {
  const navigate = useNavigate()

  return useMutation<{ message: string }, Error, ResetPasswordRequest>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/auth/reset-password', data)
      return response.data
    },
    onSuccess: () => {
      navigate({ to: '/sign-in' })
    },
  })
}

// Change password mutation
export const useChangePassword = () => {
  const queryClient = useQueryClient()

  return useMutation<{ message: string }, Error, ChangePasswordRequest>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/auth/change-password', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    },
  })
}

// Refresh token mutation
export const useRefreshToken = () => {
  const queryClient = useQueryClient()

  return useMutation<AuthResponse, Error>({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem('refresh_token')
      const response = await axiosInstance.post('/auth/refresh', { refreshToken })
      return response.data
    },
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('refresh_token', data.refreshToken)
      queryClient.setQueryData(['current-user'], data.user)
      queryClient.setQueryData(['auth-status'], true)
    },
  })
}
