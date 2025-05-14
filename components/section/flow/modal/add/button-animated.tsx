"use client"

import { 
  useState, 
  useEffect 
} from "react"
import { 
  PlusCircle, 
  Loader2, 
  type LucideIcon 
} from "lucide-react"

interface AnimatedButtonIconProps {
  isSubmitting: boolean
  icon?: LucideIcon
}

export const AnimatedButtonIcon = ({ isSubmitting, icon }: AnimatedButtonIconProps) => {
  const [showLoader, setShowLoader] = useState(false)
  const IconComponent = icon || PlusCircle

  useEffect(() => {
    if (isSubmitting) {
      setShowLoader(true)
    } else {
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isSubmitting])

  return (
    <div className="relative w-5 h-5 mr-1">
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          showLoader ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <Loader2 size={18} className="animate-spin" />
      </div>

      <div
        className={`absolute inset-0 transition-all duration-300 ${
          !showLoader ? "opacity-100 scale-100" : "opacity-0 scale-125"
        }`}
      >
        <IconComponent size={18} className={isSubmitting ? "animate-pulse" : ""} />
      </div>
    </div>
  )
}