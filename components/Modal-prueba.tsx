import { 
  Modal, 
  ModalTrigger, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from '@sec/modal'
import { Button } from './common'

export default function MyComponent() {
  return (
    <Modal
      size="lg"
      radius="sm"
      backdrop="blur"
      classNames={{
        backdrop: "bg-black/70",
        base: "border border-white/20",
        header: "border-b border-white/20",
        footer: "border-t border-white/20",
      }}
    >
      <ModalTrigger>
        <Button>Open Custom Modal</Button>
      </ModalTrigger>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Custom Modal</ModalHeader>
            <ModalBody>
              <p>This modal has custom styling</p>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>Close</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}