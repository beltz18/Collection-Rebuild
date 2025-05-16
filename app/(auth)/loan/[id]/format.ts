export const formatCurrency = (value: string | number): string => {
  const numValue = typeof value === "string" ? Number.parseFloat(value) : value
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(numValue)
}

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "N/A"

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export const formatDateTime = (dateString: string | null): string => {
  if (!dateString) return "N/A"

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export const samplePaymentData = [
  {
    loan_payment_id: 47,
    loan_request_id: 430,
    loan_request_number: "000101000740",
    person: {
      person_id: 1282,
      first_name: "ROBERTO",
      last_name: "GONZALEZ",
      email: "fsalazar_crediroll35@aclaoverseas.com",
    },
    company_name: "CREDITERIUM UT LLC",
    amount: "190.93",
    capital: "19.74",
    interest_amount: "171.19",
    arrears_amount: "0.00",
    other_debts: "0.00",
    balance_date: null,
    remaining_amount: "0.00",
    due_date: "2025-03-24",
    real_payment_date: "2025-03-04",
    payment_status: {
      loan_payment_status_id: 2,
      description: "Paid",
      unique_description: "PP",
      create_date: "2020-11-23T17:42:42.620000-05:00",
      update_date: "2020-11-23T17:42:42.620000-05:00",
    },
    number_payment: 4,
    payment_history: [],
    loan_details_url: "http://192.168.60.105:8001/loan_request/430?person_id=1282",
    customer_details_url: "http://192.168.60.105:8001/clients/1282",
    create_date: "2025-02-07T16:40:26.970593-05:00",
    update_date: "2025-03-04T16:26:29.602393-05:00",
  },
  {
    loan_payment_id: 46,
    loan_request_id: 430,
    loan_request_number: "000101000740",
    person: {
      person_id: 1282,
      first_name: "ROBERTO",
      last_name: "GONZALEZ",
      email: "fsalazar_crediroll35@aclaoverseas.com",
    },
    company_name: "CREDITERIUM UT LLC",
    amount: "190.93",
    capital: "19.74",
    interest_amount: "171.19",
    arrears_amount: "0.00",
    other_debts: "0.00",
    balance_date: null,
    remaining_amount: "0.00",
    due_date: "2025-02-24",
    real_payment_date: "2025-02-20",
    payment_status: {
      loan_payment_status_id: 2,
      description: "Paid",
      unique_description: "PP",
      create_date: "2020-11-23T17:42:42.620000-05:00",
      update_date: "2020-11-23T17:42:42.620000-05:00",
    },
    number_payment: 3,
    payment_history: [
      {
        id: 123,
        attempt_number: 1,
        success: true,
        payment_method: "ACH",
        payment_processor: "Payliance",
        transaction_id: "TX123456",
        processed_at: "2025-02-20T10:15:30.000000-05:00",
        amount_before: "190.93",
        amount_after: "0.00",
      },
    ],
    loan_details_url: "http://192.168.60.105:8001/loan_request/430?person_id=1282",
    customer_details_url: "http://192.168.60.105:8001/clients/1282",
    create_date: "2025-01-07T16:40:26.970593-05:00",
    update_date: "2025-02-20T11:26:29.602393-05:00",
  },
  {
    loan_payment_id: 45,
    loan_request_id: 430,
    loan_request_number: "000101000740",
    person: {
      person_id: 1282,
      first_name: "ROBERTO",
      last_name: "GONZALEZ",
      email: "fsalazar_crediroll35@aclaoverseas.com",
    },
    company_name: "CREDITERIUM UT LLC",
    amount: "190.93",
    capital: "19.74",
    interest_amount: "171.19",
    arrears_amount: "0.00",
    other_debts: "0.00",
    balance_date: null,
    remaining_amount: "0.00",
    due_date: "2025-01-24",
    real_payment_date: "2025-01-22",
    payment_status: {
      loan_payment_status_id: 2,
      description: "Paid",
      unique_description: "PP",
      create_date: "2020-11-23T17:42:42.620000-05:00",
      update_date: "2020-11-23T17:42:42.620000-05:00",
    },
    number_payment: 2,
    payment_history: [],
    loan_details_url: "http://192.168.60.105:8001/loan_request/430?person_id=1282",
    customer_details_url: "http://192.168.60.105:8001/clients/1282",
    create_date: "2024-12-07T16:40:26.970593-05:00",
    update_date: "2025-01-22T09:26:29.602393-05:00",
  },
  {
    loan_payment_id: 44,
    loan_request_id: 430,
    loan_request_number: "000101000740",
    person: {
      person_id: 1282,
      first_name: "ROBERTO",
      last_name: "GONZALEZ",
      email: "fsalazar_crediroll35@aclaoverseas.com",
    },
    company_name: "CREDITERIUM UT LLC",
    amount: "190.93",
    capital: "19.74",
    interest_amount: "171.19",
    arrears_amount: "0.00",
    other_debts: "0.00",
    balance_date: null,
    remaining_amount: "0.00",
    due_date: "2024-12-24",
    real_payment_date: "2024-12-20",
    payment_status: {
      loan_payment_status_id: 2,
      description: "Paid",
      unique_description: "PP",
      create_date: "2020-11-23T17:42:42.620000-05:00",
      update_date: "2020-11-23T17:42:42.620000-05:00",
    },
    number_payment: 1,
    payment_history: [],
    loan_details_url: "http://192.168.60.105:8001/loan_request/430?person_id=1282",
    customer_details_url: "http://192.168.60.105:8001/clients/1282",
    create_date: "2024-11-07T16:40:26.970593-05:00",
    update_date: "2024-12-20T14:26:29.602393-05:00",
  },
]