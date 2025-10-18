export interface Guide {
  id: string
  title: string
  content: string
  excerpt: string
  category: GuideCategory
  difficulty: GuideDifficulty
  estimatedTime: number
  steps: GuideStep[]
  tags: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export type GuideCategory = 'all' | 'payment' | 'contract' | 'coupon' | 'account' | 'notification' | 'troubleshooting' | 'refinance' | 'promotion' | 'app_usage'
export type GuideDifficulty = 'beginner' | 'intermediate' | 'advanced'

export interface GuideStep {
  id: string
  title: string
  description: string
  imageUrl?: string
  order: number
}
