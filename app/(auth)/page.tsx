'use client'

import { DefaultLayout } from '@lay/default'
import AuthLayout        from './layout'
import { useTokenStore } from '@sts/useTokenStore'

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
      </DefaultLayout>
    </AuthLayout>
  )
}