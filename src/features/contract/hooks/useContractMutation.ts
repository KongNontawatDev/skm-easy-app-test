import { useApiCreate, useApiUpdate, useApiDelete } from '@/hooks/useApiMutation'
import { ContractApiService } from '../api/contract-api'
import type { Contract } from '../types'

// Create contract mutation
export function useCreateContract() {
  return useApiCreate<Contract, Partial<Contract>>(
    'contracts',
    (data) => ContractApiService.createContract(data)
  )
}

// Update contract mutation
export function useUpdateContract() {
  return useApiUpdate<Contract, { id: string; data: Partial<Contract> }>(
    'contracts',
    ({ id, data }) => ContractApiService.updateContract(id, data)
  )
}

// Delete contract mutation
export function useDeleteContract() {
  return useApiDelete(
    'contracts',
    (id) => ContractApiService.deleteContract(id)
  )
}

// Upload contract image mutation
export function useUploadContractImage() {
  return useApiCreate<{ url: string }, { id: string; file: File }>(
    'contracts',
    ({ id, file }) => ContractApiService.uploadContractImage(id, file)
  )
}
