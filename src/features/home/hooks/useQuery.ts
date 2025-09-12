import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '@/lib/axios'
import type { HomeData } from '../types'

// Get home page data
export const useHomeData = () => {
  return useQuery<HomeData>({
    queryKey: ['home-data'],
    queryFn: async () => {
      const response = await axiosInstance.get('/home')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get contract cards
export const useContractCards = () => {
  return useQuery({
    queryKey: ['contract-cards'],
    queryFn: async () => {
      const response = await axiosInstance.get('/contracts')
      return response.data
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Get quick menu items
export const useQuickMenuItems = () => {
  return useQuery({
    queryKey: ['quick-menu'],
    queryFn: async () => {
      const response = await axiosInstance.get('/quick-menu')
      return response.data
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

// Get promotion ads
export const usePromotionAds = () => {
  return useQuery({
    queryKey: ['promotion-ads'],
    queryFn: async () => {
      const response = await axiosInstance.get('/promotions')
      return response.data
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
}
