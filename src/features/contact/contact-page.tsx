import { useState } from 'react'
import { MobileLayout, MobileHeader, MobileContent, BottomNavigation } from '@/components/mobile'
import { ContactForm } from './components/contact-form'
import { ContactInfo } from './components/contact-info'
import { mockContactInfo } from './data/mock-data'
import { MessageSquare, Info } from 'lucide-react'

export function Contact() {
  const [showForm, setShowForm] = useState(false)

  const handleSubmitForm = (_data: unknown) => {
    // TODO: Implement actual form submission
    setShowForm(false)
    // Here you would typically send the data to your API
    alert('ส่งข้อความเรียบร้อยแล้ว เราจะติดต่อกลับภายใน 24 ชั่วโมง')
  }

  return (
    <MobileLayout>
      <MobileHeader title="ติดต่อบริษัท" showMoreMenu={true} />
      <MobileContent className="pb-20">
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center ${
                showForm 
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' 
                  : 'bg-[#EC1B2E] text-white hover:bg-[#C20010]'
              }`}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {showForm ? 'ดูข้อมูลติดต่อ' : 'ส่งข้อความ'}
            </button>
          </div>

          {/* Form or Contact Info */}
          {showForm ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-[#EC1B2E]" />
                ส่งข้อความถึงเรา
              </h3>
              <ContactForm onSubmit={handleSubmitForm} />
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <Info className="w-5 h-5 mr-2 text-[#EC1B2E]" />
                ข้อมูลติดต่อ
              </h3>
              <ContactInfo contactInfo={mockContactInfo} />
            </div>
          )}
        </div>
      </MobileContent>
      <BottomNavigation currentPath="/contact" />
    </MobileLayout>
  )
}
