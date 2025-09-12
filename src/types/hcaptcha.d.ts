declare module '@hcaptcha/react-hcaptcha' {
  import { type Component, type RefObject } from 'react'

  export interface HCaptchaProps {
    sitekey: string
    onVerify: (token: string) => void
    onExpire?: () => void
    onError?: (error: string) => void
    onLoad?: () => void
    onOpen?: () => void
    onClose?: () => void
    theme?: 'light' | 'dark'
    size?: 'normal' | 'compact'
    tabindex?: number
    languageOverride?: string
    reCaptchaCompat?: boolean
    id?: string
    className?: string
    ref?: RefObject<HCaptcha>
  }

  export default class HCaptcha extends Component<HCaptchaProps> {
    resetCaptcha(): void
    removeCaptcha(): void
    execute(): void
    getResponse(): string
  }
}
