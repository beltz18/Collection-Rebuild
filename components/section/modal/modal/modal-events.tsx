type ModalEventType = 'close' | 'open'
type ModalEventPayload = { id?: string }

class ModalEventEmitter {
  private listeners: Record<ModalEventType, Array<(payload: ModalEventPayload) => void>> = {
    close: [],
    open: [],
  }

  on(event: ModalEventType, callback: (payload: ModalEventPayload) => void) {
    this.listeners[event].push(callback)

    return () =>
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback)
  }

  emit(event: ModalEventType, payload: ModalEventPayload = {}) {
    this.listeners[event].forEach((callback) => callback(payload))
  }
}

export const modalEvents = new ModalEventEmitter()

export const closeModal = (id?: string) =>
  modalEvents.emit('close', { id })

export const openModal = (id?: string) =>
  modalEvents.emit('open', { id })