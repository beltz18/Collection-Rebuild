import {
  Split,
  TableC as Table,
  Tooltip,
} from '@com/index'
import {
  errorToast,
  successToast,
} from '@com/index'
import {
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table'
import { Example } from '@typ/base'

type Props = {
  data: any
  columns: any
  status: any
  count: number
}

// const columnHelper = createColumnHelper<Example>()

// export const columns = [
//   columnHelper.accessor('id', {
//     id: 'id',
//     header: 'ID',
//     cell: (props) => {
//       return <div>{ props.getValue() }</div>
//     },
//     meta: {
//       tooltip: false,
//       link: {
//         hasLink: true,
//         href: "https://www.google.com"
//       }
//     }
//   }),
//   columnHelper.accessor('name', {
//     id: 'name',
//     header: 'Name',
//     cell: (props) => {
//       return <div>{ props.getValue() }</div>
//     },
//     meta: {
//       tooltip: true,
//     }
//   }),
//   columnHelper.display({
//     id: 'actions',
//     header: 'Acciones',
//     cell: (props) => {
//       console.log(props.row.original)

//       return (
//         <Split className='gap-2 bg-red-500'>
//           <Tooltip label='Modificar profesional externo'>
//             <span>Lalalala</span>
//           </Tooltip>
          
//           <Tooltip label='Eliminar profesional externo'>
//             Lelelele
//           </Tooltip>
//         </Split>
//       )
//     },
//   }),
// ] as Array<ColumnDef<Example, unknown>>

export const TableCustom = ({
  data,
  columns,
  status,
  count,
}: Props) => {
  return (
    <Table
      data={ data }
      columns={ columns }
      status={ status }
      // getRowCanExpand is removed as it is not supported by TableProps
      // pageCount={ count }
    />
  )
}