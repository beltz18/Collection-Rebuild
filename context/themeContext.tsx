'use client'

import 
  React, { 
    createContext, 
    useContext, 
    useEffect, 
    useState 
} from 'react'

export type Theme = 'light' | 'dark' | 'red' | 'blue'
type FlowTheme = 'dark' | 'light' | 'system'

interface ThemeContextType {
  theme: Theme
  flowTheme: FlowTheme
  setTheme: (theme: Theme) => void
  setFlowTheme: (theme: FlowTheme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [flowTheme, setFlowTheme] = useState<FlowTheme>('light')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme
    if (storedTheme) setTheme(storedTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        flowTheme,
        setTheme,
        setFlowTheme,
      }}
    >
      { children }
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')
  return context
}