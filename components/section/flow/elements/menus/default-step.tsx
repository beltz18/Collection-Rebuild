import {
  Menu,
  Item,
} from 'react-contexify'
import { Pencil } from 'lucide-react'

type Props = {
  handleItemClick: ({ id, props }: any) => void
}

export const DefaultStepsMenu = ({ handleItemClick }: Props) => {
  return (
    <Menu id='default-step'>
      <Item
        id='edit-step'
        onClick={ handleItemClick }
      >
        <Pencil size={ 14 } />&nbsp;
        Edit step
      </Item>
    </Menu>
  )
}