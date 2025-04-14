import {
  Split,
  Table,
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
  count: number
}

const columnHelper = createColumnHelper<Example>()

export const columns = [
  columnHelper.accessor('id', {
    id: 'id',
    header: 'ID',
    cell: (props) => {
      return <div className='block'>{ props.getValue() }</div>
    },
    meta: {
      tooltip: true,
    }
  }),
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Name',
    cell: (props) => {
      return <div className='block'>{ props.getValue() }</div>
    },
    meta: {
      tooltip: true,
    }
  }),
  columnHelper.accessor('description', {
    id: 'description',
    header: 'Description',
    cell: (props) => {
      return <div className='block'>{ props.getValue() }</div>
    },
    meta: {
      tooltip: true,
    }
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: (props) => {
      console.log(props.row.original)

      return (
        <Split className='gap-2 w-full min-w-[80px] justify-end pr-4'>
          <Tooltip label='Modificar profesional externo'>
            Lalalala
          </Tooltip>
          
          <Tooltip label='Eliminar profesional externo'>
            Lelelele
          </Tooltip>
        </Split>
      )
    },
  }),
] as Array<ColumnDef<Example, unknown>>

export const TableCustom = ({
  data,
  count,
}: Props) => {
  return (
    <Table
      data={ data }
      columns={ columns }
      actions={{
        multiselect: true,
        delete: false,
        // deleteFn: async (value) => {
        //   try {
        //     await removeProfessionalsInBulk.mutateAsync({ externalProfessionalIds: value })
        //     queryClient.refetchQueries({ queryKey: [BASE_CACHE_KEYS.getAllProfessionals] })
        //     successToast({
        //       title: 'Exito',
        //       body: 'Profesionales externos eliminados con éxito',
        //     })
        //   } catch (_) {
        //     errorToast({
        //       title: 'Error',
        //       body: 'Error al eliminar los profesionales externos',
        //     })
        //   }
        // },
        keyId: 'id',
      }}
      getRowCanExpand={() => true}
      pageCount={ count }
    />
  )
}