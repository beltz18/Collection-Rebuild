'use client'

import {
  isValidElement,
  createContext,
  cloneElement,
  useContext,
  useState,
  useRef,
} from 'react'
import {
  TooltipContextType,
  TooltipProps,
  TriggerProps,
  ContentProps,
} from './tooltip.types'
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
import { cn } from '@uti/cn'

const TooltipContext = createContext<TooltipContextType | null>(null)

const useTooltip = () => {
  const context = useContext(TooltipContext)
  if (!context)
    throw new Error('useTooltip debe usarse dentro de un TooltipProvider')
  return context
}

const TooltipRoot: React.FC<TooltipProps> = ({
  children,
  defaultOpen = false,
  placement = 'top',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const arrowRef = useRef<SVGSVGElement>(null)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
  })

  const hover = useHover(context, { move: false })
  const dismiss = useDismiss(context)
  const role = useRole(context, {
    role: 'tooltip',
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss, role])

  const value = {
    isOpen,
    setIsOpen,
    refs,
    context,
    floatingStyles,
    arrowRef,
    getReferenceProps,
    getFloatingProps,
  }

  return (
    <TooltipContext.Provider value={ value }>
      <div className='inline-block'>
        { children }
      </div>
    </TooltipContext.Provider>
  )
}

const Trigger: React.FC<TriggerProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const { refs, getReferenceProps } = useTooltip()

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ref: refs.setReference,
      ...getReferenceProps(),
      className: cn(children.props.className, className),
    })
  }

  return (
    <div
      ref={ refs.setReference }
      { ...getReferenceProps() }
      className={ cn('inline-block', className) }
    >
      { children }
    </div>
  )
}

const Content: React.FC<ContentProps> = ({
  children,
  className,
  showArrow = true,
  arrowClassName,
}) => {
  const {
    isOpen,
    refs,
    floatingStyles,
    getFloatingProps,
    context,
    arrowRef,
  } = useTooltip()

  if (!isOpen) return null

  return (
    <div
      ref={ refs.setFloating }
      style={ floatingStyles }
      className={ cn('px-4 py-2 bg-zinc-900 text-white text-xs rounded z-50', className) }
      { ...getFloatingProps() }
    >
      { children }
      {
        showArrow
          &&
        <FloatingArrow
          ref={ arrowRef }
          context={ context }
          width={ 8 }
          height={ 4 }
          className={ cn('fill-zinc-900', arrowClassName) }
        />
      }
    </div>
  )
}

export const Tooltip = Object.assign(TooltipRoot, {
  Trigger,
  Content,
})