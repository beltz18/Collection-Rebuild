'use client'

import { Sidebar } from "@sec/index"

export default function App() {
  return (
    <Sidebar>
      <Sidebar.Toggle />
      <Sidebar.Content>
        <Sidebar.Header>
          Head
        </Sidebar.Header>
        
        <Sidebar.Body>
          <Sidebar.Item active>Home</Sidebar.Item>
          <Sidebar.Item>About</Sidebar.Item>
          <Sidebar.Item>Contact</Sidebar.Item>
        </Sidebar.Body>
        
        <Sidebar.Footer>
          Logout
        </Sidebar.Footer>
      </Sidebar.Content>
    </Sidebar>
  )
}