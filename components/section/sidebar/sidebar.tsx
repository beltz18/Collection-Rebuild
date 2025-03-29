import { useState, createContext, useContext, Dispatch, SetStateAction } from "react"

const SidebarContext = createContext<{
  open: boolean
  toggle: Dispatch<SetStateAction<boolean>>
}>({
  open: true,
  toggle: () => {},
})

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [open, toggle] = useState(false)

  return (
    <SidebarContext.Provider value={{ open, toggle }}>
      { children }
    </SidebarContext.Provider>
  )
}

function Trigger () {
  const { open, toggle } = useContext(SidebarContext)

  return (
    <button
      onClick={() => toggle(!open)}
      className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
    >
      { open ? "Close Sidebar" : "Open Sidebar" }
    </button>
  )
}

function Content ({ children }: { children: React.ReactNode }) {
  const { open } = useContext(SidebarContext)

  return (
    <div
      className={`fixed top-0 left-0 h-full flex justify-between flex-col bg-gray-800 text-white transition-transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } w-64`}
    >
      { children }
    </div>
  )
}

function Header ({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 bg-gray-900 text-white font-bold border-b border-gray-700">
      {children}
    </div>
  )
}

function Body ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-start h-full">
      { children }
    </div>
  )
}


function Footer ({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 bg-gray-900 text-white border-t border-gray-700">
      {children}
    </div>
  )
}

function Item ({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 border-b border-gray-700 hover:bg-gray-700">
      {children}
    </div>
  )
}

Sidebar.Toggle = Trigger
Sidebar.Content = Content
Sidebar.Header = Header
Sidebar.Body = Body
Sidebar.Footer = Footer
Sidebar.Item = Item