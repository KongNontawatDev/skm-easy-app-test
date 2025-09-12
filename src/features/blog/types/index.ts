export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  publishedAt: string
  updatedAt: string
  imageUrl?: string
  category: BlogCategory
  tags: string[]
  readTime: number
  views: number
  likes: number
  isPublished: boolean
}

export type BlogCategory = 'all' | 'news' | 'tips' | 'promotion' | 'announcement'

export interface BlogComment {
  id: string
  postId: string
  author: string
  content: string
  createdAt: string
  likes: number
  isAuthor: boolean
}
