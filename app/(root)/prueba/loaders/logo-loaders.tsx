"use client"

import { useState } from "react"
import {
  PulseLoader,
  LogoRevealLoader,
  GeometricLoader,
  ProgressLoader,
  WaveLoader,
  GlowLoader,
  ParticleLoader,
} from "@sec/loaders"

export default function Home() {
  const [color, setColor] = useState("#023047")
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("md")
  const [showText, setShowText] = useState(true)

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
        CREDITUM - Animaciones de Carga
      </h1>

      <div className="max-w-5xl mx-auto">
        <div className="mb-8 p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Personalización</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-12 cursor-pointer rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Tamaño</label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value as any)}
                className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              >
                <option value="sm">Pequeño</option>
                <option value="md">Mediano</option>
                <option value="lg">Grande</option>
                <option value="xl">Extra Grande</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Texto</label>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  checked={showText}
                  onChange={(e) => setShowText(e.target.checked)}
                  className="w-5 h-5 mr-3 accent-blue-500"
                />
                <span className="text-gray-700 dark:text-gray-300">Mostrar "Cargando..."</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">1. Pulso</h2>
            <div className="h-40 flex items-center justify-center">
              <PulseLoader color={color} size={size} text={showText} />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Animación de pulso suave que hace que el logo respire
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">2. Revelación</h2>
            <div className="h-40 flex items-center justify-center">
              <LogoRevealLoader color={color} size={size} text={showText} />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Animación de revelación que muestra el logo secuencialmente
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">3. Geométrico</h2>
            <div className="h-40 flex items-center justify-center">
              <GeometricLoader color={color} size={size} text={showText} />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Animación que utiliza solo la parte geométrica del logo
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">4. Progreso</h2>
            <div className="h-40 flex items-center justify-center">
              <ProgressLoader color={color} size={size} text={showText} />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Animación de progreso que revela el logo gradualmente
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">5. Onda</h2>
            <div className="h-40 flex items-center justify-center">
              <WaveLoader color={color} size={size} text={showText} />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Animación de onda que hace que las letras se muevan como una ola
            </p>
          </div>

          {/* <div className="p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">6. Resplandor</h2>
            <div className="h-40 flex items-center justify-center">
              <GlowLoader color={color} size={size} text={showText} />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Efecto de resplandor brillante que se mueve a través del logo
            </p>
          </div> */}


          {/* FALTA ACOMODAR LA ANIMACIÓN PARA QUE DESPUÉS DE LA ANIMACIÓN DE PARTICULAS, FORME BIEN EL NOMBRE DE CREDITERIUM */}
          <div className="p-6 border rounded-xl shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">7. Partículas</h2>
            <div className="h-40 flex items-center justify-center">
              <ParticleLoader color={color} size={size} text={showText} />
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              Animación donde partículas se mueven para formar el logo
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}