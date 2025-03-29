import type { ButtonProps as BtnT } from "@heroui/button"

export interface ButtonProps extends BtnT {
  className?: string,
  placeholder: string,
}