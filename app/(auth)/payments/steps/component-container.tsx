import { Card } from '@com/card/card-loan'
import { Button, Icon } from '@com/index'
import { CustomSelect } from '@com/select/select'

type Props = {
  data: string[]
}
export const ComponentContainer = ({ data }: Props) => {

  return (
    <Card className='p-2 w-full min-w-xl max-w-xl'>
      <Card.Header className='flex justify-center items-center'>
        <p className='font-bold'>Select Payment Strategy</p>
      </Card.Header>
      <Card.Footer className='flex flex-col'>
        <div className='flex flex-col space-y-3 w-full'>
          <span>Payment Strategy</span>
          <CustomSelect variant='bordered' className='w-full' itemsSelect={data} label='Select a strategy' />
          <Button color='primary' placeholder='Continue to Flow Chart' endContent={<Icon icon='arrowRight' />} className='w-full' />
        </div>
      </Card.Footer>
    </Card>
  )
}