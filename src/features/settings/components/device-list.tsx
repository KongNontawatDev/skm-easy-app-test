import { Smartphone, Monitor, Tablet, MapPin, Clock, Trash2 } from 'lucide-react'
import { MobileButton } from '@/components/mobile'
import type { Device } from '../types'

interface DeviceListProps {
  devices: Device[]
  onRevokeDevice?: (deviceId: string) => void
  className?: string
}

export function DeviceList({ devices, onRevokeDevice, className }: DeviceListProps) {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return <Smartphone className="h-5 w-5" />
      case 'desktop': return <Monitor className="h-5 w-5" />
      case 'tablet': return <Tablet className="h-5 w-5" />
      default: return <Smartphone className="h-5 w-5" />
    }
  }

  const getDeviceTypeText = (type: string) => {
    switch (type) {
      case 'mobile': return 'มือถือ'
      case 'desktop': return 'เดสก์ท็อป'
      case 'tablet': return 'แท็บเล็ต'
      default: return 'อุปกรณ์'
    }
  }

  const formatLastActive = (lastActive: string) => {
    const date = new Date(lastActive)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'เมื่อสักครู่'
    if (diffInHours < 24) return `${diffInHours} ชั่วโมงที่แล้ว`
    if (diffInHours < 48) return 'เมื่อวาน'
    return date.toLocaleDateString('th-TH')
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {devices.map((device) => (
        <div
          key={device.id}
          className={`flex items-center justify-between p-3 rounded-lg border ${
            device.isCurrent 
              ? 'border-[#EC1B2E] bg-red-50' 
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              device.isCurrent ? 'bg-[#EC1B2E] text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {getDeviceIcon(device.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-gray-900">{device.name}</h4>
                {device.isCurrent && (
                  <span className="px-2 py-1 text-xs font-medium text-[#EC1B2E] bg-red-100 rounded-full">
                    อุปกรณ์ปัจจุบัน
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                <span>{getDeviceTypeText(device.type)}</span>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{device.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatLastActive(device.lastActive)}</span>
                </div>
              </div>
            </div>
          </div>

          {!device.isCurrent && onRevokeDevice && (
            <MobileButton
              variant="ghost"
              size="sm"
              onClick={() => onRevokeDevice(device.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </MobileButton>
          )}
        </div>
      ))}
    </div>
  )
}
