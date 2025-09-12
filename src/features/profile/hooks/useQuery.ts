import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import type { UserProfile } from '../types'

// Get user profile
export const useUserProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await axiosInstance.get('/profile')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get profile statistics
export const useProfileStats = () => {
  return useQuery({
    queryKey: ['profile-stats'],
    queryFn: async () => {
      const response = await axiosInstance.get('/profile/stats')
      return response.data
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get user activity log
export const useUserActivityLog = (limit = 20) => {
  return useQuery({
    queryKey: ['user-activity', limit],
    queryFn: async () => {
      const response = await axiosInstance.get(`/profile/activity?limit=${limit}`)
      return response.data
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

// Get user preferences
export const useUserPreferences = () => {
  return useQuery({
    queryKey: ['user-preferences'],
    queryFn: async () => {
      const response = await axiosInstance.get('/profile/preferences')
      return response.data
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
}
