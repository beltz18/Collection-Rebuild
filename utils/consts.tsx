import { SidebarOptions } from '@typ/index'
import { Icon } from '@com/icon'

export const options : SidebarOptions = {
  up: [
    {
      label: 'Home',
      url: '/',
      Icon: <Icon icon='home' size='md' />
    },
    {
      label: 'Loans',
      url: '/loans',
      Icon: <Icon icon='loans' size='md' />
    },
    {
      label: "Payments",
      url: "/payments",
      Icon: <Icon icon="payments" size="md" />,
      children: [
        {
          label: "Payments",
          url: "/payments",
        },
        {
          label: "Payment Processors",
          url: "/payments/processors",
        },
        {
          label: "Payment Strategies",
          url: "/payments/strategies",
        },
        {
          label: "Payment Steps",
          url: "/payments/steps",
        },
      ],
    },
    {
      label: 'Activity Logs',
      url: '#',
      Icon: <Icon icon='history' size='md' />
    },
  ],
  down: [
    {
      label: 'Themes',
      url: '#',
      Icon: <Icon icon='changeTheme' size='md' />
    },
    {
      label: 'Logout',
      url: '#',
      Icon: <Icon icon='logout' size='md' />
    },
  ],
}