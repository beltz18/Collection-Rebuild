import { SkeletonTable } from '@com/index'
import { Card } from '@com/card/card-loan'
import { NotFound } from '@sec/not-found'
import MenuOptions from '@sec/menufilters'
import { ColumnEx } from '@typ/base'
import { cn } from './cn'

type EmptyProps = {
  title: string
  description: string
  className?: string
}

export const NoResults = ({
  title,
  description,
  className,
}: EmptyProps) => {
  return (
    <Card className={ cn('flex flex-col gap-4 p-4', className) }>
      <NotFound
        title={ title }
        className='h-[440px] flex items-center w-full justify-center'
        description={ description }
      />
    </Card>
  )
}

type LoaderProps = {
  title: string
  columns: ColumnEx[]
  options: number[]
  selected: number
  input: string | null
  setInput: (input: string) => void
  setSelected: React.Dispatch<React.SetStateAction<number>>
  headless?: boolean
}

export const LoadingComp = ({
  title,
  columns,
  options,
  selected,
  input,
  setInput,
  setSelected,
  headless=false,
}: LoaderProps) => {
  return (
    <Card className='flex flex-col gap-4 p-4'>
      {
        !headless && (
          <div className='text-default-600 flex justify-between items-center text-lg'>
            <MenuOptions
              title={ title }
              options={ options }
              selected={ selected }
              input={ input }
              setInput={ setInput }
              setSelected={ setSelected }
            />
          </div>
        )
      }
    
      <SkeletonTable
        columns={ columns }
        rows={ selected }
      />
    </Card>
  )
}