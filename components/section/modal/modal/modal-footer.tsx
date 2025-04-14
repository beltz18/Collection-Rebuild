import { ModalT } from '../modal.types'

const Footer = ({ children }: ModalT) => {
  return (
    <>
      <div className='pb-[1rem] px-[1rem] flex gap-[1rem] justify-end'>
        { children }
      </div>
    </>
  )
}

export default Footer