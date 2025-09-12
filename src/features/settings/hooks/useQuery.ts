import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import type { 
  AppSettings, 
  SecuritySettings, 
  PrivacySettings, 
  NotificationSettings, 
  AccountSettings,
  AppInfo,
  SupportContact 
} from '../types'

// Get app settings
export const useAppSettings = () => {
  return useQuery<AppSettings>({
    queryKey: ['app-settings'],
    queryFn: async () => {
      const response = await axiosInstance.get('/settings/app')
      return response.data
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
}

// Get security settings
export const useSecuritySettings = () => {
  return useQuery<SecuritySettings>({
    queryKey: ['security-settings'],
    queryFn: async () => {
      const response = await axiosInstance.get('/settings/security')
      return response.data
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get privacy settings
export const usePrivacySettings = () => {
  return useQuery<PrivacySettings>({
    queryKey: ['privacy-settings'],
    queryFn: async () => {
      const response = await axiosInstance.get('/settings/privacy')
      return response.data
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
}

// Get notification settings
export const useNotificationSettings = () => {
  return useQuery<NotificationSettings>({
    queryKey: ['notification-settings'],
    queryFn: async () => {
      const response = await axiosInstance.get('/settings/notification')
      return response.data
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get account settings
export const useAccountSettings = () => {
  return useQuery<AccountSettings>({
    queryKey: ['account-settings'],
    queryFn: async () => {
      const response = await axiosInstance.get('/settings/account')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get app info
export const useAppInfo = () => {
  return useQuery<AppInfo>({
    queryKey: ['app-info'],
    queryFn: async () => {
      const response = await axiosInstance.get('/settings/app-info')
      return response.data
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Get support contact
export const useSupportContact = () => {
  return useQuery<SupportContact>({
    queryKey: ['support-contact'],
    queryFn: async () => {
      const response = await axiosInstance.get('/settings/support')
      return response.data
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  })
}
