import React from "react"
import { 
  Breadcrumbs as Bread, 
  BreadcrumbItem 
} from "@heroui/breadcrumbs"
import { BreadcrumbsProps } from "./breadcrumbs.types"

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <Bread className={className}>
      {items.map((item) => (
        <BreadcrumbItem key={item.href} href={item.href}>
          {item.icon && <item.icon size={12} />}
          <span className="text-sm font-medium">{item.label}</span>
        </BreadcrumbItem>
      ))}
    </Bread>
  )
}