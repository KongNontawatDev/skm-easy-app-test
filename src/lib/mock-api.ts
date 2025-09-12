import { ApiResponse, PaginatedResponse, HttpStatus, QueryParams } from './api-types'

// Mock API delay simulation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API Base URL
export const MOCK_API_BASE_URL = '/api/mock'

// Mock API Service
export class MockApiService {
  private static async simulateRequest<T>(
    data: T,
    message: string = 'Success',
    statusCode: HttpStatus = HttpStatus.OK,
    pagination?: any
  ): Promise<ApiResponse<T>> {
    // Simulate network delay
    await delay(Math.random() * 500 + 200)
    
    // Simulate occasional errors (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Network error')
    }

    return {
      success: statusCode < 400,
      message,
      data,
      statusCode,
      pagination
    }
  }

  // Generic GET request
  static async get<T>(
    endpoint: string,
    params?: QueryParams
  ): Promise<ApiResponse<T>> {
    const mockData = await this.getMockData<T>(endpoint, params)
    return this.simulateRequest(mockData, 'Data retrieved successfully')
  }

  // Generic POST request
  static async post<T>(
    endpoint: string,
    data: any
  ): Promise<ApiResponse<T>> {
    const mockData = await this.createMockData<T>(endpoint, data)
    return this.simulateRequest(mockData, 'Data created successfully', HttpStatus.CREATED)
  }

  // Generic PUT request
  static async put<T>(
    endpoint: string,
    data: any
  ): Promise<ApiResponse<T>> {
    const mockData = await this.updateMockData<T>(endpoint, data)
    return this.simulateRequest(mockData, 'Data updated successfully')
  }

  // Generic PATCH request
  static async patch<T>(
    endpoint: string,
    data: any
  ): Promise<ApiResponse<T>> {
    const mockData = await this.updateMockData<T>(endpoint, data)
    return this.simulateRequest(mockData, 'Data updated successfully')
  }

  // Generic DELETE request
  static async delete<T>(
    endpoint: string
  ): Promise<ApiResponse<T>> {
    await this.deleteMockData(endpoint)
    return this.simulateRequest({} as T, 'Data deleted successfully')
  }

  // Mock data retrieval based on endpoint
  private static async getMockData<T>(_endpoint: string, _params?: QueryParams): Promise<T> {
    // This will be implemented by importing actual mock data
    // For now, return empty object as placeholder
    return {} as T
  }

  // Mock data creation
  private static async createMockData<T>(_endpoint: string, data: any): Promise<T> {
    // Generate ID and timestamps
    const newData = {
      ...data,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    return newData as T
  }

  // Mock data update
  private static async updateMockData<T>(_endpoint: string, data: any): Promise<T> {
    const updatedData = {
      ...data,
      updatedAt: new Date().toISOString()
    }
    return updatedData as T
  }

  // Mock data deletion
  private static async deleteMockData(_endpoint: string): Promise<void> {
    // Simulate deletion
    return Promise.resolve()
  }

  // Generate unique ID
  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
  }
}

// Helper function to create paginated response
export function createPaginatedResponse<T>(
  data: T[],
  page: number = 1,
  pageSize: number = 10,
  total?: number
): PaginatedResponse<T> {
  const totalItems = total || data.length
  const pageCount = Math.ceil(totalItems / pageSize)
  
  return {
    success: true,
    message: 'Data retrieved successfully',
    data,
    statusCode: HttpStatus.OK,
    pagination: {
      page,
      pageSize,
      total: totalItems,
      pageCount
    }
  }
}
