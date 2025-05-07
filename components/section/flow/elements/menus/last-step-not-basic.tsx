import {
  Menu,
  Item,
} from 'react-contexify'
import {
  Pencil,
  Trash,
  CircleCheck,
} from 'lucide-react'

type Props = {
  handleItemClick: ({ id, props }: any) => void
}

export const LastStepNotBAsic = ({ handleItemClick }: Props) => {
  return (
    <Menu id='last-step-not-basic'>
      <Item
        id='edit-step'
        onClick={ handleItemClick }
      >
        <Pencil size={ 14 } />&nbsp;
        Edit step
      </Item>
      
      <Item
        id='make-basic'
        onClick={ handleItemClick }
      >
        <CircleCheck size={ 14 } />&nbsp;
        Mark step as basic
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