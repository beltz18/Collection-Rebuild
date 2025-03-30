import { Divider as Separator } from "@heroui/divider"

interface DividerProps { className?: string }

export function Divider({ className }: DividerProps){
  return <Separator className={className} />
}