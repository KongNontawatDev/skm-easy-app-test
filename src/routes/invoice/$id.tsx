import { createFileRoute } from '@tanstack/react-router'
import { InvoiceDetail } from '@/features/installment/invoice/detail'

export const Route = createFileRoute('/invoice/$id')({
  component: () => <InvoiceDetail />,
})