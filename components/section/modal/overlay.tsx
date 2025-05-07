'use client'

import { CUSTOM_DATA_ATTRIBUTES } from './constants'
import { FloatingPortal } from '@floating-ui/react'
import { cn } from '@uti/cn'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

type Props = {
  children: React.ReactNode
  fullscreen?: boolean
  className?: string
  contentClassName?: string
  type?: 'modal' | 'drawer'
  onClickBackdrop?: () => void
  position?: 'left' | 'center' | 'right'
}

const pos = {
  left: 'left-0',
  center: '',
  right: 'right-0',
}

const modalVariant = {
  hidden: { scale: 0.1 },
  visible: { scale: 1 },
  exit: { scale: 0.1 },
}

const drawerVariant = {
  hidden: { x: '100%' },
  visible: { x: 0 },
  exit: { x: '100%' },
}

export const Overlay = ({
  children,
  className,
  position = 'right',
  onClickBackdrop,
  fullscreen = true,
  contentClassName,
  type = 'modal',
}: Props) => {
  useEffect(() => {
    const body = document.querySelector('body')
    body?.setAttribute(CUSTOM_DATA_ATTRIBUTES.SCROLL_LOCKED.data, CUSTOM_DATA_ATTRIBUTES.SCROLL_LOCKED.values.open)
    return () => body?.removeAttribute(CUSTOM_DATA_ATTRIBUTES.SCROLL_LOCKED.data)
  }, [])

  return (
    <FloatingPortal>
      <div className={ cn('fixed z-50 inset-0', className) }>
        <div
          className={
            cn(
              'w-screen bg-black opacity-50 h-full absolute left-0 top-0 z-[60]',
              onClickBackdrop && 'cursor-pointer',
            )
          }
          onClick={(e) => {
            e.stopPropagation()
            onClickBackdrop?.()
          }}
        />

        <motion.div
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={ type === 'modal' ? modalVariant : drawerVariant }
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={
            cn(
              `absolute ${pos[position]} bg-background max-w-2xl w-full grid grid-rows-[auto_1fr_auto] z-[70]`,
              fullscreen && 'h-full',
              contentClassName,
            )
          }
        >
          { children }
        </motion.div>
      </div>
    </FloatingPortal>
  )
}