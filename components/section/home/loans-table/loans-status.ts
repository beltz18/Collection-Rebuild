export type LoanRequestStatus =
  | "withdrawn"
  | "written_off"
  | "denied"
  | "past_due"
  | "created"
  | "pre-approved"
  | "underwriter_review"
  | "signature_collection"
  | "client_digitisation"
  | "create_loan_in_core"
  | "in_disbursement_process"
  | "disbursed"
  | "paid_off"
  | "solicitud_producto_incompleta"
  | "rechazada"
  | "solicitud_producto_operaciones"
  | "depuracion"
  | "solicitud_producto_depuracion_automatica"
  | "creacion_cliente"
  | "creacion_producto"
  | "solicitud_producto_procesada"
  | "reversed"

export const loanRequestStatus: Record<LoanRequestStatus, string> = {
  withdrawn: "Withdrawn",
  written_off: "Written Off",
  denied: "Denied",
  past_due: "Past Due",
  created: "Created",
  "pre-approved": "Pre-Approved",
  underwriter_review: "Underwriter Review",
  signature_collection: "Signature Collection",
  client_digitisation: "Client Digitisation",
  create_loan_in_core: "Create Loan in Core",
  in_disbursement_process: "In Disbursement Process",
  disbursed: "Disbursed",
  paid_off: "Paid Off",
  solicitud_producto_incompleta: "Incomplete Product Request",
  rechazada: "Rechazada",
  solicitud_producto_operaciones: "Operaciones",
  depuracion: "Depuración",
  solicitud_producto_depuracion_automatica: "Depuración Automática",
  creacion_cliente: "Creación de Cliente",
  creacion_producto: "Creación de Producto",
  solicitud_producto_procesada: "Solicitud Procesada",
  reversed: "Reversed",
}

export const getStatusColor = (status: LoanRequestStatus): string => {
  switch (status) {
    case "withdrawn":
    case "denied":
    case "rechazada":
      return "bg-red-100 text-red-800"
    case "written_off":
    case "past_due":
      return "bg-orange-100 text-orange-800"
    case "created":
    case "solicitud_producto_incompleta":
    case "creacion_cliente":
    case "creacion_producto":
      return "bg-blue-100 text-blue-800"
    case "pre-approved":
    case "underwriter_review":
    case "signature_collection":
    case "client_digitisation":
    case "create_loan_in_core":
    case "in_disbursement_process":
      return "bg-yellow-100 text-yellow-800"
    case "disbursed":
      return "bg-green-100 text-green-800"
    case "paid_off":
      return "bg-purple-100 text-purple-800"
    case "solicitud_producto_operaciones":
    case "depuracion":
    case "solicitud_producto_depuracion_automatica":
    case "solicitud_producto_procesada":
      return "bg-cyan-100 text-cyan-800"
    case "reversed":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}