import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import type { User } from '../types'

// Get current user profile
export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await axiosInstance.get('/auth/me')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  })
}

// Check if user is authenticated
export const useAuthStatus = () => {
  return useQuery<boolean>({
    queryKey: ['auth-status'],
    queryFn: async () => {
      try {
        await axiosInstance.get('/auth/verify')
        return true
      } catch {
        return false
      }
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: false,
  })
}

// Get user permissions
export const useUserPermissions = () => {
  return useQuery<string[]>({
    queryKey: ['user-permissions'],
    queryFn: async () => {
      const response = await axiosInstance.get('/auth/permissions')
      return response.data
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
