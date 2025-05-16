'use client'

import {
  AlertTriangle,
  FileQuestion,
  AlertCircle,
  Search,
} from 'lucide-react'
import { isValidElement } from 'react'
import { cn } from '@uti/cn'

export type NotFoundIconType =
  'alert-circle' |
  'file-question' |
  'search' |
  'alert-triangle' |
  'custom'

export interface NotFoundProps {
  title?: React.ReactNode
  description?: React.ReactNode

  icon?: NotFoundIconType | React.ReactNode
  iconSize?: number
  iconClassName?: string
  showIcon?: boolean

  className?: string
  containerClassName?: string
  titleClassName?: string
  descriptionClassName?: string

  action?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
}

export const NotFound: React.FC<NotFoundProps> = ({
  title = 'No Results Found',
  description = 'We could not find what you are looking for.',
  icon = 'alert-circle',
  iconSize = 48,
  iconClassName,
  showIcon = true,
  className,
  containerClassName,
  titleClassName,
  descriptionClassName,
  action,
  footer,
  children,
}) => {
  const renderIcon = () => {
    if (!showIcon) return null
    if (isValidElement(icon)) return icon

    const iconClasses = cn('mx-auto mb-4', iconClassName)

    switch (icon) {
      case 'alert-circle':
        return (
          <AlertCircle
            className={ iconClasses }
            size={ iconSize }
          />
        )

      case 'file-question':
        return (
          <FileQuestion
            className={ iconClasses }
            size={ iconSize }
          />
        )

      case 'search':
        return (
          <Search
            className={ iconClasses }
            size={ iconSize }
          />
        )

      case 'alert-triangle':
        return (
          <AlertTriangle
            className={ iconClasses }
            size={ iconSize }
          />
        )

      default:
        return (
          <AlertCircle
            className={ iconClasses }
            size={ iconSize }
          />
        )
    }
  }

  return (
    <div className={ cn('text-center w-full', className) }>
      <div className={ cn('w-full p-8 bg-default-50 rounded-lg', containerClassName) }>
        { renderIcon() }

        {
          title
            &&
          <h3 className={ cn('text-lg font-semibold text-default-600 mb-2', titleClassName) }>
            { title }
          </h3>
        }

        {
          description
            &&
          <p className={ cn('text-default-500', descriptionClassName) }>
            { description }
          </p>
        }

        {
          action
            &&
          <div className='mt-4'>
            { action }
          </div>
        }

        { children }
      </div>

      {
        footer
          &&
        <div className='mt-4'>
          { footer }
        </div>
      }
    </div>
  )
}