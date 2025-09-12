import { useApiUpdate, useApiMutation } from '@/hooks/useApiMutation'
import { ProfileApiService } from '../api/profile-api'
import type { User } from '@/lib/types'

// Update profile mutation
export function useUpdateProfile() {
  return useApiUpdate<User, Partial<User>>(
    'profile',
    (data) => ProfileApiService.updateProfile(data)
  )
}

// Change password mutation
export function useChangePassword() {
  return useApiMutation<{ success: boolean }, { currentPassword: string; newPassword: string }>(
    (data) => ProfileApiService.changePassword(data),
    {
      onSuccess: () => {
        console.log('Password changed successfully')
      },
      onError: (error) => {
        console.error('Failed to change password:', error.message)
      }
    }
  )
}

// Upload avatar mutation
export function useUploadAvatar() {
  return useApiMutation<{ url: string }, File>(
    (file) => ProfileApiService.uploadAvatar(file),
    {
      onSuccess: (data) => {
        console.log('Avatar uploaded successfully:', data.data.url)
      },
      onError: (error) => {
        console.error('Failed to upload avatar:', error.message)
      }
    }
  )
}

// Update preferences mutation
export function useUpdatePreferences() {
  return useApiMutation<any, any>(
    (data) => ProfileApiService.updatePreferences(data),
    {
      onSuccess: () => {
        console.log('Preferences updated successfully')
      },
      onError: (error) => {
        console.error('Failed to update preferences:', error.message)
      }
    }
  )
}
