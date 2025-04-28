export type LoanRequestStatus =
  | 'withdrawn'
  | 'written_off'
  | 'denied'
  | 'past_due'
  | 'created'
  | 'pre-approved'
  | 'underwriter_review'
  | 'signature_collection'
  | 'client_digitization'
  | 'create_loan_in_core'
  | 'in_disbursement_process'
  | 'disbursed'
  | 'paid_off'
  | 'solicitud_producto_incompleta'
  | 'rechazada'
  | 'solicitud_producto_operaciones'
  | 'depuracion'
  | 'solicitud_producto_depuracion_automatica'
  | 'creacion_cliente'
  | 'creacion_producto'
  | 'solicitud_producto_procesada'
  | 'reversed'

export const loanRequestStatus: Record<LoanRequestStatus, string> = {
  withdrawn: 'Withdrawn',
  written_off: 'Written Off',
  denied: 'Denied',
  past_due: 'Past Due',
  created: 'Created',
  'pre-approved': 'Pre-Approved',
  underwriter_review: 'Underwriter Review',
  signature_collection: 'Signature Collection',
  client_digitization: 'Client Digitization',
  create_loan_in_core: 'Create Loan in Core',
  in_disbursement_process: 'In Disbursement Process',
  disbursed: 'Disbursed',
  paid_off: 'Paid Off',
  solicitud_producto_incompleta: 'Incomplete Product Request',
  rechazada: 'Rechazada',
  solicitud_producto_operaciones: 'Operaciones',
  depuracion: 'Depuración',
  solicitud_producto_depuracion_automatica: 'Depuración Automática',
  creacion_cliente: 'Creación de Cliente',
  creacion_producto: 'Creación de Producto',
  solicitud_producto_procesada: 'Solicitud Procesada',
  reversed: 'Reversed',
}

export const getStatusColor = (status: LoanRequestStatus): string => {
  const statusColorMap: Record<LoanRequestStatus, string> = {
    withdrawn: 'bg-red-200 text-red-800',
    denied: 'bg-red-200 text-red-800',
    rechazada: 'bg-red-200 text-red-800',
    written_off: 'bg-orange-200 text-orange-800',
    past_due: 'bg-orange-200 text-orange-800',

    created: 'bg-blue-200 text-blue-800',
    solicitud_producto_incompleta: 'bg-blue-200 text-blue-800',
    creacion_cliente: 'bg-blue-200 text-blue-800',
    creacion_producto: 'bg-blue-200 text-blue-800',
    'pre-approved': 'bg-yellow-200 text-yellow-800',

    underwriter_review: 'bg-yellow-200 text-yellow-800',
    signature_collection: 'bg-yellow-200 text-yellow-800',
    client_digitization: 'bg-yellow-200 text-yellow-800',
    create_loan_in_core: 'bg-yellow-200 text-yellow-800',
    in_disbursement_process: 'bg-yellow-200 text-yellow-800',

    disbursed: 'bg-green-200 text-green-800',
    paid_off: 'bg-purple-200 text-purple-800',
    solicitud_producto_operaciones: 'bg-cyan-200 text-cyan-800',
    depuracion: 'bg-cyan-200 text-cyan-800',
    solicitud_producto_depuracion_automatica: 'bg-cyan-200 text-cyan-800',
    
    solicitud_producto_procesada: 'bg-cyan-200 text-cyan-800',
    reversed: 'bg-gray-200 text-gray-800',
  }

  return statusColorMap[status] || 'bg-slate-200 text-gray-800'
}