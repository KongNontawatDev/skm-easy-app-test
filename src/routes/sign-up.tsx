import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@/features/auth/sign-up'
import { AuthLayout } from '@/components/auth/auth-layout'

export const Route = createFileRoute('/sign-up')({
  component: () => (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  ),
})