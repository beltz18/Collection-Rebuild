import { Payment, Loan } from "@typ/home-tables"

export const paymentMock: Payment = {
    "loan_payment_id": 469,
    "loan_request_id": 138,
    "loan_request_number": "000101000197",
    "person": {
      "person_id": 1640,
      "first_name": "PEDRO",
      "last_name": "PEREZ",
      "email": "employeeatlas01@dev.aclaoverseas.com"
    },
    "company_name": "ASTRAL VENTURES",
    "amount": "1170.93",
    "capital": "1160.92",
    "arrears_amount": "0.00",
    "other_debts": "0.00",
    "balance_date": null,
    "remaining_amount": "0.00",
    "due_date": "2025-08-28",
    "real_payment_date": null,
    "payment_status": {
      "loan_payment_status_id": 1,
      "description": "Pending",
      "unique_description": "SP",
    },
    "number_payment": 18,
    "payment_history": [],
    "loan_details_url": "http://192.168.60.105:8001/loan_request/138?person_id=1640",
    "customer_details_url": "http://192.168.60.105:8001/clients/1640",
    "create_date": "2025-04-22T16:06:18.304025-04:00",
    "update_date": "2025-04-22T16:06:24.862840-04:00",
    "interest_amount": "0.00"
}

export const loanMock: Loan = {
    "loan_request_id": 821,
    "loan_details_url": "http://192.168.60.105:8001/loan_request/821?person_id=2564",
    "customer_details_url": "http://192.168.60.105:8001/clients/2564",
    "payment_frequency": {
      "description": "Biweekly",
      "unique_description": "biweekly"
    },
    "create_date": "2025-04-23T11:53:47.801552-04:00",
    "update_date": "2025-04-23T11:53:47.801552-04:00",
    "request_date": "2025-04-23",
    "sign_date": "2025-04-23T00:00:00-04:00",
    "disbursment_date": "2025-04-23",
    "closure_amount": "0.00",
    "insurance_amount": "0.00",
    "requested_amount": "800.00",
    "approved_amount": "800.00",
    "term": 11,
    "base_rate": "850.00",
    "insurance_rate": "0.00",
    "tax_rate": "0.00",
    "observations": "{\"The request has been created ignoring the evaluator's recommendations\"}",
    "person": {
      "person_id": 2564,
      "first_name": "Lulu",
      "last_name": "Gonzalez",
      "email": "devtest30@dev.aclaoverseas.com"
    },
    "currency": {
      "currency_id": 2,
      "create_date": "2020-11-23T17:42:42.620000-05:00",
      "update_date": "2020-11-23T17:42:42.620000-05:00",
      "code": "USD",
      "description": "Dólar Americano",
      "currency_asterion_id": 2
    },
    "status": {
      "loan_request_status_id": 5,
      "description": "Created",
      "unique_description": "created",
    },
    "loan_destination": {
      "loan_destination_id": 3,
      "description": "Otros",
      "unique_description": "Otros"
    },
  }
