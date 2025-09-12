import { createFileRoute } from '@tanstack/react-router'
import { Installment } from '@/features/installment'

export const Route = createFileRoute('/installment/')({
  component: () => <Installment />,
})