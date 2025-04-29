export interface ProcessorT {
  id: number
  name: string
  description: string
  processor_type: string
  active: boolean
  store_id: string | null
  client_id: string
  location_id: string | null
}