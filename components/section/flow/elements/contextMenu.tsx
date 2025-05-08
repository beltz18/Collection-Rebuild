import { DefaultStepsMenu } from './menus/default-step'
import { LastStepNotBAsic } from './menus/last-step-not-basic'
import { LastStepBAsic } from './menus/last-step-basic'
import { DefaultStrategy } from './menus/default-strategy'
import { StrategyWithNoSteps } from './menus/strategy-no-steps'
import {
  ContextMenuProps,
} from './types'


export const ContextMenu = ({
  setModalType,
  setSelectedType,
  setIsOpen,
}: ContextMenuProps) => {
  const handleItemClick = ({ id, props }: any) => {
    const { type, isBasic, order } = props || {}

    switch (id) {
      case 'edit-step':
        console.log('Edit step')
        setSelectedType('step')
        setModalType({ modal: 'edit', id: props.id })
        setIsOpen(true)
        break

      case 'edit-strategy':
        console.log('Edit strategy')
        setSelectedType('strategy')
        setModalType({ modal: 'edit' })
        setIsOpen(true)
        break

      case 'revoke-basic':
        console.log('Revoke basic step')
        setSelectedType('step')
        setModalType({ modal: 'revoke' })
        setIsOpen(true)
        break

      case 'make-basic':
        console.log('Make basic step')
        setSelectedType('step')
        setModalType({ modal: 'make' })
        setIsOpen(true)
        break

      case 'delete-step':
        console.log('Delete step')
        setSelectedType('step')
        setModalType({ modal: 'delete' })
        setIsOpen(true)
        break

      case 'delete-strategy':
        console.log('Delete strategy')
        setSelectedType('strategy')
        setModalType({ modal: 'delete' })
        setIsOpen(true)
        break
    }
  }

  return (
    <>
      <DefaultStepsMenu    handleItemClick={ handleItemClick } />
      <LastStepNotBAsic    handleItemClick={ handleItemClick } />
      <LastStepBAsic       handleItemClick={ handleItemClick } />
      <DefaultStrategy     handleItemClick={ handleItemClick } />
      <StrategyWithNoSteps handleItemClick={ handleItemClick } />
    </>
  )
}