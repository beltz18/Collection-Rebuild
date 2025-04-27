"use client"

import { ShoppingBag, DollarSign, Tag, Calendar, Star } from "lucide-react"
import FilterModal from "../filters/filter-modal"
import { TextFilter } from "../filters/filter-components/text-filter"
import { AmountRangeFilter } from "../filters/filter-components/amount-filter"
import { SelectFilter } from "../filters/filter-components/select-filter"
import { DateRangeFilter } from "../filters/filter-components/date-filter"
import type { DateRange } from "react-day-picker"
import type { FilterOption } from "../filters"

const productCategories = {
  ELECTRONICS: "Electronics",
  CLOTHING: "Clothing",
  HOME: "Home & Kitchen",
  BOOKS: "Books",
  TOYS: "Toys & Games",
}

type ProductFilters = {
  name: string
  minPrice: string
  maxPrice: string
  category: string
  dateAdded: DateRange | undefined
  rating: string
}

const filterOptions: FilterOption<ProductFilters>[] = [
  {
    id: "name",
    key: "name",
    label: "Product Name",
    icon: ShoppingBag,
    component: (props) => <TextFilter {...props} />,
  },
  {
    id: "price",
    key: "minPrice",
    label: "Price",
    icon: DollarSign,
    component: (props) => <AmountRangeFilter {...props} />,
  },
  {
    id: "category",
    key: "category",
    label: "Category",
    icon: Tag,
    component: (props) => <SelectFilter {...props} options={productCategories} />,
  },
  {
    id: "dateAdded",
    key: "dateAdded",
    label: "Date Added",
    icon: Calendar,
    component: (props) => <DateRangeFilter {...props} />,
  },
  {
    id: "rating",
    key: "rating",
    label: "Rating",
    icon: Star,
    component: (props) => (
      <SelectFilter
        {...props}
        options={{
          "5": "5 Stars",
          "4": "4+ Stars",
          "3": "3+ Stars",
          "2": "2+ Stars",
          "1": "1+ Star",
        }}
      />
    ),
  },
]

export default function ProductFilterExample() {
  const handleFiltersApplied = (filters: ProductFilters) => {
    console.log("Applied filters:", filters)
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <FilterModal<ProductFilters>
        filterOptions={filterOptions}
        onFiltersApplied={handleFiltersApplied}
        buttonLabel="Filter Products"
      />
    </div>
  )
}