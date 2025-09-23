import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import { useNavigate } from '@tanstack/react-router'
import type { 
  ProfileUpdateRequest, 
  ChangeEmailRequest, 
  ChangePhoneRequest, 
  DeleteAccountRequest 
} from '../types'

// Update profile mutation
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: ProfileUpdateRequest) => {
      const response = await axiosInstance.patch('/profile', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    },
  })
}

// Upload avatar mutation
export const useUploadAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('avatar', file)
      
      const response = await axiosInstance.post('/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    },
  })
}

// Change email mutation
export const useChangeEmail = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: ChangeEmailRequest) => {
      const response = await axiosInstance.post('/profile/change-email', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    },
  })
}

// Change phone mutation
export const useChangePhone = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: ChangePhoneRequest) => {
      const response = await axiosInstance.post('/profile/change-phone', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    },
  })
}

// Send phone verification code
export const useSendPhoneVerification = () => {
  return useMutation({
    mutationFn: async (phone: string) => {
      const response = await axiosInstance.post('/profile/send-phone-verification', { phone })
      return response.data
    },
  })
}

// Update preferences mutation
export const useUpdatePreferences = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (preferences: Record<string, unknown>) => {
      const response = await axiosInstance.patch('/profile/preferences', preferences)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-preferences'] })
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
    },
  })
}

// Delete account mutation
export const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: DeleteAccountRequest) => {
      const response = await axiosInstance.delete('/profile', { data })
      return response.data
    },
    onSuccess: () => {
      // Clear all data and redirect
      localStorage.clear()
      queryClient.clear()
      navigate({ to: '/sign-in' })
    },
  })
}

// Export user data mutation
export const useExportUserData = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get('/profile/export', {
        responseType: 'blob',
      })
      return response.data
    },
  })
}
