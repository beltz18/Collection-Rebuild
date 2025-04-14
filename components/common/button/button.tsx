import { Button as Btn } from '@heroui/button'
import { ButtonProps } from './button.types'
import { cn } from '@uti/cn'

export const Button : React.FC<ButtonProps> = ({
  placeholder,
  className,
  size='md',
  radius='md',
  ...props
}) => {
  return (
    <Btn
      className={ cn('', className) }
      size={ size }
      radius={ radius }
      { ...props }
    >
      { placeholder }
    </Btn>
  )
}