import { Heading, Icon, Input } from "@com/index"
import { Search, FilterIcon } from "lucide-react"
import { useResponsive } from "@uti/useResponsive"
import { useState } from "react"
import { CustomDropdown } from "@com/dropdown/dropdown"
import { Tabs } from "@com/tabs/tabs"
import { Button } from "@heroui/button"
import { CustomPopover } from "@com/popover/popover"
import { FilterDialog } from "@com/modal/filters"
import {
  loanFilterOptions,
  type LoanFilters,
  countActiveFilters,
} from "@com/modal/examples/loan-filter"

export default function MenuOptions({
  title = "Title Placeholder",
}: {
  title?: string
}) {
  const options = [8, 12]
  const { isTablet } = useResponsive()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(options[0])
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<LoanFilters | null>(
    null
  )

  const handleFiltersApplied = (filters: LoanFilters) => {
    console.log("Filtros aplicados:", filters)
    setAppliedFilters(filters)
    setIsFilterModalOpen(false)
  }

  const activeFiltersCount = countActiveFilters(appliedFilters)

  if (!isTablet) {
    return (
      <div className="w-full flex justify-between items-center gap-3">
        {title && (
          <Heading level={1} className="text-theme-text-title/60 text-2xl">
            {title}
          </Heading>
        )}

        <div className="flex items-center gap-3">
          <div className="w-[180px] h-[32px] relative flex items-center">
            <Input
              type="text"
              size="sm"
              placeholder="Search..."
              endContent={<Search className="text-default-400" size={18} />}
            />
          </div>

          <Tabs variant="solid">
            <Tabs.Tab title={<Icon icon="list" size="md" />}></Tabs.Tab>
            <Tabs.Tab title={<Icon icon="idCard" size="md" />}></Tabs.Tab>
          </Tabs>

          <CustomDropdown>
            <CustomDropdown.Trigger>
              <button className="bg-theme-background rounded-xl p-2">
                <Icon icon="download" size="md" />
              </button>
            </CustomDropdown.Trigger>
            <CustomDropdown.Menu className="min-w-[120px]">
              <CustomDropdown.Item
                key="pdf"
                onPress={() => console.log("Export as PDF")}
                className="text-default-600 hover:bg-default-100"
              >
                PDF
              </CustomDropdown.Item>
              <CustomDropdown.Item
                key="csv"
                onPress={() => console.log("Export as CSV")}
                className="text-default-600 hover:bg-default-100"
              >
                CSV
              </CustomDropdown.Item>
            </CustomDropdown.Menu>
          </CustomDropdown>

          <div className="relative inline-flex">
            <FilterIcon
              size={24}
              onClick={() => setIsFilterModalOpen(true)}
              className="text-default-400 hover:text-default-600 cursor-pointer"
            />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-theme-text-hover px-[6px] text-[10px] font-bold text-white">
                {activeFiltersCount}
              </span>
            )}
          </div>

          <CustomPopover placement="bottom">
            <CustomPopover.Trigger>
              <button className="flex items-center text-default-400 text-sm gap-1">
                Rows: {rowsPerPage}
                <Icon icon="chevronDown" size="sm" />
              </button>
            </CustomPopover.Trigger>
            <CustomPopover.Content className="min-w-[80px] p-1">
              {options.map((opt) => (
                <button
                  key={opt}
                  className={`w-full text-sm p-2 text-left rounded hover:bg-default-100 ${rowsPerPage === opt ? "bg-default-100 font-medium" : ""}`}
                  onClick={() => setRowsPerPage(opt)}
                >
                  {opt}
                </button>
              ))}
            </CustomPopover.Content>
          </CustomPopover>
        </div>

        <FilterDialog
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilters={handleFiltersApplied}
          filterOptions={loanFilterOptions}
          initialFilters={appliedFilters || undefined}
        />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-row justify-between gap-2 relative">
      {title && (
        <Heading level={1} className="flex-1 text-theme-text-title/60 text-2xl">
          {title}
        </Heading>
      )}

      <div className="flex items-center gap-2">
        <div className="max-w-[240px] h-[24px] relative flex items-center">
          <Input
            type="text"
            size="sm"
            placeholder="Search..."
            endContent={
              <Icon icon="search" className="text-default-400" size="md" />
            }
          />
        </div>

        <CustomPopover
          placement="bottom-end"
          isOpen={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
        >
          <CustomPopover.Trigger>
            <button>
              <Icon
                icon="hamburger"
                className="text-default-400 hover:text-default-600 cursor-pointer"
                size="lg"
              />
            </button>
          </CustomPopover.Trigger>
          <CustomPopover.Content className="bg-theme-background p-3 shadow-md rounded-lg flex flex-col gap-2 w-52">
            <Tabs
              variant="solid"
              classNames={{
                tabList: "rounded-lg",
              }}
            >
              <Tabs.Tab
                title={<Icon icon="list" size="md" />}
                className="w-20"
              ></Tabs.Tab>
              <Tabs.Tab
                title={<Icon icon="idCard" size="md" />}
                className="w-20"
              ></Tabs.Tab>
            </Tabs>
            <CustomDropdown>
              <CustomDropdown.Trigger>
                <Button className="flex justify-start ps-10 w-full rounded-lg h-[36]">
                  <Icon icon="download" size="sm" />
                  Download
                </Button>
              </CustomDropdown.Trigger>
              <CustomDropdown.Menu>
                <CustomDropdown.Item
                  key="pdf"
                  onPress={() => console.log("Export as PDF")}
                  className="text-default-600 hover:bg-default-100"
                >
                  PDF
                </CustomDropdown.Item>
                <CustomDropdown.Item
                  key="csv"
                  onPress={() => console.log("Export as CSV")}
                  className="text-default-600 hover:bg-default-100"
                >
                  CSV
                </CustomDropdown.Item>
              </CustomDropdown.Menu>
            </CustomDropdown>

            <Button
              className="flex justify-start ps-10 w-full rounded-lg h-[36]"
              onPress={() => {
                setIsFilterModalOpen(true)
                setIsMobileMenuOpen(false)
              }}
            >
              <FilterIcon size={14} />
              Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}
            </Button>

            <CustomPopover placement="bottom">
              <CustomPopover.Trigger>
                <Button className="flex justify-center w-full rounded-lg h-[36]">
                  <span>Rows: {rowsPerPage}</span>
                  <Icon icon="chevronDown" size="sm" />
                </Button>
              </CustomPopover.Trigger>
              <CustomPopover.Content className="min-w-[80px] p-1">
                {options.map((opt) => (
                  <button
                    key={opt}
                    className={`w-full text-sm p-2 text-left rounded hover:bg-default-100 ${rowsPerPage === opt ? "bg-default-100 font-medium" : ""}`}
                    onClick={() => setRowsPerPage(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </CustomPopover.Content>
            </CustomPopover>

            <Button
              className="justify-center w-full rounded-lg h-[36]"
              variant="flat"
              color="danger"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Close
            </Button>
          </CustomPopover.Content>
        </CustomPopover>
      </div>
    </div>
  )
}