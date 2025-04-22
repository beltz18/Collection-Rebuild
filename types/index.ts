type Option = {
  label: string,
  url: string,
  Icon?: JSX.Element
  children?: Option[]
}

export interface SidebarOptions {
  up: Option[],
  down: Option[],
}