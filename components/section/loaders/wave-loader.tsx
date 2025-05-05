"use client"

import type React from "react"
import { motion } from "framer-motion"

interface WaveLoaderProps {
  color?: string
  size?: "sm" | "md" | "lg" | "xl"
  text?: boolean
}

export const WaveLoader: React.FC<WaveLoaderProps> = ({ color = "#023047", size = "md", text = true }) => {
  const sizes = {
    sm: { width: 120, height: 22 },
    md: { width: 180, height: 33 },
    lg: { width: 240, height: 44 },
    xl: { width: 300, height: 55 },
  }

  const { width, height } = sizes[size]

  // Separamos las letras para animarlas individualmente
  const letters = [
    {
      path: "M72.8,66.8h43.1v10.2h-40c-10.4.4-18.9,9.5-18.9,20.1s8.9,20.3,19.8,20.3h39.1v10.1h-41.9c-15.5-.3-28.6-14.3-28.6-30.4s12.4-29.3,27.4-30.2h0Z",
      delay: 0,
    },
    {
      path: "M205,62.9c.8,0,43.4,0,48.1,0v11.4h-44.7c-11.6.5-21.1,10.6-21.1,22.4s10,22.6,22.1,22.6h43.6v11.3h-46.8c-17.3-.3-31.9-16-31.9-33.9s13.8-32.7,30.6-33.7h0Z",
      delay: 0.1,
    },
    {
      path: "M319.5,113l17.4,17.6h-18.1l-17.8-18h-25.3v18h-12.9V62.8h54.3c13.4.3,24.4,11.5,24.4,24.9s-6.8,20.2-16.9,23.6l-5,1.6h-.1ZM315.7,101.3c7.5,0,13.6-6.1,13.6-13.6s-6.2-13.5-13.6-13.5h-39.9v27.2h39.9Z",
      delay: 0.2,
    },
    { path: "M429.8,74.2h-65.7v16.9h46.9v11.3h-46.9v16.8h65.7v11.3h-78.7V62.8h78.7v11.4Z", delay: 0.3 },
    {
      path: "M486.3,130.6h-46.8V62.9h48.3c16.5,0,30.3,15.5,30.3,33.7s-14.6,33.6-31.9,33.9h.1ZM505.2,96.7c0-11.9-9.4-22-21-22.5h-32v45h10.9c6.2,0,13.7,0,19.9,0,12.2,0,22.1-10.2,22.1-22.6h.1Z",
      delay: 0.4,
    },
    { path: "M531.7,63h12.9v67.6h-12.9V63Z", delay: 0.5 },
    { path: "M632.9,62.8v11.4h-32.9v56.4h-13v-56.4h-32.9v-11.4h78.8Z", delay: 0.6 },
    { path: "M721.3,74.2h-65.7v16.9h46.9v11.3h-46.9v16.8h65.7v11.3h-78.7V62.8h78.7v11.4Z", delay: 0.7 },
    {
      path: "M787.7,113l17.4,17.6h-18.1l-17.8-18h-25.3v18h-12.9V62.8h54.3c13.4.3,24.4,11.5,24.4,24.9s-6.8,20.2-16.9,23.6l-5,1.6h-.1ZM783.8,101.3c7.5,0,13.6-6.1,13.6-13.6s-6.2-13.5-13.6-13.5h-39.9v27.2h39.9Z",
      delay: 0.8,
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1072 194.1" width={width} height={height}>
        <g fill={color}>
          {letters.map((letter, index) => (
            <motion.path
              key={index}
              d={letter.path}
              initial={{ y: 0 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1,
                delay: letter.delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 0.5,
              }}
            />
          ))}

          {/* Elementos geométricos del logo */}
          <motion.path
            d="M151.8,126.8c-2.5,0-4.5-2-4.5-4.5V55.7L81.2,19.7l-57.1,31.1,15,8c2.2,1.2,3,3.9,1.9,6.2-1.2,2.2-3.9,3-6.2,1.9l-22.4-12c-1.5-.8-2.4-2.3-2.4-4s.9-3.2,2.4-4L79,10.6c1.4-.7,3-.7,4.3,0l70.6,38.4c1.5.8,2.4,2.3,2.4,4v69.3c0,2.5-2,4.5-4.5,4.5h0Z"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
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
      </svg>

      {text && (
        <motion.div
          className="flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {["C", "a", "r", "g", "a", "n", "d", "o", ".", ".", "."].map((char, index) => (
            <motion.span
              key={index}
              className="text-sm text-gray-600"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 1,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      )}
    </div>
  )
}