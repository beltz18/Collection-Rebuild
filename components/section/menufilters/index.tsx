import { MenuFilterProps } from '@typ/home-tables'
import { useResponsive } from '@uti/useResponsive'
import { LittleMenu } from './little-menu'
import { BigMenu } from './big-menu'

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
}: MenuFilterProps) {
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