# BudgetPlanning

## Description
An application designed to take incomes, expenses, and a starting balance and return a list of daily balances for a given length of time.

## Installation
To install this application, clone the repository and run the following command in the root directory:

```
npm install
```
To use this application, you will need to create a Supabase account and create a new project. Once you have created a project, you will need to create a table called "balances" with the following columns:

### Balances Table
Name| Description | Data Type | Format
---------|----------|---------|---------
id | No description | bigint | int8
created_at | No description | timestamp with time zone | timestamptz
name | No description | text | text
amount | No description | numeric | numeric
date | No description | date | date
user | No description | uuid | uuid
uuid | No description | uuid | uuid

You will also need to create a table called "expenses" with the following columns:

### Expenses Table
Name| Description | Data Type | Format
---------|----------|---------|---------
id | No description | bigint | int8
created_at | No description | timestamp with time zone | timestamptz
name | No description | text | text
amount | No description | numeric | numeric
repeated | No description | text | text
date | No description | date | date
user | No description | uuid | uuid
uuid | No description | uuid | uuid

You will also need to create a table called "incomes" with the following columns:

### Incomes Table
Name| Description | Data Type | Format
---------|----------|---------|---------
id | No description | bigint | int8
created_at | No description | timestamp with time zone | timestamptz
name | No description | text | text
amount | No description | numeric | numeric
repeated | No description | text | text
date | No description | date | date
user | No description | uuid | uuid
uuid | No description | uuid | uuid

### Environment Variables
Once you have created the tables, you will need to create a .env file in the root directory and add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

You can find these variables in your Supabase project settings.


### Additional Supabase Configuration
You will also need to create a Row Level Security (RLS) policy for each table on supabase. You can configure these settings in the supabase dashboard under Authentication > Policies. The policies should be configured as follows:

All tables should have the following RLS policy:

```
Policy name: Enable all for authenticated users only

Target Roles: authenticated

Using Expression: True

With Check Expression: True

``````

## Running the Application

### Commands

To run this application, execute the following command from a terminal in the root directory:

```
npm run dev
```

Once the application is running, create a user account with an email and password. 

> **Tip**: If you use **Gmail**, you can create a new email by adding a **+** and more characters to your email address. For example, if your email is `email@gmail.com`, you can use `email+1@gmail.com`. This will allow you to create multiple accounts with the same email address, and you will still receive emails sent to the test email at your primary email.

## Tests

To test this application, run the following command in the root directory:

```
npm run test
```

## License
This application is licensed under the MIT license.

## Contributing
If you would like to contribute to this application, please submit a pull request.

