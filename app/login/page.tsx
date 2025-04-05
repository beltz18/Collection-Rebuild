'use client'

import { useState } from "react"
import { useTokenStore } from "@sts/useTokenStore"
import { LOGO_ENTITY, LOGO_FOOTER } from "@uti/var"
import { useRouter } from "next/navigation"
import { Heading } from "@com/heading"
import { Input, Button } from "@com/index"
import { Footer } from "@sec/index"
import Image from "next/image"
import { useTheme } from "@ctx/themeContext"

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" })
  const { theme } = useTheme()
  const router = useRouter()
  const setToken = useTokenStore((state) => state.setToken)

  const crearToken = () => {
    const token = "token"
    setToken(token)
    router.push("/")
  }

  const handleField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = () => {
    console.log(formData)
    crearToken()
    // Aquí puedes agregar la lógica para enviar el formulario
  }

  return(
    <>
      <div className="bg-[#f7f7efd9] bg-theme-background w-full h-[100vh] flex justify-center items-center flex-col px-4">
        <Image
          className="pb-8"
          src={ LOGO_ENTITY }
          width={450}
          height={500}
          alt="Crediterium"
          priority
        />

        <div className="max-w-[450px] w-full h-[365px] bg-[#FFFFF] p-4 m-5 rounded-lg flex flex-col justify-around items-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.234)] px-5 border-t-[1px] border-t-[#1212120a]">
          <Heading level={1} className={`text-default-600 font-bold text-[25px]`}>
            Login to Collection
          </Heading>
          <div className="flex flex-col gap-3 w-full ">
            <Input
              type="text"
              label="Username"
              name="username"
              color="default"
              isRequired
              variant="faded"
              radius="sm"
              size="md"
              className="text-default-600"
              onChange={handleField}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              isRequired
              color="default"
              variant="faded"
              radius="sm"
              size="md"
              className="text-default-600"
              onChange={handleField}
            />
            <Button
              placeholder="Sign In"
              className={`mt-3 text-white
                ${
                  theme === 'light'
                    ? 'bg-[#313030e4] text-[#ededed]'
                    : 'bg-theme-primary'
                }
              `}
              size="lg"
              radius="sm"
              onPress={handleSubmit}
            >
              Sign In
            </Button>
          </div>
        </div>

        <footer className="fixed bottom-0 bg-[#161616e0] w-full flex justify-center items-center py-2">
          <Image
            src={ LOGO_FOOTER }
            width={100}
            height={100}
            alt="Lendecy"
            priority
          />
        </footer>
      </div>
    </>
  )
}