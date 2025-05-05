"use client"

import type React from "react"
import { motion } from "framer-motion"

interface GlowLoaderProps {
  color?: string
  size?: "sm" | "md" | "lg" | "xl"
  text?: boolean
}

export const GlowLoader: React.FC<GlowLoaderProps> = ({ color = "#023047", size = "md", text = true }) => {
  const sizes = {
    sm: { width: 120, height: 22 },
    md: { width: 180, height: 33 },
    lg: { width: 240, height: 44 },
    xl: { width: 300, height: 55 },
  }

  const { width, height } = sizes[size]

  // Convertir el color HEX a RGB para poder usarlo en filtros y gradientes
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 }
  }

  const rgb = hexToRgb(color)
  const glowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`
  const lightColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative" style={{ width, height }}>
        {/* Definir filtros para efectos de brillo */}
        <svg width="0" height="0">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={lightColor}>
                <animate attributeName="offset" values="-1; 2" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="10%" stopColor={glowColor}>
                <animate attributeName="offset" values="-0.9; 2.1" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="20%" stopColor={lightColor}>
                <animate attributeName="offset" values="-0.8; 2.2" dur="3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
        </svg>

        {/* Logo base */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1072 194.1"
          width={width}
          height={height}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <g fill={color}>
            <path d="M205,62.9c.8,0,43.4,0,48.1,0v11.4h-44.7c-11.6.5-21.1,10.6-21.1,22.4s10,22.6,22.1,22.6h43.6v11.3h-46.8c-17.3-.3-31.9-16-31.9-33.9s13.8-32.7,30.6-33.7h0Z" />
            <path d="M319.5,113l17.4,17.6h-18.1l-17.8-18h-25.3v18h-12.9V62.8h54.3c13.4.3,24.4,11.5,24.4,24.9s-6.8,20.2-16.9,23.6l-5,1.6h-.1ZM315.7,101.3c7.5,0,13.6-6.1,13.6-13.6s-6.2-13.5-13.6-13.5h-39.9v27.2h39.9Z" />
            <path d="M429.8,74.2h-65.7v16.9h46.9v11.3h-46.9v16.8h65.7v11.3h-78.7V62.8h78.7v11.4Z" />
            <path d="M486.3,130.6h-46.8V62.9h48.3c16.5,0,30.3,15.5,30.3,33.7s-14.6,33.6-31.9,33.9h.1ZM505.2,96.7c0-11.9-9.4-22-21-22.5h-32v45h10.9c6.2,0,13.7,0,19.9,0,12.2,0,22.1-10.2,22.1-22.6h.1Z" />
            <path d="M531.7,63h12.9v67.6h-12.9V63Z" />
            <path d="M632.9,62.8v11.4h-32.9v56.4h-13v-56.4h-32.9v-11.4h78.8Z" />
            <path d="M721.3,74.2h-65.7v16.9h46.9v11.3h-46.9v16.8h65.7v11.3h-78.7V62.8h78.7v11.4Z" />
            <path d="M787.7,113l17.4,17.6h-18.1l-17.8-18h-25.3v18h-12.9V62.8h54.3c13.4.3,24.4,11.5,24.4,24.9s-6.8,20.2-16.9,23.6l-5,1.6h-.1ZM783.8,101.3c7.5,0,13.6-6.1,13.6-13.6s-6.2-13.5-13.6-13.5h-39.9v27.2h39.9Z" />
            <path d="M823.2,63h12.9v67.6h-12.9V63Z" />
            <path d="M877.5,130.6c-16.6-.3-31-14.9-31.8-32.2v-35.6h12.1v33.9c0,12.1,9.8,21.7,22.1,21.7h16.5c12.4,0,22.1-9.7,22.1-21.7v-33.7h12.1v33.7c0,17.8-14.7,33.5-31.7,33.8h-21.5.1Z" />
            <path d="M1013.5,78.6l-30.1,28-30.2-28v52h-13V62.8h15l28.1,26.1,28-26.1h15v67.8h-13v-52h.2Z" />
            <path d="M72.8,66.8h43.1v10.2h-40c-10.4.4-18.9,9.5-18.9,20.1s8.9,20.3,19.8,20.3h39.1v10.1h-41.9c-15.5-.3-28.6-14.3-28.6-30.4s12.4-29.3,27.4-30.2h0Z" />
            <path d="M151.8,126.8c-2.5,0-4.5-2-4.5-4.5V55.7L81.2,19.7l-57.1,31.1,15,8c2.2,1.2,3,3.9,1.9,6.2-1.2,2.2-3.9,3-6.2,1.9l-22.4-12c-1.5-.8-2.4-2.3-2.4-4s.9-3.2,2.4-4L79,10.6c1.4-.7,3-.7,4.3,0l70.6,38.4c1.5.8,2.4,2.3,2.4,4v69.3c0,2.5-2,4.5-4.5,4.5h0Z" />
            <path d="M85.1,184.1c-.7,0-1.5-.2-2.2-.6L12.4,145.2c-1.5-.8-2.4-2.3-2.4-4v-69.3c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5v66.6l66,35.9,57.1-31.1-15-8c-2.2-1.2-3-3.9-1.9-6.2,1.2-2.2,3.9-3,6.2-1.9l22.4,12c1.5.8,2.4,2.3,2.4,4s-.9,3.2-2.4,4l-66.6,36.3c-.7.4-1.4.6-2.2.6h0Z" />
            <path d="M1045.6,146.9c-3.5,0-6.5-1.2-9.1-3.7-2.5-2.5-3.8-5.4-3.8-9s1.3-6.5,3.8-8.9,5.5-3.6,9.1-3.6,6.5,1.2,9,3.6,3.7,5.4,3.7,8.9-1.2,6.5-3.7,9c-2.5,2.4-5.5,3.7-9,3.7ZM1035.4,134.3c0,2.9,1,5.4,2.9,7.5,2,2.1,4.4,3.1,7.4,3.1s5.4-1,7.3-3.1c1.9-2,2.9-4.5,2.9-7.5s-1-5.4-2.9-7.4c-1.9-2-4.4-3-7.3-3s-5.4,1-7.4,3c-2,2-2.9,4.5-2.9,7.4ZM1043,141.6h-2.2v-14.6h5.7c3.3,0,5,1.4,5,4.1s-1.2,3.7-3.7,4l4,6.4h-2.5l-3.8-6.3h-2.5v6.3h0ZM1046,133.4c1,0,1.8-.2,2.3-.5s.8-1,.8-1.8-.2-1.2-.7-1.5-1.3-.6-2.5-.6h-3v4.5h3.1Z" />
          </g>
        </motion.svg>

        {/* Efecto de brillo que se mueve */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1072 194.1"
          width={width}
          height={height}
          style={{ position: "absolute", top: 0, left: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <g style={{ fill: "url(#shine)", filter: "url(#glow)" }}>
            <path d="M205,62.9c.8,0,43.4,0,48.1,0v11.4h-44.7c-11.6.5-21.1,10.6-21.1,22.4s10,22.6,22.1,22.6h43.6v11.3h-46.8c-17.3-.3-31.9-16-31.9-33.9s13.8-32.7,30.6-33.7h0Z" />
            <path d="M319.5,113l17.4,17.6h-18.1l-17.8-18h-25.3v18h-12.9V62.8h54.3c13.4.3,24.4,11.5,24.4,24.9s-6.8,20.2-16.9,23.6l-5,1.6h-.1ZM315.7,101.3c7.5,0,13.6-6.1,13.6-13.6s-6.2-13.5-13.6-13.5h-39.9v27.2h39.9Z" />
            <path d="M429.8,74.2h-65.7v16.9h46.9v11.3h-46.9v16.8h65.7v11.3h-78.7V62.8h78.7v11.4Z" />
            <path d="M486.3,130.6h-46.8V62.9h48.3c16.5,0,30.3,15.5,30.3,33.7s-14.6,33.6-31.9,33.9h.1ZM505.2,96.7c0-11.9-9.4-22-21-22.5h-32v45h10.9c6.2,0,13.7,0,19.9,0,12.2,0,22.1-10.2,22.1-22.6h.1Z" />
            <path d="M531.7,63h12.9v67.6h-12.9V63Z" />
            <path d="M632.9,62.8v11.4h-32.9v56.4h-13v-56.4h-32.9v-11.4h78.8Z" />
            <path d="M721.3,74.2h-65.7v16.9h46.9v11.3h-46.9v16.8h65.7v11.3h-78.7V62.8h78.7v11.4Z" />
            <path d="M787.7,113l17.4,17.6h-18.1l-17.8-18h-25.3v18h-12.9V62.8h54.3c13.4.3,24.4,11.5,24.4,24.9s-6.8,20.2-16.9,23.6l-5,1.6h-.1ZM783.8,101.3c7.5,0,13.6-6.1,13.6-13.6s-6.2-13.5-13.6-13.5h-39.9v27.2h39.9Z" />
            <path d="M823.2,63h12.9v67.6h-12.9V63Z" />
            <path d="M877.5,130.6c-16.6-.3-31-14.9-31.8-32.2v-35.6h12.1v33.9c0,12.1,9.8,21.7,22.1,21.7h16.5c12.4,0,22.1-9.7,22.1-21.7v-33.7h12.1v33.7c0,17.8-14.7,33.5-31.7,33.8h-21.5.1Z" />
            <path d="M1013.5,78.6l-30.1,28-30.2-28v52h-13V62.8h15l28.1,26.1,28-26.1h15v67.8h-13v-52h.2Z" />
            <path d="M72.8,66.8h43.1v10.2h-40c-10.4.4-18.9,9.5-18.9,20.1s8.9,20.3,19.8,20.3h39.1v10.1h-41.9c-15.5-.3-28.6-14.3-28.6-30.4s12.4-29.3,27.4-30.2h0Z" />
            <path d="M151.8,126.8c-2.5,0-4.5-2-4.5-4.5V55.7L81.2,19.7l-57.1,31.1,15,8c2.2,1.2,3,3.9,1.9,6.2-1.2,2.2-3.9,3-6.2,1.9l-22.4-12c-1.5-.8-2.4-2.3-2.4-4s.9-3.2,2.4-4L79,10.6c1.4-.7,3-.7,4.3,0l70.6,38.4c1.5.8,2.4,2.3,2.4,4v69.3c0,2.5-2,4.5-4.5,4.5h0Z" />
            <path d="M85.1,184.1c-.7,0-1.5-.2-2.2-.6L12.4,145.2c-1.5-.8-2.4-2.3-2.4-4v-69.3c0-2.5,2-4.5,4.5-4.5s4.5,2,4.5,4.5v66.6l66,35.9,57.1-31.1-15-8c-2.2-1.2-3-3.9-1.9-6.2,1.2-2.2,3.9-3,6.2-1.9l22.4,12c1.5.8,2.4,2.3,2.4,4s-.9,3.2-2.4,4l-66.6,36.3c-.7.4-1.4.6-2.2.6h0Z" />
            <path d="M1045.6,146.9c-3.5,0-6.5-1.2-9.1-3.7-2.5-2.5-3.8-5.4-3.8-9s1.3-6.5,3.8-8.9,5.5-3.6,9.1-3.6,6.5,1.2,9,3.6,3.7,5.4,3.7,8.9-1.2,6.5-3.7,9c-2.5,2.4-5.5,3.7-9,3.7ZM1035.4,134.3c0,2.9,1,5.4,2.9,7.5,2,2.1,4.4,3.1,7.4,3.1s5.4-1,7.3-3.1c1.9-2,2.9-4.5,2.9-7.5s-1-5.4-2.9-7.4c-1.9-2-4.4-3-7.3-3s-5.4,1-7.4,3c-2,2-2.9,4.5-2.9,7.4ZM1043,141.6h-2.2v-14.6h5.7c3.3,0,5,1.4,5,4.1s-1.2,3.7-3.7,4l4,6.4h-2.5l-3.8-6.3h-2.5v6.3h0ZM1046,133.4c1,0,1.8-.2,2.3-.5s.8-1,.8-1.8-.2-1.2-.7-1.5-1.3-.6-2.5-.6h-3v4.5h3.1Z" />
          </g>
        </motion.svg>

        {/* Partículas brillantes */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                backgroundColor: color,
                boxShadow: `0 0 6px 2px ${glowColor}`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      </div>

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
              className="text-sm"
              style={{ color }}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.08,
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