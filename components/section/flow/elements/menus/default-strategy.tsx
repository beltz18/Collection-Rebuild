import {
  Menu,
  Item,
} from 'react-contexify'
import { Pencil } from 'lucide-react'

type Props = {
  handleItemClick: ({ id, props }: any) => void
}

export const DefaultStrategy = ({ handleItemClick }: Props) => {
  return (
    <Menu id='default-strategy'>
      <Item
        id='edit-strategy'
        onClick={ handleItemClick }
      >
        <Pencil size={ 14 } />&nbsp;
        Edit strategy
      </Item>
    </Menu>
  )
}