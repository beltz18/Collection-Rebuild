'use client'

import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import { HeroUIProvider } from '@heroui/system'
import { ThemeProvider } from '@ctx/themeContext'

const queryClient = new QueryClient()

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <ThemeProvider>
      <QueryClientProvider client={ queryClient }>
        <HeroUIProvider navigate={ router.push }>
          <NextThemesProvider>
            { children }
            <ToastContainer />
          </NextThemesProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}