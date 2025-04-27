export interface CompItemProps {
  activeTab: string
  label: string
  isExpanded: (label: string) => boolean
  Icon: React.ReactNode
  setActiveTab: (tab: string) => void
  children: any[] | undefined
  setActiveChildrenTab: (child: string | null) => void
  setActiveChildrenIndex: (tab: number) => void
  toggleExpanded: (label: string) => void
}

export interface CompSubItemProps {
  activeChildrenTab: string | null
  child: {
    label: string
    Icon?: React.ReactNode
  }
  setActiveTab: (tab: string) => void
  label: string
  setActiveChildrenTab: (child: string | null) => void
  isExpanded: (label: string) => boolean
}