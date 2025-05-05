import { Card } from '@com/card/card-loan'
import { CustomSelect } from '@com/select/select'
import { ValueProps } from '@com/select/select.types'
import {
  Heading,
  Button,
  Icon,
} from '@com/index'

type CompProps = {
  data: ValueProps[] | null
  setValue: any
  handleClick: VoidFunction
}

export const StrategySelector = ({
  data,
  setValue,
  handleClick,
}: CompProps) => {
  return (
    <Card className='p-2 w-full max-w-xl rounded-md'>
      <Card.Header className='flex justify-center items-center'>
        <Heading
          level={ 1 }
          className='font-bold text-xl'
        >
          Select Payment Strategy
        </Heading>
      </Card.Header>

      <Card.Footer className='flex flex-col'>
        <div className='flex flex-col space-y-3 w-full'>
          <div className='pb-4'>
            <label className='text-sm font-medium block mb-2'>
              Payment Strategy
            </label>
            
            <CustomSelect
              variant='faded'
              radius='sm'
              className='w-full'
              values={ data }
              label='Select a strategy'
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setValue(e.target.value) }}
            />
          </div>

          <Button
            color='primary'
            placeholder='Continue to Flow Chart'
            endContent={ <Icon icon='arrowRight' /> }
            className='w-full rounded-sm'
            onPress={ handleClick }
          />
        </div>
      </Card.Footer>
    </Card>
  )
}