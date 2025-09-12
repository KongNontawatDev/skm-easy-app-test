import { createFileRoute } from '@tanstack/react-router'
import { Receipt } from '@/features/installment/receipt'

export const Route = createFileRoute('/receipt/')({
  component: () => <Receipt />,
})