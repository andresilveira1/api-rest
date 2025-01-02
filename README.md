<h1 align="center">Personal finance control API</h1>

## Personal finance control

- [x] should be able to create a new transaction;
- [x] should be able to get the transactions summary;
- [x] should be able to list all transactions;
- [x] should be able to get a specific transaction;

- [x] the transaction can be of credit type that will be sum with total value or as debit that will subtract;
- [x] should be able to identify user between requests;
- [x] user can only view a transaction that he is owner;

## Run

```bash
  git clone https://github.com/andresilveira1/personal-finance-control.git

  npm install

  npm run migrate

  npm run dev
```

## HTTP

### Create transaction

#### POST`/transactions`
```json
  body

  {
    "title": "Example",
    "amount": 500,
    "type": "credit or debit",
  }
```

### List all transactions

#### GET`/transactions`
```json
  response example

  {
    "transactions": [
      {
        "id": "dba85a8e-9a09-4ec2-b868-47f55ba27021",
        "title": "Shopping",
        "amount": "-500.00",
        "created_at": "2025-01-02T00:21:45.001Z",
        "session_id": "55b791cb-6ae9-4356-9ea1-2470a914e5df"
      }
    ]
  }
```

### Get a specific transaction

#### GET`/transactions/:id`

```json
  response example

  {
    "transactions": [
      {
        "id": "dba85a8e-9a09-4ec2-b868-47f55ba27021",
        "title": "Shopping",
        "amount": "-500.00",
        "created_at": "2025-01-02T00:21:45.001Z",
        "session_id": "55b791cb-6ae9-4356-9ea1-2470a914e5df"
      }
    ]
  }
```

### Get summary

#### GET`/transactions/summary`

```json
  response example

  {
    "summary": {
      "amount": 500
    }
  }

```

<br>

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)