# BudgetPlanning

## Description
An application designed to take incomes, expenses, and a starting balance and return a list of daily balances for a given length of time.

## Installation
To install this application, clone the repository and run the following command in the root directory:

```
npm install
```

This application uses Supabase for it's backend. To use this application, you will need to create a Supabase account and create a new project. Once you have created a project, you will need to create a table called "balances" with the following columns:

#### Balances Table
Name| Description | Data Type | Format
id | No description | bigint | int8
created_at | No description | timestamp with time zone | timestamptz
name | No description | text | text
amount | No description | numeric | numeric
date | No description | date | date
user | No description | uuid | uuid
uuid | No description | uuid | uuid

You will also need to create a table called "expenses" with the following columns:

#### Expenses Table
Name| Description | Data Type | Format
id | No description | bigint | int8
created_at | No description | timestamp with time zone | timestamptz
name | No description | text | text
amount | No description | numeric | numeric
repeated | No description | text | text
user | No description | uuid | uuid
uuid | No description | uuid | uuid

You will also need to create a table called "incomes" with the following columns:

#### Incomes Table
Name| Description | Data Type | Format
id | No description | bigint | int8
created_at | No description | timestamp with time zone | timestamptz
name | No description | text | text
amount | No description | numeric | numeric
repeated | No description | text | text
user | No description | uuid | uuid
uuid | No description | uuid | uuid

Once you have created the table, you will need to create a .env file in the root directory and add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

You can find these variables in your Supabase project settings.

## Usage

To use this application, run the following command in the root directory:

```
npm run dev
```

## License
This application is licensed under the MIT license.

## Contributing
If you would like to contribute to this application, please submit a pull request.

## Tests

To test this application, run the following command in the root directory:

```
npm run test
```

## Questions
If you have any questions about this application, please contact me by [email](mailto:email@email.com).

You can also find more of my work on [GitHub](https://github.com/hegner123).
