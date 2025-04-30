import {
  Heading,
  SkeletonTable,
} from '@com/index'
import { Card } from '@com/card/card-loan'
import { NotFound } from '@sec/not-found'
import MenuOptions from '@sec/menufilters'
import { ColumnEx } from '@typ/base'

type EmptyProps = {
  title: string
}

export const NoResults = ({
  title,
}: EmptyProps) => {
  return (
    <Card className='flex flex-col gap-4 p-4'>
      <NotFound
        title={ title }
        className='h-[440px] flex items-center w-full justify-center'
        description='There are no loans created yet'
      />
    </Card>
  )
}

type LoaderProps = {
  title: string
  columns: ColumnEx[]
  options: number[]
  selected: number
  setSelected: React.Dispatch<React.SetStateAction<number>>
}

export const LoadingComp = ({
  title,
  columns,
  options,
  selected,
  setSelected,
}: LoaderProps) => {
  return (
    <Card className='flex flex-col gap-4 p-4'>
      <div className='text-default-600 flex justify-between items-center text-lg'>
        <MenuOptions
          title={ title }
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