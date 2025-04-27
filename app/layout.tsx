import '@sty/globals.css'
import "react-day-picker/style.css"

import { Providers } from './providers'

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head />
      <body>
        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  )
}