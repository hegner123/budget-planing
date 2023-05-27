# Forecast Algorithm

## Description

The purpose of this algorithm is to create daily balances for a given account. The algorithm will take in a starting balance, a list of transactions, a list of incomes, and a length of time to predict. The algorithm will then return a list of daily balances for the given length of time.

Step 1: Create a list of dates for the given length of time.

Step 2: For each date take either the starting balance or the previous balance and add the income if any and subtract the transactions if any.

Step 3: Return the list of daily balances.

