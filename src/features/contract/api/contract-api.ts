import { MockApiService } from '@/lib/mock-api'
import { mockContracts } from '../data/mock-data'
import type { Contract } from '../types'
import type { QueryParams } from '@/lib/api-types'

export class ContractApiService {
  // Get all contracts with pagination and filters
  static async getContracts(params?: QueryParams) {
    // Simulate filtering and pagination
    let filteredContracts = [...mockContracts]
    
    if (params?.search) {
      const searchTerm = params.search.toLowerCase()
      filteredContracts = filteredContracts.filter(contract =>
        contract.contractNumber.toLowerCase().includes(searchTerm) ||
        contract.vehicleInfo.brand.toLowerCase().includes(searchTerm) ||
        contract.vehicleInfo.model.toLowerCase().includes(searchTerm) ||
        contract.vehicleInfo.plateNumber.toLowerCase().includes(searchTerm)
      )
    }

    // Simulate pagination
    const page = params?.page || 1
    const limit = params?.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedContracts = filteredContracts.slice(startIndex, endIndex)

    return MockApiService.get<Contract[]>('/contracts', params)
      .then(response => ({
        ...response,
        data: paginatedContracts,
        pagination: {
          page,
          pageSize: limit,
          total: filteredContracts.length,
          pageCount: Math.ceil(filteredContracts.length / limit)
        }
      }))
  }

  // Get contract by ID
  static async getContract(id: string) {
    const contract = mockContracts.find(c => c.id === id)
    if (!contract) {
      throw new Error('Contract not found')
    }
    return MockApiService.get<Contract>(`/contracts/${id}`)
      .then(response => ({
        ...response,
        data: contract
      }))
  }

  // Create new contract
  static async createContract(data: Partial<Contract>) {
    return MockApiService.post<Contract>('/contracts', data)
  }

  // Update contract
  static async updateContract(id: string, data: Partial<Contract>) {
    return MockApiService.put<Contract>(`/contracts/${id}`, data)
  }

  // Delete contract
  static async deleteContract(id: string) {
    return MockApiService.delete(`/contracts/${id}`)
  }

  // Upload contract image
  static async uploadContractImage(id: string, file: File) {
    // Simulate file upload
    const mockUrl = `https://example.com/images/contracts/${id}/${file.name}`
    return MockApiService.post<{ url: string }>(`/contracts/${id}/image`, { url: mockUrl })
  }
}
