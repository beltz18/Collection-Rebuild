import {
  Menu,
  Item,
} from 'react-contexify'
import {
  Pencil,
  Trash,
} from 'lucide-react'

type Props = {
  handleItemClick: ({ id, props }: any) => void
}

export const StrategyWithNoSteps = ({ handleItemClick }: Props) => {
  return (
    <Menu id='lone-strategy'>
      <Item
        id='edit-strategy'
        onClick={ handleItemClick }
      >
        <Pencil size={ 14 } />&nbsp;
        Edit strategy
      </Item>
      
      <Item
        id='delete-strategy'
        onClick={ handleItemClick }
      >
        <span className='w-full flex items-center text-red-600 hover:text-white'>
          <Trash size={ 14 } />&nbsp;
          Delete strategy
        </span>
      </Item>
    </Menu>
  )
}