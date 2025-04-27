import { SidebarOptions } from '@typ/index'
import { Icon } from '@com/icon'
import { cn } from './cn'

export const options : SidebarOptions = {
  up: [
    {
      label: 'Home',
      url: '/',
      Icon: <Icon icon='home' size='md' />,
    },
    {
      label: 'Loans',
      url: '/loan',
      Icon: <Icon icon='loans' size='md' />,
    },
    {
      label: "Payments",
      Icon: <Icon icon="payments" size="md" />,
      children: [
        {
          label: "Payments",
          url: "/payment",
        },
        {
          label: "Payment Processors",
          url: "/payment/processor",
        },
        {
          label: "Payment Strategies",
          url: "/payment/strategy",
        },
        {
          label: "Payment Steps",
          url: "/payment/step",
        },
      ],
    },
    {
      label: 'Activity Logs',
      url: '/log',
      Icon: <Icon icon='history' size='md' />,
    },
  ],
  down: [
    {
      label: 'Themes',
      Icon: <Icon icon='changeTheme' size='md' />,
    },
    {
      label: 'Logout',
      Icon: <Icon icon='logout' size='md' />,
    },
  ],
}

export const VerticalDotsIcon = ({
  size = 24,
  width,
  height,
  className,
  ...props
}: {
  size?: number;
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      focusable='false'
      height={ size || height }
      role='presentation'
      viewBox='0 0 24 24'
      width={ size || width }
      className={ cn('', className) }
      { ...props }
    >
      <path
        d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
        fill='currentColor'
      />
    </svg>
  )
}