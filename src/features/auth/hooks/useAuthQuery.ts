import { useApiQuery } from '@/hooks/useApiQuery'
import { AuthApiService } from '../api/auth-api'

// Get current user (if authenticated)
export function useCurrentUser() {
  return useApiQuery(
    ['auth', 'me'],
    () => AuthApiService.signIn({ nationalId: '', phoneNumber: '', captchaToken: '' }),
    {
      enabled: false // Only call when needed
    }
  )
}
