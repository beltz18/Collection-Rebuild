import {
  Loan,
  Payment,
} from '@typ/home-tables'
import { useResponsive } from '@uti/useResponsive'
import { LittleMenu } from './little-menu'
import { BigMenu } from './big-menu'

type Props = {
  title?: string
  cells?: Loan[] | Payment[]
  options: number[]
  selected: number
  setSelected: React.Dispatch<React.SetStateAction<number>>
}

export default function MenuOptions({
  title = 'Page',
  cells,
  options,
  selected,
  setSelected,
}: Props) {
  const { isTablet } = useResponsive()

  if (!isTablet) {
    return (
      <BigMenu
        title={ title }
        cells={ cells }
        options={ options }
        selected={ selected }
        setSelected={ setSelected }
      />
    )
  }

  return (
    <LittleMenu
      title={ title }
      cells={ cells }
      options={ options }
      selected={ selected }
      setSelected={ setSelected }
    />
  )
}