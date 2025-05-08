import { DefaultStepsMenu } from './menus/default-step'
import { LastStepNotBAsic } from './menus/last-step-not-basic'
import { LastStepBAsic } from './menus/last-step-basic'
import { DefaultStrategy } from './menus/default-strategy'
import { StrategyWithNoSteps } from './menus/strategy-no-steps'

export const ContextMenu = () => {
  const handleItemClick = ({ id, props }: any) => {
    const { type, isBasic, order } = props || {}

    switch (id) {
      case 'edit-step':
        console.log('Edit step')
        break

      case 'edit-strategy':
        console.log('Edit strategy')
        break

      case 'revoke-basic':
        console.log('Revoke basic step')
        break

      case 'make-basic':
        console.log('Make basic step')
        break

      case 'delete-step':
        console.log('Delete step')
        break

      case 'delete-step':
        console.log('Delete strategy')
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