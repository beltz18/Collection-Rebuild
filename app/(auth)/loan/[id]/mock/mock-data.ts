export const sampleLoanData = {
  about: {
    title: 'Personal Loan Overview',
    description:
      "Our personal loans offer competitive rates and flexible terms to help you achieve your financial goals. Whether you're consolidating debt, financing a major purchase, or covering unexpected expenses, we're here to support you.",
    learnMoreLink: '/personal-loans',
  },
  services: {
    title: 'Loan Features and Benefits',
    items: [
      'Fixed interest rates from 5.99% APR',
      'Loan amounts from $1,000 to $50,000',
      'Repayment terms from 12 to 60 months',
      'No prepayment penalties',
      'Fast online application and approval process',
      'Funds deposited as soon as next business day',
    ],
  },
  statistics: {
    title: 'Loan Performance',
    stats: [
      { value: '$250M+', label: 'Total Loan Volume' },
      { value: '50,000+', label: 'Borrowers Served' },
      { value: '4.8/5', label: 'Customer Satisfaction' },
    ],
  },
  loanDetails: {
    "loan_request_id": 795,
    "loan_details_url": "http://192.168.60.105:8001/loan_request/795?person_id=2538",
    "customer_details_url": "http://192.168.60.105:8001/clients/2538",
    "payment_frequency": {
      "bp_category_id": 3,
      "description": "Biweekly",
      "unique_description": "biweekly"
    },
    "create_date": "2025-04-21T10:58:45.438866-04:00",
    "update_date": "2025-04-21T10:04:47.582395-04:00",
    "number": null,
    "request_date": "2025-04-21",
    "sign_date": "2025-04-21T00:00:00-04:00",
    "disbursment_date": "2025-04-21",
    "closure_amount": "0.00",
    "insurance_amount": "0.00",
    "requested_amount": "312.00",
    "approved_amount": "312.00",
    "term": 11,
    "base_rate": "850.00",
    "insurance_rate": "0.00",
    "tax_rate": "0.00",
    "life_insurance_surcharge": "0.00",
    "observations": "{\"The request has been created ignoring the evaluator's recommendations\"}",
    "cancellation_reason": null,
    "user_id": 4164,
    "purged": false,
    "migrate": false,
    "account_minimum_balance": "0.00",
    "required_additional_data": false,
    "forced_amount": true,
    "core_amount": null,
    "fair": false,
    "account_number": null,
    "default_account_number": null,
    "description_references": null,
    "employee_code": null,
    "reengaged_by": null,
    "premium_amount": "0.00",
    "policy_amount": "0.00",
    "billing_card_ids": [],
    "requires_guarantor": false,
    "disclaimer_acceptance_date": null,
    "person": {
      "person_id": 2538,
      "first_name": "Elliot",
      "last_name": "Parker",
      "email": "Elliot_22@dev.aclaoverseas.com"
    },
    "guarantor": null,
    "currency": {
      "currency_id": 2,
      "create_date": "2020-11-23T17:42:42.620000-05:00",
      "update_date": "2020-11-23T17:42:42.620000-05:00",
      "code": "USD",
      "description": "Dólar Americano",
      "currency_asterion_id": 2
    },
    "status": {
      "loan_request_status_id": 6,
      "description": "Pre-Approved",
      "previous_status": 5,
      "next_status": 7,
      "allowed_roles": [
        "corporate_admin",
        "processing_admin"
      ],
      "required_reports": [],
      "notify_to": [
        "corporate_admin",
        "processing_admin"
      ],
      "validate": "",
      "requires_signature": false,
      "tracked": false,
      "invalid": false,
      "comments": "processing_admin",
      "allowed_roles_to_cancel": [
        "corporate_admin"
      ],
      "notify_employee": false,
      "unique_description": "pre-approved",
      "alternate_state": null
    },
    "loan_destination": {
      "loan_destination_id": 3,
      "create_date": "2020-11-23T17:42:42.620000-05:00",
      "update_date": "2024-05-02T17:10:08.115000-04:00",
      "description": "Otros",
      "unique_description": "Otros"
    },
    "loan_request_detail": {
      "loan_request_detail_id": 816,
      "create_date": "2025-04-21T10:58:45.438866-04:00",
      "update_date": "2025-04-21T10:58:45.438866-04:00"
    },
    "payment_strategy": null
  },
}
