type posT   = 'bottom-center' | 'bottom-left' | 'bottom-right' | 'top-center' | 'top-left' | 'top-right'
type ThemeT = 'light' | 'dark'

export type ToastT = {
  body: string,
  duration?: number,
  title?: string,
  position?: posT,
  theme?: ThemeT,
  type?: string,
}

export const minDuration = 1500