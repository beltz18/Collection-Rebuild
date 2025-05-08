import {
  Menu,
  Item,
} from 'react-contexify'
import {
  Pencil,
  Trash,
  CircleX,
} from 'lucide-react'

type Props = {
  handleItemClick: ({ id, props }: any) => void
}

export const LastStepBAsic = ({ handleItemClick }: Props) => {
  return (
    <Menu id='last-step-basic'>
      <Item
        id='edit-step'
        onClick={ handleItemClick }
      >
        <Pencil size={ 14 } />&nbsp;
        Edit step
      </Item>
      
      <Item
        id='revoke-basic'
        onClick={ handleItemClick }
      >
        <CircleX size={ 14 } />&nbsp;
        Revoke basic step
      </Item>

      <Item
        id='delete-step'
        onClick={ handleItemClick }
      >
        <span className='w-full flex items-center text-red-600 hover:text-white'>
          <Trash size={ 14 } />&nbsp;
          Delete step
        </span>
      </Item>
    </Menu>
  )
}