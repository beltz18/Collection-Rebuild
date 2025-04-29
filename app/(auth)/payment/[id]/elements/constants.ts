import { CreditCardIcon as CardIcon, BanknoteIcon as Bank, FileCheck, AlertCircle } from "lucide-react"

export const PAYMENT_METHODS = {
  ACH: {
    label: "ACH",
    icon: Bank,
    methods: ["ACH"],
  },
  ECHECK: {
    label: "eCheck",
    icon: FileCheck,
    methods: ["eCheck"],
  },
  CARD: {
    label: "Card (Debit/Credit)",
    icon: CardIcon,
    methods: ["Credit Card", "Debit Card"],
  },
  PRENOTE: {
    label: "Prenotes (No charge)",
    icon: AlertCircle,
    methods: ["Prenote"],
  },
}