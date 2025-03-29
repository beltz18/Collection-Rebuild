export interface SidebarContext {
  open: boolean,
  toggle: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SidebarNodes {
  children: React.ReactNode,
} 

export interface SidebarItems {
  children: React.ReactNode,
  active?: boolean,
  setActive?: VoidFunction,
}