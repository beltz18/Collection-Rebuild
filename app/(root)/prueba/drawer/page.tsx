"use client"

import type React from "react"

import { useState } from "react"
import { Button, Input, Checkbox, RadioGroup, Radio } from "@heroui/react"
import { CustomDrawer } from "@com/drawer"
import { Menu, Settings, User, ShoppingCart, HelpCircle } from "lucide-react"

export default function DrawerExamples() {
  const [isBasicOpen, setIsBasicOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isCustomOpen, setIsCustomOpen] = useState(false)
  const [isFullOpen, setIsFullOpen] = useState(false)
  const [isTopOpen, setIsTopOpen] = useState(false)

  return (
    <div className="p-8 space-y-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Drawer Examples</h2>
        <p className="text-default-600">
          Examples of different drawer configurations using the CustomDrawer component.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button color="primary" onPress={() => setIsBasicOpen(true)}>
          Basic Drawer
        </Button>
        <Button color="secondary" onPress={() => setIsFormOpen(true)}>
          Form Drawer
        </Button>
        <Button color="success" onPress={() => setIsCustomOpen(true)}>
          Custom Styled Drawer
        </Button>
        <Button color="warning" onPress={() => setIsFullOpen(true)}>
          Full Screen Drawer
        </Button>
        <Button color="danger" onPress={() => setIsTopOpen(true)}>
          Top Drawer
        </Button>
      </div>

      {/* Basic Drawer */}
      <CustomDrawer isOpen={isBasicOpen} onClose={() => setIsBasicOpen(false)} title="Basic Drawer" size="sm">
        <div className="space-y-6">
          <p>This is a basic drawer with default styling and behavior.</p>
          <p>
            The CustomDrawer component makes it easy to create consistent drawers throughout your application while
            allowing for customization when needed.
          </p>
        </div>
      </CustomDrawer>

      {/* Form Drawer */}
      <CustomDrawer
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Edit Profile"
        size="md"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="flat" color="danger" onPress={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={() => setIsFormOpen(false)}>
              Save Changes
            </Button>
          </div>
        }
      >
        <form className="space-y-6">
          <Input label="Full Name" placeholder="Enter your full name" defaultValue="John Doe" variant="bordered" />
          <Input
            label="Email Address"
            placeholder="Enter your email"
            defaultValue="john.doe@example.com"
            variant="bordered"
          />
          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            defaultValue="+1 (555) 123-4567"
            variant="bordered"
          />
          <div className="space-y-2">
            <p className="text-sm font-medium">Notification Preferences</p>
            <div className="space-y-2">
              <Checkbox defaultSelected>Email notifications</Checkbox>
              <Checkbox>SMS notifications</Checkbox>
              <Checkbox defaultSelected>Push notifications</Checkbox>
            </div>
          </div>
        </form>
      </CustomDrawer>

      {/* Custom Styled Drawer */}
      <CustomDrawer
        isOpen={isCustomOpen}
        onClose={() => setIsCustomOpen(false)}
        title={
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <span className="text-xl font-bold text-primary">Custom Settings</span>
          </div>
        }
        size="md"
        placement="right"
        backdrop="blur"
        className="border-l border-primary/20"
        headerClassName="bg-primary-50 dark:bg-primary-900/20"
        bodyClassName="bg-gradient-to-b from-primary-50/50 to-white dark:from-primary-900/10 dark:to-background"
        footerClassName="bg-primary-50 dark:bg-primary-900/20 border-t border-primary/20"
        footer={
          <div className="flex justify-between w-full">
            <Button variant="flat" color="danger" onPress={() => setIsCustomOpen(false)}>
              Reset
            </Button>
            <Button color="primary" onPress={() => setIsCustomOpen(false)}>
              Apply Settings
            </Button>
          </div>
        }
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Theme Settings</h3>
            <RadioGroup label="Choose a theme" defaultValue="system">
              <Radio value="light">Light</Radio>
              <Radio value="dark">Dark</Radio>
              <Radio value="system">System</Radio>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Display Settings</h3>
            <div className="space-y-2">
              <Checkbox defaultSelected>Show animations</Checkbox>
              <Checkbox defaultSelected>Enable dark mode</Checkbox>
              <Checkbox>Reduce motion</Checkbox>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Privacy Settings</h3>
            <div className="space-y-2">
              <Checkbox defaultSelected>Allow cookies</Checkbox>
              <Checkbox>Share usage data</Checkbox>
              <Checkbox defaultSelected>Show personalized content</Checkbox>
            </div>
          </div>
        </div>
      </CustomDrawer>

      {/* Full Screen Drawer */}
      <CustomDrawer
        isOpen={isFullOpen}
        onClose={() => setIsFullOpen(false)}
        title={
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-6" />
            <span className="text-xl font-bold">Navigation</span>
          </div>
        }
        size="full"
        placement="left"
        backdrop="blur"
      >
        <div className="flex flex-col h-full">
          <div className="space-y-8 py-4">
            <div className="space-y-2">
              <p className="text-sm text-default-500 px-4">MAIN NAVIGATION</p>
              <NavItem icon={<User />} label="Profile" />
              <NavItem icon={<ShoppingCart />} label="Orders" />
              <NavItem icon={<Settings />} label="Settings" />
              <NavItem icon={<HelpCircle />} label="Help & Support" />
            </div>
          </div>
          <div className="mt-auto p-4 border-t">
            <Button color="danger" variant="flat" className="w-full" onPress={() => setIsFullOpen(false)}>
              Sign Out
            </Button>
          </div>
        </div>
      </CustomDrawer>

      {/* Top Drawer */}
      <CustomDrawer
        isOpen={isTopOpen}
        onClose={() => setIsTopOpen(false)}
        title="Notifications"
        size="xs"
        placement="top"
        backdrop="blur"
      >
        <div className="space-y-4">
          <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            <p className="font-medium">New message from John Doe</p>
            <p className="text-sm text-default-500">Hey, how's it going? Just checking in...</p>
            <p className="text-xs text-default-400 mt-1">2 minutes ago</p>
          </div>
          <div className="p-3 bg-success-50 dark:bg-success-900/20 rounded-lg">
            <p className="font-medium">Payment successful</p>
            <p className="text-sm text-default-500">Your subscription has been renewed.</p>
            <p className="text-xs text-default-400 mt-1">1 hour ago</p>
          </div>
          <div className="p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
            <p className="font-medium">System update</p>
            <p className="text-sm text-default-500">The system will be updated in 30 minutes.</p>
            <p className="text-xs text-default-400 mt-1">3 hours ago</p>
          </div>
        </div>
      </CustomDrawer>
    </div>
  )
}

// Helper component for the full screen drawer
const NavItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-3 px-4 py-3 hover:bg-default-100 cursor-pointer transition-colors rounded-lg mx-2">
    {icon}
    <span className="font-medium">{label}</span>
  </div>
)