import { createFileRoute } from '@tanstack/react-router'
import { ContractDetail } from '@/features/contract/detail'

export const Route = createFileRoute('/contract/$contractId')({
  component: () => <ContractDetail />,
})