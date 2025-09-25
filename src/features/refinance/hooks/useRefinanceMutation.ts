import { useApiMutation } from '@/hooks/useApiMutation'
import { RefinanceApiService } from '../api/refinance-api'
import type { 
  RefinanceCheckRequest, 
  RefinanceCheckResponse,
  CreditCheckForm,
  CreditCheckResponse,
  CreditCheckResult
} from '../types'

// Hook for checking refinance eligibility
export function useRefinanceCheck() {
  return useApiMutation<RefinanceCheckResponse, RefinanceCheckRequest>(
    (data) => RefinanceApiService.checkRefinanceEligibility(data),
    {
      onSuccess: (data) => {
        // eslint-disable-next-line no-console
      },
      onError: (error) => {
        // eslint-disable-next-line no-console
      }
    }
  )
}

// Hook for submitting credit check form
export function useCreditCheckSubmit() {
  return useApiMutation<CreditCheckResponse, CreditCheckForm>(
    (data) => RefinanceApiService.submitCreditCheck(data),
    {
      onSuccess: (data) => {
        // eslint-disable-next-line no-console
      },
      onError: (error) => {
        // eslint-disable-next-line no-console
      }
    }
  )
}

// Hook for updating credit check status
export function useCreditCheckStatusUpdate() {
  return useApiMutation<CreditCheckResult, { resultId: string; status: 'approved' | 'rejected'; notes?: string }>(
    ({ resultId, status, notes }) => RefinanceApiService.updateCreditCheckStatus(resultId, status, notes),
    {
      onSuccess: (data) => {
        // eslint-disable-next-line no-console
      },
      onError: (error) => {
        // eslint-disable-next-line no-console
      }
    }
  )
}
