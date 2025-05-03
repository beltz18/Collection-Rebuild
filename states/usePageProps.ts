import { create } from 'zustand'

type Props = {
  title: string | null,
  setTitle: (title: string) => void
  clear: VoidFunction
}

export const usePageProps = create<Props>()((set) => ({
  title: null,
  setTitle: (title) => set({ title }),
  clear: () => set({
    title: null,
  })
}))