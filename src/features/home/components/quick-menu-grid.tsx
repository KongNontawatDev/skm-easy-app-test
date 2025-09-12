import { useRouter } from '@tanstack/react-router'
import type { QuickMenuItem } from '../types'

interface QuickMenuGridProps {
  items: QuickMenuItem[]
  className?: string
}

export function QuickMenuGrid({ items, className }: QuickMenuGridProps) {
  const router = useRouter()

  const handleItemClick = (path: string) => {
    router.navigate({ to: path })
  }

  return (
    <div className={`grid grid-cols-3 gap-1 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className="p-3 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 rounded-full"
          onClick={() => handleItemClick(item.path)}
        >
          <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${item.color} flex items-center justify-center`}>
            <span className="text-2xl">{item.icon}</span>
          </div>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.title}</p>
        </div>
      ))}
    </div>
  )
}
