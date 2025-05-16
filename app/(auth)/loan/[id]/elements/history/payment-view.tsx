"use client"
import { 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  Divider
} from "@heroui/react"
import { Heading } from "@com/heading"
import { Download } from "lucide-react"
import { useTheme } from "@ctx/themeContext"
import { useResponsive } from "@uti/useResponsive"
import { PaymentList } from "./payment-list"

type Props = { paymentData: any[] }

export const PaymentView = ({ paymentData }: Props) => {
  const { theme } = useTheme()
  const { isMobile } = useResponsive()

  const handlerDownload = (data: any[], type: "pdf" | "csv") => {
    console.log(`Generating ${type} report for payments`, data)
  }

  return (
    <div className="space-y-6">
      <div
        className={`w-full flex ${isMobile ? "flex-col items-start gap-2" : "flex-row justify-between items-center gap-4"}`}
      >
        <h2 className="text-xl font-bold text-default-800">Loan Payments</h2>
        <Dropdown>
          <DropdownTrigger>
            <Button
              color="primary"
              className={`bg-theme-primary text-white
                ${theme === "light" ? "bg-[#161616e0] text-[#ededed]" : "bg-theme-primary"}
              `}
              startContent={<Download className="mr-1" size={15} />}
            >
              Generate Report
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Generate Report">
            <DropdownItem key="pdf" onClick={() => handlerDownload(paymentData, "pdf")}>
              PDF
            </DropdownItem>
            <DropdownItem key="csv" onClick={() => handlerDownload(paymentData, "csv")}>
              CSV
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <Card className="w-full">
        <CardHeader className="flex justify-between items-center bg-default-50">
          <Heading level={3} className="text-xl text-default-800 font-bold">List of Payments</Heading>
        </CardHeader>
        <Divider />
        <CardBody>
          <PaymentList payments={paymentData} />
        </CardBody>
      </Card>
    </div>
  )
}