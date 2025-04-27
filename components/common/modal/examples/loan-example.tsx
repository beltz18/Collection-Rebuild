"use client"

import { User, DollarSign, Calendar, Tag, UserSquare, FileText } from "lucide-react"
import FilterModal from "../filters/filter-modal"
import { TextFilter } from "../filters/filter-components/text-filter"
import { AmountRangeFilter } from "../filters/filter-components/amount-filter"
import { SelectFilter } from "../filters/filter-components/select-filter"
import { DateRangeFilter } from "../filters/filter-components/date-filter"
import type { DateRange } from "react-day-picker"
import type { FilterOption } from "../filters"
import { loanRequestStatus, getStatusColor, LoanRequestStatus } from "@typ/loans-status"

export type LoanFilters = {
  name: string
  minAmount: string
  maxAmount: string
  dateRange: DateRange | undefined
  status: string
  personId: string
  loanRequestId: string
}

const filterOptions: FilterOption<LoanFilters>[] = [
  {
    id: "name",
    key: "name",
    label: "Name",
    icon: User,
    component: (props) => <TextFilter {...props} />,
  },
  {
    id: "amount",
    key: "minAmount",
    label: "Amount",
    icon: DollarSign,
    component: (props) => <AmountRangeFilter {...props} />,
  },
  {
    id: "status",
    key: "status",
    label: "Status",
    icon: Tag,
    component: (props) => <SelectFilter {...props} options={loanRequestStatus} getStatusColor={(status) => getStatusColor(status as LoanRequestStatus)} />,
  },
  {
    id: "personId",
    key: "personId",
    label: "Person ID",
    icon: UserSquare,
    component: (props) => <TextFilter {...props} />,
  },
  {
    id: "loanRequestId",
    key: "loanRequestId",
    label: "Loan Request ID",
    icon: FileText,
    component: (props) => <TextFilter {...props} />,
  },
  {
    id: "dateRange",
    key: "dateRange",
    label: "Date Range",
    icon: Calendar,
    component: (props) => <DateRangeFilter {...props} />,
  },
]

export default function LoanFilterExample() {
  const handleFiltersApplied = (filters: LoanFilters) => {
    console.log("Applied filters:", filters)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <FilterModal<LoanFilters>
        filterOptions={filterOptions}
        onFiltersApplied={handleFiltersApplied}
        buttonLabel="Filter Loans"
      />
    </div>
  )
}