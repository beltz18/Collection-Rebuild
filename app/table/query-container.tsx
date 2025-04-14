import { Stack } from '@com/index'
import { columns, TableCustom } from './table'
import { Example } from '@typ/base'

type Props = {
  search?: string
}

export const TableQueryContainer = ({ search }: Props) => {
  const data : Example[] = [
    {
      id: 1,
      name: 'Andi',
      description: 'Tralalilo Tralala',
      date: new Date('9/11/2001'),
    },
    {
      id: 1,
      name: 'Beltz',
      description: 'Crocodilo Trigolino',
      date: new Date('9/11/2001'),
    },
  ]

  return (
    <TableCustom
      data={ data }
      count={ 1 }
    />
  )
}