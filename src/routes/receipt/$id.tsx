import { createFileRoute } from '@tanstack/react-router'
import { ReceiptDetail } from '@/features/installment/receipt/detail'

export const Route = createFileRoute('/receipt/$id')({
  component: () => <ReceiptDetail />,
})