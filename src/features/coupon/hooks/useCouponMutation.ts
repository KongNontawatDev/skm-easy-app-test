import { useApiMutation } from '@/hooks/useApiMutation'
import { CouponApiService } from '../api/coupon-api'
import type { Coupon } from '../types'

// Claim coupon mutation
export function useClaimCoupon() {
  return useApiMutation<Coupon, string>(
    (id) => CouponApiService.claimCoupon(id),
    {
      onSuccess: (data) => {
        // Show success message
        console.log('Coupon claimed successfully:', data.data.title)
      },
      onError: (error) => {
        // Show error message
        console.error('Failed to claim coupon:', error.message)
      }
    }
  )
}

// Use coupon mutation
export function useUseCoupon() {
  return useApiMutation<Coupon, { id: string; storeId?: string }>(
    ({ id, storeId }) => CouponApiService.useCoupon(id, storeId),
    {
      onSuccess: (data) => {
        // Show success message
        console.log('Coupon used successfully:', data.data.title)
      },
      onError: (error) => {
        // Show error message
        console.error('Failed to use coupon:', error.message)
      }
    }
  )
}
