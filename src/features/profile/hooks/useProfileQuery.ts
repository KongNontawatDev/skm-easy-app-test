import { useApiQuery } from '@/hooks/useApiQuery'
import { ProfileApiService } from '../api/profile-api'

// Get current user profile
export function useProfile() {
  return useApiQuery(
    ['profile'],
    () => ProfileApiService.getProfile()
  )
}

// Get user statistics
export function useUserStats() {
  return useApiQuery(
    ['profile', 'stats'],
    () => ProfileApiService.getUserStats()
  )
}

// Get user preferences
export function useUserPreferences() {
  return useApiQuery(
    ['profile', 'preferences'],
    () => ProfileApiService.getPreferences()
  )
}
