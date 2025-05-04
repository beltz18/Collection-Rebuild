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

export type ProcessorType =
  'debit' |
  'credit' |
  'both'

export type SEC_Code = 
  'ppd' |
  'ccd' |
  'web' |
  'tel' |
  'pop' |
  'arc' |
  'boc' |
  'rck' |
  'icl' |
  'ic2' |
  'rtp'