import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SidebarContext } from '@sec/sidebar/sidebar.types'

interface StateProps extends SidebarContext {
  activeTab: string,
  activeChildrenTab: string | null,
  activeChildrenIndex: number
  setActiveTab: (tab: string) => void
  setActiveChildrenTab: (child: string | null) => void
  setActiveChildrenIndex: (tab: number) => void
  clear: VoidFunction
}

export const useSidebarStore = create<StateProps>()(
  persist(
    (set) => ({
      activeTab: 'Home',
      activeChildrenTab: null,
      activeChildrenIndex: 0,
      setActiveTab: (tab) => set({ activeTab: tab }),
      setActiveChildrenTab: (child) => set({ activeChildrenTab: child }),
      setActiveChildrenIndex: (tab: number) => set({ activeChildrenIndex: tab }),
      open: true,
      setOpen: (open) => set({ open }),
      clear: () => set({
        activeChildrenTab: null,
        activeChildrenIndex: 0,
      })
    }),
    { name: 'sidebar-storage' }
  )
)