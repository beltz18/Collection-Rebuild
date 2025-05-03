import '@sty/globals.css'
import 'react-day-picker/style.css'

import { Metadata } from 'next'
import { ClientProviders } from './client-providers'
import {
  APPNAME,
  DESCRIPTION,
} from '@uti/var'

export const metadata : Metadata = {
  title: APPNAME,
  description: DESCRIPTION,
  keywords: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientProviders>
          { children }
        </ClientProviders>
      </body>
    </html>
  )
}