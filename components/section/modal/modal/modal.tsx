'use client'

import { Icon } from '@com/icon'
import { Overlay } from '../overlay'
import { ModalCtx } from '../modal.types'
import { cn } from '@uti/cn'
import {
  createContext,
  useContext,
  useState,
} from 'react'

export const ModalContext = createContext<ModalCtx | null>(null)

const helperModalId = '_modal:locator'

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false)
  const closeModal = () => setOpen(false)

  return (
    <ModalContext.Provider value={{ open, setOpen, closeModal }}>
      <div>
        { children }
      </div>
    </ModalContext.Provider>
  )
}

export const ModalTrigger = ({ children }: { children: React.ReactNode }) => {
  const { setOpen } = useModalContext()

  return (
    <div onClick={() => setOpen(true)}>
      { children }
    </div>
  )
}

export const ModalContent = ({ children }: { children: React.ReactNode }) => {
  const { open, closeModal } = useModalContext()
  if (!open) return

  return (
    <Overlay
      className='flex items-center justify-center'
      onClickBackdrop={() => closeModal()}
      position='center'
      fullscreen={false}
      contentClassName='max-w-[37.5rem] rounded-lg' // 600px, modal max width
      type='modal'
    >
      { children }
    </Overlay>
  )
}
export const ModalHeader = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  const { closeModal } = useModalContext()

  return (
    <div className={cn('w-full bg-dark text-white h-[2.5rem] p-[.75rem] flex items-center justify-between', className)}>
      { children && children }

      <span
        id={helperModalId}
        className='cursor-pointer'
        onClick={() => closeModal()}
      >
        <Icon
          icon='cross'
          size='md'
        />
      </span>
    </div>
  )
}

const useModalContext = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('Modal must be used within a ModalProvider')
    
  return ctx
}

export const closeModal = () => {
  const modalLocator = document.getElementById(helperModalId)
  if (!modalLocator) return

  modalLocator.click()

  return
}