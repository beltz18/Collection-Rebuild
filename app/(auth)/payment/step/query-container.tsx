'use client'

import { ComponentContainer } from './component-container'

const  items = ['pay1', 'pay2','pay3','pay4']

export const CardQueryContainer = () => {
  return (
    <div className='w-full min-h-full flex items-center justify-center flex-col gap-4'>
      <ComponentContainer data={ items } />
    </div>
  )
}