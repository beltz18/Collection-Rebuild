import { ModalT } from '../modal.types'
import { cn } from '@uti/cn'

const Body = ({ children, className }: ModalT) => {
  return (
    <div className={cn('text-gray-80 px-2 py-6 flex gap-2 items-center', className)}>
      { children }
    </div>
  )
}

export default Body