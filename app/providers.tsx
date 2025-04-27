'use client'

import type { ThemeProviderProps } from 'next-themes'

import { HeroUIProvider } from '@heroui/system'
import { useRouter } from 'next/navigation'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProvider } from '@ctx/themeContext'
import { ToastContainer } from 'react-toastify'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>['push']>[1]
    >
  }
}

const queryClient = new QueryClient()

export function Providers({ children }: ProvidersProps) {
  const router = useRouter()

  return (
    <ThemeProvider>
      <QueryClientProviderWrapper>
        <HeroUIProvider navigate={ router.push }>
          <NextThemesProvider>
            { children }
            <ToastContainer />
          </NextThemesProvider>
        </HeroUIProvider>
      </QueryClientProviderWrapper>
    </ThemeProvider>
  )
}

const QueryClientProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      { children }
    </QueryClientProvider>
  )
}