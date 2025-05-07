import { DefaultStepsMenu } from './menus/default-step'
import { LastStepNotBAsic } from './menus/last-step-not-basic'
import { LastStepBAsic } from './menus/last-step-basic'
import { DefaultStrategy } from './menus/default-strategy'
import { StrategyWithNoSteps } from './menus/strategy-no-steps'

export const ContextMenu = () => {
  const handleItemClick = ({ id, props }: any) => {
    const { type, isBasic, order } = props || {}

    console.log(props)

    switch (id) {
      case 'edit':
        console.log('[Edit]', type, order)
        break

      case 'basic':
        console.log('[Toggle Basic]', isBasic ? 'Revert to normal' : 'Make basic')
        break

      case 'delete':
        console.log('[Delete]', type, order)
        break
    }
  }

  return (
    <>
      <DefaultStepsMenu handleItemClick={ handleItemClick } />
      <LastStepNotBAsic handleItemClick={ handleItemClick } />
      <LastStepBAsic handleItemClick={ handleItemClick } />
      <DefaultStrategy handleItemClick={ handleItemClick } />
      <StrategyWithNoSteps handleItemClick={ handleItemClick } />
    </>
  )
}