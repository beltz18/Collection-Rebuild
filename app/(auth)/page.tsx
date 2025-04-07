'use client'

import { DefaultLayout } from '@lay/default'
import AuthLayout        from './layout'
import { useTokenStore } from '@sts/useTokenStore'
import { Tooltip } from '@com/tooltip'
import { Button } from '@com/index'
import { Info, AlertCircle } from 'lucide-react'

export default function App() {
  const { clear } = useTokenStore()
  const { token } = useTokenStore()

  const borrarToken = () => {
    clear()
    alert("Token borrado")
  }

  return (
    <AuthLayout>
      <DefaultLayout>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Rerum doloremque amet delectus blanditiis vitae modi, qui
          ipsam nisi nam optio odio expedita odit nesciunt, iste
          possimus? Dolorem reprehenderit provident facilis.
        </p>

        <button 
          type='submit' 
          className="p-3 bg-red-600 text-white rounded-md" 
          onClick={borrarToken}
        >
          Borrar Token
        </button>

        <Tooltip placement='bottom'>
          <Tooltip.Trigger asChild>
            <Button variant="flat" color='warning' placeholder='Tooltip'>
              <Info className="h-5 w-5" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content className="bg-blue-600 text-white">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>Información importante</span>
            </div>
          </Tooltip.Content>
        </Tooltip>
      </DefaultLayout>
    </AuthLayout>
  )
}