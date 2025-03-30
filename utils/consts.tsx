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
      url: '/',
      Icon: <Icon icon='loans' size='md' />
    },
    {
      label: 'Payments',
      url: '/',
      Icon: <Icon icon='payments' size='md' />
    },
    {
      label: 'Activity Logs',
      url: '/',
      Icon: <Icon icon='history' size='md' />
    },
  ],
  down: [
    {
      label: 'Themes',
      url: '/',
      Icon: <Icon icon='changeTheme' size='md' />
    },
    {
      label: 'Logout',
      url: '/',
      Icon: <Icon icon='logout' size='md' />
    },
  ],
}