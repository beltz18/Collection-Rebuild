'use client'

import { Breadcrumbs } from "@com/breadcrumbs"
import { Home, Folder, FileText } from "lucide-react"

const navItems = [
  { label: "Inicio", href: "#home", icon: Home },
  { label: "Proyectos", href: "#proyectos", icon: Folder },
  { label: "Detalles", href: "#detalles", icon: FileText }
]

export default function App() {
  return (
    <Breadcrumbs items={navItems} className="text-gray-700" />
  )
}
