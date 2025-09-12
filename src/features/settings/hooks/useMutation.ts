import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import type { 
  AppSettings, 
  SecuritySettings, 
  PrivacySettings, 
  NotificationSettings, 
  AccountSettings 
} from '../types'

// Update app settings
export const useUpdateAppSettings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (settings: Partial<AppSettings>) => {
      const response = await axiosInstance.patch('/settings/app', settings)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['app-settings'] })
    },
  })
}

// Update security settings
export const useUpdateSecuritySettings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (settings: Partial<SecuritySettings>) => {
      const response = await axiosInstance.patch('/settings/security', settings)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-settings'] })
    },
  })
}

// Update privacy settings
export const useUpdatePrivacySettings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (settings: Partial<PrivacySettings>) => {
      const response = await axiosInstance.patch('/settings/privacy', settings)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['privacy-settings'] })
    },
  })
}

// Update notification settings
export const useUpdateNotificationSettings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (settings: Partial<NotificationSettings>) => {
      const response = await axiosInstance.patch('/settings/notification', settings)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-settings'] })
    },
  })
}

// Update account settings
export const useUpdateAccountSettings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (settings: Partial<AccountSettings>) => {
      const response = await axiosInstance.patch('/settings/account', settings)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['account-settings'] })
      queryClient.invalidateQueries({ queryKey: ['current-user'] })
    },
  })
}

// Enable two-factor authentication
export const useEnableTwoFactor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post('/settings/security/2fa/enable')
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-settings'] })
    },
  })
}

// Disable two-factor authentication
export const useDisableTwoFactor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (code: string) => {
      const response = await axiosInstance.post('/settings/security/2fa/disable', { code })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-settings'] })
    },
  })
}

// Revoke device access
export const useRevokeDevice = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (deviceId: string) => {
      const response = await axiosInstance.delete(`/settings/security/devices/${deviceId}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['security-settings'] })
    },
  })
}

// Export user data
export const useExportUserData = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get('/settings/export-data', {
        responseType: 'blob',
      })
      return response.data
    },
  })
}

// Clear app cache
export const useClearAppCache = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post('/settings/clear-cache')
      return response.data
    },
    onSuccess: () => {
      // Clear all queries
      queryClient.clear()
    },
  })
}
