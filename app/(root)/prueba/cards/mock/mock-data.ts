import { Payment } from "@typ/home-tables"

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