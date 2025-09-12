import { useState } from 'react'
import { MobileButton, MobileInput } from '@/components/mobile'
import { Paperclip, Send } from 'lucide-react'
import type { TicketCategory, TicketPriority } from '../types'
import { mockTicketCategories, mockTicketPriorities } from '../data/mock-data'

interface TicketFormProps {
  onSubmit: (data: {
    title: string
    description: string
    category: TicketCategory
    priority: TicketPriority
  }) => void
  onCancel: () => void
}

export function TicketForm({ onSubmit, onCancel }: TicketFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general' as TicketCategory,
    priority: 'medium' as TicketPriority,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim() && formData.description.trim()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          หัวข้อปัญหา *
        </label>
        <MobileInput
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="ระบุหัวข้อปัญหาที่พบ"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          รายละเอียดปัญหา *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="อธิบายรายละเอียดของปัญหาให้ชัดเจน"
          className="w-full p-3 rounded-xl focus:ring-2 focus:ring-[#EC1B2E] resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            หมวดหมู่
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as TicketCategory }))}
            className="w-full p-3 rounded-xl focus:ring-2 focus:ring-[#EC1B2E] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {mockTicketCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ความเร่งด่วน
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as TicketPriority }))}
            className="w-full p-3 rounded-xl focus:ring-2 focus:ring-[#EC1B2E] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            {mockTicketPriorities.map(priority => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          ไฟล์แนบ (ถ้ามี)
        </label>
        <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-6 text-center bg-gray-50 dark:bg-gray-700">
          <Paperclip className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500 mb-2">ลากไฟล์มาวางที่นี่ หรือ</p>
          <button
            type="button"
            className="text-[#EC1B2E] text-sm font-medium hover:underline"
          >
            เลือกไฟล์
          </button>
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <MobileButton
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
        >
          ยกเลิก
        </MobileButton>
        <MobileButton
          type="submit"
          className="flex-1 flex items-center justify-center"
          disabled={!formData.title.trim() || !formData.description.trim()}
        >
          <Send className="w-4 h-4 mr-2" />
          ส่งคำร้อง
        </MobileButton>
      </div>
    </form>
  )
}
