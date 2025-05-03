import { Providers } from './provider'

export default function AuthLayout({ children }: { children: React.ReactNode }) {0
  return (
    <Providers>
      { children }
    </Providers>
  )
}