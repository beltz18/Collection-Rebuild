import '@sty/globals.css'
import 'react-day-picker/style.css'
import 'react-contexify/dist/ReactContexify.css'
import '@xyflow/react/dist/base.css'

import { Metadata } from 'next'
import { ClientProviders } from './client-providers'
import {
  APPNAME,
  DESCRIPTION,
} from '@uti/var'

export const metadata : Metadata = {
  title: {
    default: APPNAME,
    template: `${APPNAME} | %s`,
  },
  description: DESCRIPTION,
  keywords: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ClientProviders>
          { children }
        </ClientProviders>
      </body>
    </html>
  )
}