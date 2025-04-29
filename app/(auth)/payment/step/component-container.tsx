import { Flow as CustomFlow } from '@sec/flow/flow'

type Props = {
  data: any
}

export const ComponentContainer = ({ data }: Props) => {
  return (
    <div className='w-full h-full'>
      <CustomFlow />
    </div>
  )
}