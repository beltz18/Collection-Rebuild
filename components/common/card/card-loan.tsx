"use client"

import type { CardLoan } from "./card.types"
import { cn } from "@uti/cn"
import { Card as Content, CardHeader as Header, CardBody as Body, CardFooter as Footer } from "@heroui/card"

export function Card({ children, className }: CardLoan) {
  return (
    <Content
      className={cn(
        "w-full border border-[#00000018] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 overflow-hidden",
        className,
      )}
    >
      {children}
    </Content>
  )
}

function CardHeader({ children, className }: CardLoan) {
  return (
    <Header
      className={cn(
        "flex justify-between items-center bg-currentColor font-medium text-default-600 dark:bg-gray-800",
        className,
      )}
    >
      {children}
    </Header>
  )
}

function CardBody({ children, className }: CardLoan) {
  return (
    <Body className={cn("bg-currentColor font-medium text-default-600 dark:bg-gray-800 space-y-4", className)}>
      {children}
    </Body>
  )
}

function CardFooter({ children, className }: CardLoan) {
  return (
    <Footer
      className={cn(
        "bg-currentColor font-medium text-default-600 dark:bg-gray-800 border-t border-default-200 dark:border-default-100/40",
        className,
      )}
    >
      {children}
    </Footer>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter