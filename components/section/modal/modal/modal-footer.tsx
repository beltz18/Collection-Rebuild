import { ModalFooter } from "@heroui/modal"
import type { ModalT } from "../modal.types"

const Footer = ({ children }: ModalT) => {
  return <ModalFooter className="pb-[1rem] px-[1rem] flex gap-[1rem] justify-end">{children}</ModalFooter>
}

export default Footer