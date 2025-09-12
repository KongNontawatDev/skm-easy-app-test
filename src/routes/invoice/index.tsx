import { createFileRoute } from '@tanstack/react-router'
import { Invoice } from '@/features/installment/invoice'

export const Route = createFileRoute('/invoice/')({
  component: () => <Invoice />,
})