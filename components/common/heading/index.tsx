import { HeadingProps } from "./heading.types"

export function Heading ({ level = 1, children, className }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  return <Tag className={className}>{children}</Tag>
}

Heading.displayName = "Heading"