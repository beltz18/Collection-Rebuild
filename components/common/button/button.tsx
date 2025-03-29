import { Button as Btn } from '@heroui/button'
import { ButtonProps } from './button.types'
import { cn } from '@/utils/cn'

export const Button : React.FC<ButtonProps> = ({
  placeholder,
  className,
  size='md',
  radius='md',
  onPress,
  ...props
}) => {
  return (
    <Btn
      className={ cn('', className) }
      size={ size }
      radius={ radius }
      onPress={ onPress }
      { ...props }
    >
      { placeholder }
    </Btn>
  )
}