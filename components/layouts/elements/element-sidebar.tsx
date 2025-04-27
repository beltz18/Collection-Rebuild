import { Sidebar } from '@sec/index'
import {
  CompItemProps,
  CompSubItemProps,
} from '@typ/sidebar'

export const CompItem = ({
  activeTab,
  label,
  isExpanded,
  Icon,
  setActiveTab,
  children,
  setActiveChildrenTab,
  setActiveChildrenIndex,
  toggleExpanded,
}: CompItemProps) => {
  return (
    <Sidebar.Item
      active={ activeTab === label }
      expanded={ isExpanded(label) }
      icon={ Icon }
      setActive={() => {
        setActiveTab(label)
        if (!children) {
          setActiveChildrenTab(null)
          setActiveChildrenIndex(0)
        }
      }}
      setExpanded={() => toggleExpanded(label)}
      hasChildren={ !!children?.length }
      childItems={
        children?.map((child: any) => ({
          ...child,
          setActive: () => {
            setActiveTab(label)
            setActiveChildrenTab(child.label)
          }
        }))
      }
    >
      { label }
    </Sidebar.Item>
  )
}

export const CompSubItem = ({
  activeChildrenTab,
  child,
  setActiveTab,
  label,
  setActiveChildrenTab,
  isExpanded,
}: CompSubItemProps) => {
  return (
    <Sidebar.SubItem
      active={ activeChildrenTab === child.label }
      setActive={() => {
        setActiveTab(label)
        setActiveChildrenTab(child.label)
      }}
      icon={ child.Icon }
      parentExpanded={ isExpanded(label) }
    >
      { child.label }
    </Sidebar.SubItem>
  )
}