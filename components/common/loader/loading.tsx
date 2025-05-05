import { Loader } from './loader'

export const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen bg-gray-100'>
      <div className='flex flex-col gap-3 items-center justify-center'>
        <Loader />
        <span className='text-theme-text-default'>Loading...</span>
      </div>
    </div>
  )
}