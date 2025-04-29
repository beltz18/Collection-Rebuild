import { Payment, Loan, type PaymentHistoryT } from "@typ/home-tables"

export const paymentHistoryMock: PaymentHistoryT[] = [
  {
    "attempt_number": 1,
    "amount_before": 251.77,
    "amount_after": 0.0,
    "success": false,
    "successful_at": null,
    "processed_at": "2025-01-23T15:50:10.025961Z",
    "payment_method": "DebitCard",
    "payment_processor": "Payliance",
    "transaction_id": null,
    "associated_payment": null
  },
  {
    "attempt_number": 3,
    "amount_before": 251.77,
    "amount_after": -251.77,
    "success": true,
    "successful_at": "2025-01-23T15:40:49.728722Z",
    "processed_at": "2025-01-23T15:40:49.733756Z",
    "payment_method": "eCheck",
    "payment_processor": "Payliance-eCheck",
    "transaction_id": "280536768",
    "associated_payment": {
      "id": 11,
      "status": "failed",
      "created_at": "2025-01-23T10:40:49.712688-05:00",
      "successful_at": "2025-01-23T10:40:50.351581-05:00",
      "returned_at": "2025-01-23T10:40:50.351581-05:00",
      "identifier": "PAYLIANCE-ECHECK-17-1737646849.021148",
      "identifier_2": "280536768",
      "return_code": {
        "code": "R04",
        "title_en": "Invalid Account Number",
        "description_en": "The account number structure is not valid",
        "stop_step": false,
        "deactivate_account": false
      },
    }
  },
  {
    "attempt_number": 2,
    "amount_before": 251.77,
    "amount_after": -251.77,
    "success": true,
    "successful_at": "2025-01-23T15:39:54.222932Z",
    "processed_at": "2025-01-23T15:39:54.226254Z",
    "payment_method": "eCheck",
    "payment_processor": "Payliance-eCheck",
    "transaction_id": "280536764",
    "associated_payment": {
      "id": 8,
      "status": "failed",
      "created_at": "2025-01-23T10:39:54.209524-05:00",
      "successful_at": null,
      "returned_at": "2025-01-23T10:40:50.351581-05:00",
      "identifier": "PAYLIANCE-ECHECK-17-1737646793.637844",
      "identifier_2": "280536764",
      "return_code": {
        "code": "R01",
        "title_en": "Insufficient Funds",
        "description_en": "The available balance is not sufficient to cover the dollar amount of the debit entry",
        "stop_step": false,
        "deactivate_account": false
      },
    }
  },
  {
    "attempt_number": 1,
    "amount_before": 251.77,
    "amount_after": -251.77,
    "success": true,
    "successful_at": "2025-01-23T15:37:06.387182Z",
    "processed_at": "2025-01-23T15:37:06.391897Z",
    "payment_method": "eCheck",
    "payment_processor": "Payliance-eCheck",
    "transaction_id": "280536757",
    "associated_payment": {
      "id": 5,
      "status": "failed",
      "created_at": "2025-01-23T10:37:06.373573-05:00",
      "successful_at": null,
      "returned_at": "2025-01-23T10:40:50.351581-05:00",
      "identifier": "PAYLIANCE-ECHECK-17-1737646625.728701",
      "identifier_2": "280536757",
      "return_code": {
        "code": "R03",
        "title_en": "No Account/Unable to Locate Account",
        "description_en": "The account number structure is valid but does not correspond to the individual identified or is not an open account",
        "stop_step": false,
        "deactivate_account": false
      },
    }
  },
  {
    "attempt_number": 3,
    "amount_before": 251.77,
    "amount_after": -251.77,
    "success": true,
    "successful_at": "2025-01-23T15:35:46.202869Z",
    "processed_at": "2025-01-23T15:35:46.206321Z",
    "payment_method": "ACH",
    "payment_processor": "Payliance",
    "transaction_id": "280536753",
    "associated_payment": {
      "id": 61,
      "status": "processed",
      "created_at": "2025-01-23T10:35:46.191655-05:00",
      "successful_at": "2025-02-05T12:03:10.642005-05:00",
      "returned_at": null,
      "identifier": "PAYLIANCE-17-1737646545.616419",
      "identifier_2": "280536753",
      "return_code": null,
    }
  },
]

export const paymentMock: Payment = {
  "id": "555555",
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
    "unique_description": "SP",
  },
  "number_payment": 18,
  "payment_history": paymentHistoryMock,
  "loan_details_url": "http://192.168.60.105:8001/loan_request/138?person_id=1640",
  "customer_details_url": "http://192.168.60.105:8001/clients/1640",
  "create_date": "2025-04-22T16:06:18.304025-04:00",
  "update_date": "2025-04-22T16:06:24.862840-04:00",
  "interest_amount": "0.00"
}

export const loanMock: Loan = {
  "id": "44444",
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