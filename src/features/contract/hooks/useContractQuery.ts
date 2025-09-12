import { useApiQuery, useApiQueryById, useApiQueryList } from '@/hooks/useApiQuery'
import { ContractApiService } from '../api/contract-api'
import { QueryParams } from '@/lib/api-types'

// Get all contracts with pagination and filters
export function useContracts(params?: QueryParams) {
  return useApiQueryList(
    'contracts',
    params,
    () => ContractApiService.getContracts(params)
  )
}

// Get contract by ID
export function useContract(id: string) {
  return useApiQueryById(
    'contracts',
    id,
    () => ContractApiService.getContract(id)
  )
}

// Get contracts for dashboard (limited)
export function useRecentContracts(limit: number = 5) {
  return useApiQuery(
    ['contracts', 'recent', limit],
    () => ContractApiService.getContracts({ limit })
  )
}
