type Option = {
  label: string,
  url: string,
  Icon: JSX.Element
}

export interface SidebarOptions {
  up: Option[],
  down: Option[],
}