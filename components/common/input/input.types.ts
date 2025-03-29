export type CustomInputProps = {
  label: string
  type?: string
  name: string
  isRequired: boolean
  className: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
