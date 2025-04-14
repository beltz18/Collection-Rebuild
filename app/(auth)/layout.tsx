'use client'

import { useEffect, useState }     from "react"
import { useRouter }     from "next/navigation" 
import { getSession }    from "@uti/getSession"
import { useTokenStore } from "@sts/useTokenStore"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { token } = useTokenStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const session = getSession()
      if (!session) {
        router.replace("/login")
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [router, token])

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">Loading...</div>
  }

  return <>{children}</>
}