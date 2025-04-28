import {
  Heading,
  SkeletonTable,
} from '@com/index'
import { Card } from '@com/card/card-loan'
import { NotFound } from '@sec/not-found'
import MenuOptions from '@sec/menufilters'
import { ColumnEx } from '@typ/base'

export const NoResults = () => {
  return (
    <Card className='flex flex-col gap-4 p-4'>
      <div className='text-default-600 flex justify-between items-center text-lg'>
        <Heading
          level={ 1 }
          className='text-theme-text-title/60 text-2xl'
        >
          Loans
        </Heading>
      </div>

      <NotFound
        className='h-[440px] flex items-center w-full justify-center'
        description='There are no loans created yet'
      />
    </Card>
  )
}

type Props = {
  columns: ColumnEx[]
  options: number[]
  selected: number
  setSelected: React.Dispatch<React.SetStateAction<number>>
}

export const LoadingLoans = ({
  columns,
  options,
  selected,
  setSelected,
}: Props) => {
  return (
    <Card className='flex flex-col gap-4 p-4'>
      <div className='text-default-600 flex justify-between items-center text-lg'>
        <MenuOptions
          title='Loans'
          options={ options }
          selected={ selected }
          setSelected={ setSelected }
        />
      </div>
    
      <SkeletonTable
        columns={ columns }
        rows={ selected }
      />
    </Card>
  )
}