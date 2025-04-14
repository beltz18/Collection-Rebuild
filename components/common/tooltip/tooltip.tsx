'use client'

import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  offset,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import {
  useRef,
  useState,
} from 'react'
import { cn } from '@uti/cn'

type TooltipProps = {
  label: string
  children: React.ReactNode
  className?: string
  side?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

export const Tooltip: React.FC<TooltipProps> = ({
  label,
  children,
  className,
}) => {
  const arrowRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const {refs, floatingStyles, context} = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, {move: false})
  const dismiss = useDismiss(context)
  const role = useRole(context, {
    role: 'tooltip'
  })

  const {
    getReferenceProps,
    getFloatingProps,
  } = useInteractions([hover, dismiss, role])

  return (
    <div className='w-fit'>
      {
        isOpen && (
          <div
            ref={ refs.setFloating }
            style={ floatingStyles }
            className={ cn('px-4 py-2 bg-dark text-gray-0 text-xs w-max rounded z-10', className) }
            { ...getFloatingProps() }
          >
            { label }
            <FloatingArrow
              ref={ arrowRef }
              context={ context }
              width={ 8 }
              height={ 4 }
            />
          </div>
        )
      }

      <div
        ref={ refs.setReference }
        { ...getReferenceProps() }
      >
        { children }
      </div>
    </div>
  )
}