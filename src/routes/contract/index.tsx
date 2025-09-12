import { createFileRoute } from '@tanstack/react-router'
import { Contract } from '@/features/contract'

export const Route = createFileRoute('/contract/')({
  component: () => <Contract />,
})