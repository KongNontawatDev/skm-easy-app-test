import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AxiosError } from 'axios'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
// import { useAuthStore } from '@/stores/auth-store'
import { handleServerError } from '@/lib/handle-server-error'
import { DirectionProvider } from './context/direction-provider'
import { FontProvider } from './context/font-provider'
import { ThemeProvider } from './context/theme-provider'
import { ToastProvider } from './contexts/toast-context'
import { ErrorBoundary } from './components/shared/error-boundary'
import { Toaster } from './components/ui/sonner'
// Generated Routes
import { routeTree } from './routeTree.gen'
// Styles
import './styles/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // TODO: Implement proper error logging
        if (import.meta.env.DEV) {
        }

        if (failureCount >= 0 && import.meta.env.DEV) return false
        if (failureCount > 3 && import.meta.env.PROD) return false

        return !(
          error instanceof AxiosError &&
          [401, 403].includes(error.response?.status ?? 0)
        )
      },
      refetchOnWindowFocus: import.meta.env.PROD,
      staleTime: 10 * 1000, // 10s
    },
    mutations: {
      onError: (error) => {
        handleServerError(error)

        if (error instanceof AxiosError) {
          if (error.response?.status === 304) {
            toast.error('Content not modified!')
          }
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast.error('Session expired!')
          // useAuthStore.getState().auth.reset()
          // Redirect to sign-in page
          if (typeof window !== 'undefined') {
            window.location.href = '/sign-in'
          }
        }
        if (error.response?.status === 500) {
          toast.error('Internal Server Error!')
          // Redirect to 500 error page
          if (typeof window !== 'undefined') {
            window.location.href = '/500'
          }
        }
        if (error.response?.status === 403) {
          // router.navigate("/forbidden", { replace: true });
        }
      }
    },
  }),
})

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}



// Render the app
const rootElement = document.getElementById('root')!

// Ensure React is properly initialized for React 19
if (typeof React === 'undefined') {
  throw new Error('React is not defined')
}

// Ensure React.Children is available
if (!React.Children) {
  throw new Error('React.Children is not available')
}

// Add React 19 compatibility fix
if (typeof window !== 'undefined') {
  // Ensure React is available globally for React 19
  (window as any).React = React
}

const root = ReactDOM.createRoot(rootElement)
root.render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <FontProvider>
            <DirectionProvider>
              <ToastProvider>
                <RouterProvider router={router} />
                <Toaster position="top-center" />
              </ToastProvider>
            </DirectionProvider>
          </FontProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
)
