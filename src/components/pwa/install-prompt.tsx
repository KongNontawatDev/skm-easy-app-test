import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Download, Smartphone } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true)
        return true
      }
      return false
    }

    if (checkIfInstalled()) {
      return
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt after a delay
      setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
      } else {
      }
      
      setDeferredPrompt(null)
      setShowPrompt(false)
    } catch (error) {
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true')
  }

  // Don't show if already installed or dismissed
  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null
  }

  // Check if user dismissed in this session
  if (sessionStorage.getItem('pwa-install-dismissed')) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="border-2 border-blue-500 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">ติดตั้งแอป</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="mb-4">
            ติดตั้ง SKM Easy App บนอุปกรณ์ของคุณเพื่อเข้าถึงได้ง่ายขึ้น
          </CardDescription>
          <div className="flex gap-2">
            <Button
              onClick={handleInstallClick}
              className="flex-1"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              ติดตั้ง
            </Button>
            <Button
              variant="outline"
              onClick={handleDismiss}
              size="sm"
            >
              ไม่ตอนนี้
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// PWA Update Available Component
export function UpdateAvailable() {
  const [showUpdate, setShowUpdate] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    // Listen for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
          setShowUpdate(true)
        }
      })
    }
  }, [])

  const handleUpdate = () => {
    setIsUpdating(true)
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
          
          // Reload the page after update
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }
      })
    }
  }

  if (!showUpdate) {
    return null
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="border-2 border-green-500 shadow-lg">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800">อัปเดตใหม่พร้อมใช้งาน</h3>
              <p className="text-sm text-green-600">มีเวอร์ชันใหม่ของแอปให้ดาวน์โหลด</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                disabled={isUpdating}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                {isUpdating ? 'กำลังอัปเดต...' : 'อัปเดต'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowUpdate(false)}
                size="sm"
              >
                ปิด
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// PWA Status Component
export function PWAStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if running as PWA
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isStandalone) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-40">
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        isOnline 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {isOnline ? 'ออนไลน์' : 'ออฟไลน์'}
      </div>
    </div>
  )
}
