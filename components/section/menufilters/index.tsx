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
  input: string | null
  setInput: (input: string) => void
  setSelected: React.Dispatch<React.SetStateAction<number>>
  handlerDownload: (title: 'Loan' | 'Payment', data: Loan[] | Payment[], type: 'CSV' | 'PDF') => void
  page: 'Loan' | 'Payment'
}

export default function MenuOptions({
  title = 'Page',
  cells,
  options,
  selected,
  input,
  setInput,
  setSelected,
  handlerDownload,
  page,
}: Props) {
  const { isTablet } = useResponsive()

  if (!isTablet) {
    return (
      <BigMenu
        title={ title }
        cells={ cells }
        options={ options }
        selected={ selected }
        input={ input }
        setInput={ setInput }
        setSelected={ setSelected }
        handlerDownload={ handlerDownload }
        page={ page }
      />
    )
  }

  return (
    <LittleMenu
      title={ title }
      cells={ cells }
      options={ options }
      selected={ selected }
      input={ input }
      setInput={ setInput }
      setSelected={ setSelected }
      handlerDownload={ handlerDownload }
      page={ page }
    />
  )
}