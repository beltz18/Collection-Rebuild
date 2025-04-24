// Custom event system for modals
type ModalEventType = "close" | "open"
type ModalEventPayload = { id?: string }

// Create a custom event emitter for modals
class ModalEventEmitter {
  private listeners: Record<ModalEventType, Array<(payload: ModalEventPayload) => void>> = {
    close: [],
    open: [],
  }

  // Add event listener
  on(event: ModalEventType, callback: (payload: ModalEventPayload) => void) {
    this.listeners[event].push(callback)

    // Return unsubscribe function
    return () => {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback)
    }
  }

  // Emit event
  emit(event: ModalEventType, payload: ModalEventPayload = {}) {
    this.listeners[event].forEach((callback) => callback(payload))
  }
}

// Create a singleton instance
export const modalEvents = new ModalEventEmitter()

// Helper functions
export const closeModal = (id?: string) => {
  modalEvents.emit("close", { id })
}

export const openModal = (id?: string) => {
  modalEvents.emit("open", { id })
}