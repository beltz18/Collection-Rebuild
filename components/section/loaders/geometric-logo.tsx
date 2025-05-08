"use client"

import type React from "react"
import { motion } from "framer-motion"

interface GeometricLoaderProps {
  color?: string
  size?: "sm" | "md" | "lg" | "xl"
  text?: boolean
}

export const GeometricLoader: React.FC<GeometricLoaderProps> = ({ color = "#023047", size = "md", text = true }) => {
  const sizes = {
    sm: { width: 60, height: 60 },
    md: { width: 80, height: 80 },
    lg: { width: 100, height: 100 },
    xl: { width: 120, height: 120 },
  }

  const { width, height } = sizes[size]

  // Solo usamos la parte geométrica del logo (los triángulos)
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative" style={{ width, height }}>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 160 180"
          width={width}
          height={height}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <g fill={color}>
            <motion.path
              d="M151.8,126.8c-2.5,0-4.5-2-4.5-4.5V55.7L81.2,19.7l-57.1,31.1,15,8c2.2,1.2,3,3.9,1.9,6.2-1.2,2.2-3.9,3-6.2,1.9l-22.4-12c-1.5-.8-2.4-2.3-2.4-4s.9-3.2,2.4-4L79,10.6c1.4-.7,3-.7,4.3,0l70.6,38.4c1.5.8,2.4,2.3,2.4,4v69.3c0,2.5-2,4.5-4.5,4.5h0Z"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0,
              }}
            />
            <motion.path
              d="M85.1,184.1c-.7,0-1.5-.2-2.2-.6L12.4,145.2c-1.5-.8-2.4-2.3-2.4-4v-69.3c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5v66.6l66,35.9,57.1-31.1-15-8c-2.2-1.2-3-3.9-1.9-6.2,1.2-2.2,3.9-3,6.2-1.9l22.4,12c1.5.8,2.4,2.3,2.4,4s-.9,3.2-2.4,4l-66.6,36.3c-.7.4-1.4.6-2.2.6h0Z"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </g>
        </motion.svg>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="w-1/3 h-1/3 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {text && (
        <motion.p
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Cargando...
        </motion.p>
      )}
    </div>
  )
}