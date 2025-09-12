import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@/features/auth/sign-in'
import { AuthLayout } from '@/components/auth/auth-layout'

export const Route = createFileRoute('/sign-in')({
  component: () => (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  ),
})