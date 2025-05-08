"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ParticleLoaderProps {
  color?: string
  size?: "sm" | "md" | "lg" | "xl"
  text?: boolean
}

// Definir los puntos clave del logo para las partículas
const getLogoPoints = (width: number, height: number) => {
  // Escalar los puntos según el tamaño
  const scaleX = width / 1072
  const scaleY = height / 194.1

  // Puntos clave del logo (simplificados)
  const basePoints = [
    // C logo
    { x: 72, y: 66 },
    { x: 115, y: 66 },
    { x: 115, y: 76 },
    { x: 75, y: 76 },
    { x: 65, y: 85 },
    { x: 55, y: 97 },
    { x: 55, y: 110 },
    { x: 65, y: 120 },
    { x: 75, y: 127 },
    { x: 115, y: 127 },
    { x: 115, y: 137 },
    { x: 73, y: 137 },

    // Triángulos
    { x: 81, y: 20 },
    { x: 24, y: 51 },
    { x: 39, y: 59 },
    { x: 35, y: 65 },
    { x: 29, y: 67 },
    { x: 12, y: 58 },
    { x: 10, y: 54 },
    { x: 10, y: 50 },
    { x: 12, y: 46 },
    { x: 79, y: 11 },
    { x: 83, y: 11 },
    { x: 154, y: 49 },
    { x: 156, y: 53 },
    { x: 156, y: 122 },
    { x: 152, y: 126 },
    { x: 147, y: 126 },

    // Letras (puntos simplificados)
    { x: 205, y: 63 },
    { x: 253, y: 63 },
    { x: 253, y: 74 },
    { x: 208, y: 74 },
    { x: 197, y: 85 },
    { x: 187, y: 97 },
    { x: 187, y: 119 },
    { x: 209, y: 130 },
    { x: 253, y: 130 },
    { x: 253, y: 141 },
    { x: 206, y: 141 },

    { x: 320, y: 113 },
    { x: 337, y: 130 },
    { x: 319, y: 130 },
    { x: 301, y: 112 },
    { x: 276, y: 112 },
    { x: 276, y: 130 },
    { x: 263, y: 130 },
    { x: 263, y: 63 },
    { x: 317, y: 63 },
    { x: 330, y: 75 },
    { x: 330, y: 88 },
    { x: 317, y: 101 },

    { x: 430, y: 74 },
    { x: 364, y: 74 },
    { x: 364, y: 91 },
    { x: 411, y: 91 },
    { x: 411, y: 102 },
    { x: 364, y: 102 },
    { x: 364, y: 119 },
    { x: 430, y: 119 },
    { x: 430, y: 130 },
    { x: 351, y: 130 },
    { x: 351, y: 63 },
    { x: 430, y: 63 },

    { x: 486, y: 131 },
    { x: 439, y: 131 },
    { x: 439, y: 63 },
    { x: 487, y: 63 },
    { x: 504, y: 75 },
    { x: 517, y: 97 },
    { x: 504, y: 119 },
    { x: 487, y: 131 },

    { x: 532, y: 63 },
    { x: 545, y: 63 },
    { x: 545, y: 131 },
    { x: 532, y: 131 },

    { x: 633, y: 63 },
    { x: 633, y: 74 },
    { x: 600, y: 74 },
    { x: 600, y: 130 },
    { x: 587, y: 130 },
    { x: 587, y: 74 },
    { x: 554, y: 74 },
    { x: 554, y: 63 },

    { x: 721, y: 74 },
    { x: 655, y: 74 },
    { x: 655, y: 91 },
    { x: 702, y: 91 },
    { x: 702, y: 102 },
    { x: 655, y: 102 },
    { x: 655, y: 119 },
    { x: 721, y: 119 },
    { x: 721, y: 130 },
    { x: 642, y: 130 },
    { x: 642, y: 63 },
    { x: 721, y: 63 },

    { x: 788, y: 113 },
    { x: 805, y: 130 },
    { x: 787, y: 130 },
    { x: 769, y: 112 },
    { x: 744, y: 112 },
    { x: 744, y: 130 },
    { x: 731, y: 130 },
    { x: 731, y: 63 },
    { x: 785, y: 63 },
    { x: 798, y: 75 },
    { x: 798, y: 88 },
    { x: 785, y: 101 },

    { x: 823, y: 63 },
    { x: 836, y: 63 },
    { x: 836, y: 131 },
    { x: 823, y: 131 },

    { x: 878, y: 131 },
    { x: 856, y: 131 },
    { x: 846, y: 98 },
    { x: 846, y: 63 },
    { x: 858, y: 63 },
    { x: 858, y: 97 },
    { x: 878, y: 119 },
    { x: 894, y: 119 },
    { x: 916, y: 97 },
    { x: 916, y: 63 },
    { x: 928, y: 63 },
    { x: 928, y: 97 },
    { x: 916, y: 119 },
    { x: 896, y: 131 },

    { x: 1014, y: 79 },
    { x: 984, y: 107 },
    { x: 954, y: 79 },
    { x: 954, y: 131 },
    { x: 941, y: 131 },
    { x: 941, y: 63 },
    { x: 956, y: 63 },
    { x: 984, y: 89 },
    { x: 1012, y: 63 },
    { x: 1027, y: 63 },
    { x: 1027, y: 131 },
    { x: 1014, y: 131 },
  ]

  // Escalar los puntos
  return basePoints.map((point) => ({
    x: point.x * scaleX,
    y: point.y * scaleY,
  }))
}

export const ParticleLoader: React.FC<ParticleLoaderProps> = ({ color = "#023047", size = "md", text = true }) => {
  const sizes = {
    sm: { width: 120, height: 22 },
    md: { width: 180, height: 33 },
    lg: { width: 240, height: 44 },
    xl: { width: 300, height: 55 },
  }

  const { width, height } = sizes[size]
  const [particles, setParticles] = useState<
    { x: number; y: number; targetX: number; targetY: number; size: number }[]
  >([])

  useEffect(() => {
    // Obtener los puntos clave del logo
    const logoPoints = getLogoPoints(width, height)

    // Crear partículas aleatorias
    const newParticles = logoPoints.map((point) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      targetX: point.x,
      targetY: point.y,
      size: Math.random() * 2 + 1,
    }))

    setParticles(newParticles)
  }, [width, height])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative" style={{ width, height }}>
        <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
          {particles.map((particle, index) => (
            <motion.circle
              key={index}
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill={color}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0.8],
                cx: particle.targetX,
                cy: particle.targetY,
                r: [particle.size, particle.size * 1.5, particle.size],
              }}
              transition={{
                duration: Math.random() * 1.5 + 1.5,
                ease: "easeInOut",
                opacity: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: Math.random() * 2 + 1,
                },
                r: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: Math.random() * 2 + 1,
                },
              }}
            />
          ))}
        </motion.svg>

        {/* Logo fantasma para guiar las partículas */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1072 194.1"
          width={width}
          height={height}
          style={{ position: "absolute", top: 0, left: 0, opacity: 0.05 }}
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
        </svg>
      </div>

      {text && (
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <p className="text-sm" style={{ color }}>
            Cargando...
          </p>
        </motion.div>
      )}
    </div>
  )
}