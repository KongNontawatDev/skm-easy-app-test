import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle } from 'lucide-react'
import type { ContactInfo } from '../types'

interface ContactInfoProps {
  contactInfo: ContactInfo[]
}

export function ContactInfo({ contactInfo }: ContactInfoProps) {
  const getIcon = (type: string, title: string) => {
    switch (type) {
      case 'phone':
        return <Phone className="w-5 h-5" />
      case 'email':
        return <Mail className="w-5 h-5" />
      case 'address':
        return <MapPin className="w-5 h-5" />
      case 'hours':
        return <Clock className="w-5 h-5" />
      case 'social':
        return title === 'Facebook' ? <Facebook className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />
      default:
        return <Phone className="w-5 h-5" />
    }
  }

  const handleContact = (contact: ContactInfo) => {
    switch (contact.type) {
      case 'phone':
        window.open(`tel:${contact.value}`)
        break
      case 'email':
        window.open(`mailto:${contact.value}`)
        break
      case 'address':
        // Open maps
        break
      case 'social':
        // Open social media
        break
      default:
        break
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {contactInfo.map((contact) => (
        <div
          key={contact.id}
          className="bg-white dark:bg-gray-800 rounded-2xl p-4 cursor-pointer transition-all duration-200"
          onClick={() => handleContact(contact)}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-[#EC1B2E]/10 rounded-full flex items-center justify-center text-[#EC1B2E]">
              {getIcon(contact.type, contact.title)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{contact.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{contact.value}</p>
              {contact.description && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{contact.description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
