import { createFileRoute } from '@tanstack/react-router'
import { PaymentQRCode } from '@/features/installment/payment/qrcode'

export const Route = createFileRoute('/installment/pay/$id/qrcode')({
  component: () => <PaymentQRCode />,
})