import { ModalBody } from "@heroui/modal"
import { cn } from "@uti/cn"
import type { ModalT } from "../modal.types"

const Body = ({ children, className }: ModalT) => {
  return <ModalBody className={cn("text-gray-80 px-2 py-6 flex gap-2 items-center", className)}>{children}</ModalBody>
}

export default Body