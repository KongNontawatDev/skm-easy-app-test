import { apiClient } from '@/lib/api-client'
import { API_ENDPOINTS } from '@/lib/constants'
import type { Contract } from '@/features/contract/types'
import type { PaginatedResponse, SearchParams } from '@/lib/types'

export class ContractService {
  static async getContracts(params?: SearchParams): Promise<PaginatedResponse<Contract>> {
    const response = await apiClient.get(API_ENDPOINTS.CONTRACTS, { params })
    return response.data as PaginatedResponse<Contract>
  }

  static async getContract(id: string): Promise<Contract> {
    const response = await apiClient.get(`${API_ENDPOINTS.CONTRACTS}/${id}`)
    return response.data as Contract
  }

  static async createContract(data: Partial<Contract>): Promise<Contract> {
    const response = await apiClient.post(API_ENDPOINTS.CONTRACTS, data)
    return response.data as Contract
  }

  static async updateContract(id: string, data: Partial<Contract>): Promise<Contract> {
    const response = await apiClient.put(`${API_ENDPOINTS.CONTRACTS}/${id}`, data)
    return response.data as Contract
  }

  static async deleteContract(id: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.CONTRACTS}/${id}`)
  }

  static async uploadContractImage(id: string, file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await apiClient.post(
      `${API_ENDPOINTS.CONTRACTS}/${id}/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data as { url: string }
  }
}
