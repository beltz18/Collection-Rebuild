import { Card } from '@com/card/card-loan'
import { Button, Icon } from '@com/index'
import { CustomSelect } from '@com/select/select'
import { Heading } from '@com/index'

type Props = {
  data: string[]
}
export const ComponentContainer = ({ data }: Props) => {

  return (
    <Card className='p-2 w-full min-w-xl max-w-xl rounded-sm'>
      <Card.Header className='flex justify-center items-center'>
        <Heading level={1} className='font-bold text-xl'>Select Payment Strategy</Heading>
      </Card.Header>
      <Card.Footer className='flex flex-col'>
        <div className='flex flex-col space-y-3 w-full'>
          <div className='pb-4'>
            <label className='text-sm font-medium block mb-2'>Payment Strategy</label>
            <CustomSelect variant='faded' radius='sm' className='w-full' itemsSelect={data} label='Select a strategy' />
          </div>
          <Button color='primary' placeholder='Continue to Flow Chart' endContent={<Icon icon='arrowRight' />} className='w-full rounded-sm' />
        </div>
      </Card.Footer>
    </Card>
  )
}