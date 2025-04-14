import { toast } from 'react-toastify'
import {
  ToastT,
  minDuration,
} from '@typ/toast'

type ColorT = { [key:string]: string | undefined }

const Custom = ({ body, title, type='normal' }: ToastT) => {
  const colors: ColorT = {
    'success': 'text-[var(--success-light)]',
    'error':   'text-[var(--danger-light)]',
    'warning': 'text-[var(--warning-light)]',
    'info':    'text-[var(--info-light)]',
    'normal':  'text-white',
  }

  return (
    <div className='w-full min-h-[3rem] h-full flex flex-col justify-around'>
      { title && <p className={`${colors[type]} text-[14px] capitalize font-bold`}>{ title }</p> }
      <p className="text-[12px]">{ body }</p>
    </div>
  )
}

export const successToast = ({
  body,
  title,
  position='top-right',
  duration=minDuration,
  theme='dark',
}: ToastT) => toast.success(<Custom title={ title } body={ body } type='success' />, {
  hideProgressBar: true,
  autoClose: duration,
  position,
  theme,
})

export const errorToast = ({
  body,
  title,
  position='top-right',
  duration=minDuration,
  theme='dark',
}: ToastT) => toast.error(<Custom title={ title } body={ body } type='error' />, {
  hideProgressBar: true,
  autoClose: duration,
  position,
  theme,
})

export const warningToast = ({
  body,
  title,
  position='top-right',
  duration=minDuration,
  theme='dark',
}: ToastT) => toast.warning(<Custom title={ title } body={ body } type='warning' />, {
  hideProgressBar: true,
  autoClose: duration,
  position,
  theme,
})

export const infoToast = ({
  body,
  title,
  position='top-right',
  duration=minDuration,
  theme='dark',
}: ToastT) => toast.info(<Custom title={ title } body={ body } type='info' />, {
  hideProgressBar: true,
  autoClose: duration,
  position,
  theme,
})