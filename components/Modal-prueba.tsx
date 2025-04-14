import { Icon } from "@com/icon"
import { 
  Modal, 
  ModalBody, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalTrigger 
} from "@sec/modal"
import { Button } from "./common"
import { closeModal } from "@sec/modal/modal/modal"

type Props = {
  customTrigger?: React.ReactNode
}

export const ModalPrueba: React.FC<Props> = ({ customTrigger }) => {

  const onDeleteAdvice = async () => {
    closeModal()
  }

  return (
    <Modal>
      <ModalTrigger>
        {customTrigger || (
          <>
            <Icon icon="home" size="lg" />
          </>
        )}
      </ModalTrigger>
      <ModalContent>
        <ModalHeader className="justify-end" />
        <ModalBody>
          <Icon icon="payments" size="2xl" className="text-gray-70" />
          <span className="text-xl font-bold">
            ¿Quieres eliminar el consejo?
          </span>
        </ModalBody>
        <ModalFooter>
          <Button variant="bordered" placeholder="Cancelar" onClick={() => closeModal()} />
          <Button variant="flat" placeholder="Eliminar" onClick={onDeleteAdvice} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}