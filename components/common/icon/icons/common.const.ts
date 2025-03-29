export const iconSize = {
  'xxs': '10px',
  'xs':  '12px',
  'sm':  '16px',
  'md':  '24px',
  'lg':  '32px',
  'xl':  '40px',
  '2xl': '72px',
  '3xl': '138px',
}

export const colsN = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
}

export type IconSizeKeys = keyof typeof iconSize
export type ColsKeys     = keyof typeof colsN