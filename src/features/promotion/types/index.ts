export interface Promotion {
  id: string
  title: string
  description: string
  imageUrl: string
  discountAmount?: number
  discountPercentage?: number
  minPurchase?: number
  validFrom: string
  validUntil: string
  category: PromotionCategory
  isActive: boolean
  isFeatured: boolean
  terms: string[]
}

export type PromotionCategory = 'all' | 'discount' | 'free_fee' | 'cashback' | 'special'
