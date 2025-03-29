export interface SidebarContext {
  isOpen: boolean,
}

export interface SidebarNodes {
  children: React.ReactNode,
} 

export interface SidebarProps {
  className?: string,
  children: React.ReactNode,
}