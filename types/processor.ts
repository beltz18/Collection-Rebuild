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

export type FilterProps = Partial<{
  search: string
  processor_type: ProcessorType
  active: boolean
  sec_code: SEC_Code
  use_same_day_ach: boolean
  unique_name: string
}>

export type ProcessorsResponse = ProcessorT[]